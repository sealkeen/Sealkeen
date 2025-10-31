import { replaceTrackParamInUrl } from './../Page/track-decoding.js'
import { appendHorizontalVolumeControl } from "../Page/Components/volume-controls.js";
import { setArtistSongNameAsync, setTitleByArtistAndTitle } from "../Page/event-handlers.js";
import { GetCurrentCompositionsId, addPlayingCardStyle, displayQueuedTracks, fromDOMObject } from "../utilities.js";
import { _trackQueue } from "./Queue.js";
import { onAjaxLoadError, onAjaxSwitchPageError } from './../Errors/ajax-errors.js';
import { safeSwitchTrack, safePlay} from './../utilities.js';
import { createInfoMessage } from '../Errors/fetch-errors.js';
import { getNext } from '../Store/mock-data.js';
import urls from './../api.js';
import Debug from '../Extensions/cs-debug.js';
import Exception from '../Extensions/cs-exception.js';

const loc = urls.getLocation();

export function getAudioNode()
{
    let res = document.querySelector("#player-audio-element");
    if (res == null) Exception.Throw('Audio element not found.');
    return res;
}

export function isPlaying(plr) {
    let atStart = plr.currentTime == 0 ? true : false
    if ((atStart && plr.paused) || (plr.ended && plr.readyState == 0))
        return false
    return true
}

export async function loadDirect(source)
{
    if(source.includes(':')) {
        Debug.WriteLine('loadDirect: getAudioNode() is %j', getAudioNode());
        $("#player-source-element")[0].setAttribute('src', source);
        let loadPromise = await getAudioNode().load();
        if (loadPromise !== undefined) {
            loadPromise.then(() => {
                getAudioNode().play();
                return true;
            }).catch((error) => {
                if (error.name === "NotAllowedError") {
                    console.log('Load audio promise failure. NotAllowed Error.');
                } else {
                    console.log('[ERR] Load or playback error. ' + error);
                }
            });
        }
    }
    return false;
}

function findCardByDataId(id) {
    const cards = document.querySelectorAll('.card-columns .card');
    for (const card of cards) {
        const dataElement = card.querySelector('data[value]');
        if (dataElement?.value === id) {
            return card;
        }
    }
    return null;
}

export function onCompositionSourceChanged(compId)
{
    setArtistSongNameAsync(); //from "../Page/event-handlers.js";
    displayQueuedTracks(_trackQueue); //from "../utilities.js";
    appendHorizontalVolumeControl(); //from "../Page/Components/volume-controls.js"; 
    
    //setTitleByArtistAndTitle(el);
    let plr = getAudioNode();
    if(plr != null) {
        plr.onended = function () {
            let id = GetCurrentCompositionsId(); //from "../utilities.js";
            
            id == null ? compId : id;

            Debug.WriteLine('Audio.js/onCompositionSourceChanged() id is :' + id);
            setNextComposition(id);
        };
    }      
    addPlayingCardStyle(findCardByDataId(compId));
}

export function setNextComposition(compId) {
    try {
        if (compId == null || $("#player-source-element") == undefined) {
            let msg = 'Audio.js/setNextComposition() error, compId is undefined || null'
            Debug.WriteLine(msg)
            createInfoMessage(msg)
            return;
        }
        
        console.log('[INF] setNextComposition(): compsId is ' + compId)
        if (compId.includes('docs.google') || compId.includes(':')) {
            let newUrl = compId;
            if (_trackQueue.isEmpty()) {
                Debug.WriteLine('setNextComposition: Query=empty');
                newUrl = getNext(compId);
            } else {
                Debug.WriteLine('setNextComposition: Query NOT empty');
                newUrl = _trackQueue.dequeue().id;
            }
            Debug.WriteLine('setNextComposition: calling load Direct, compId = ' + newUrl);
            loadDirect(newUrl); //from here
            onCompositionSourceChanged(newUrl); //from here
            return;
        }

        let path = 'GetHtmlNextTrackPlayer/?id=';
        if (!_trackQueue.isEmpty()) {
            compId = _trackQueue.dequeue().id;
            path = 'GetHtmlStreamPlayer/?url=';
        }

        let ctrl = (loc + path + compId);
        $.ajax({ 
            url: ctrl, type: 'GET', contentType: 'html', xhrFields: { withCredentials: true }, crossDomain: true,
            success: function (response) {
                const htmlDom = new DOMParser().parseFromString(response, 'text/html');
                let plr = getAudioNode();
                plr.removeAttribute('src');
                document.querySelector('#player-source-element').setAttribute("src", htmlDom.querySelector('#player-source-element').src); 

                Debug.WriteLine('setNextComposition: Ajax returned key count: ' + Object.keys(response).length);
                Debug.WriteLine(htmlDom.documentElement.innerHTML);
                let idExtracted = extractSongIdFromHtml(response);
                plr.load();
                plr.play();
                onCompositionSourceChanged(idExtracted ?? compId);
            },
            error: async function (error_) {
                Exception.Throw('Error streaming service');
                onAjaxSwitchPageError(compId, safeSwitchTrack); // from './../utilities.js';
            }
        });
    } catch (e) {
        console.log(e);
    } 
}

function extractSongIdFromHtml(html) {
    const match = html.match(/GetAudio\?Id=([a-f0-9\-]+)/i);
    return match ? match[1] : null;
}

export async function setFooterPlayerSourse(el)
{
    try {
        let source = el;
        let songInfo = el;
        if (!el.classList.contains('card-body')) { songInfo = el.parentNode; }
            source = songInfo.querySelector('data').value; //data

        setTitleByArtistAndTitle(el);
        let direct = await loadDirect(source);
        if ($("#player-source-element") == null || (direct != null && direct === true) ) {
            return false; 
        } else if (direct === false && source.includes(':')) {
            Exception.Throw('Direct play prevented: audio source loading failed.');
            return false;
        }

        let ctrl = (loc + 'GetHtmlStreamPlayer/?url=' + source);
        let result = false;
        await $.ajax({
            url: ctrl,
            type: 'GET',
            contentType: 'html',
            xhrFields: { withCredentials: true },
            crossDomain: true,
            success: function (response) {
                const htmlDom = new DOMParser().parseFromString(response, 'text/html');
                let plr = getAudioNode();
                plr.removeAttribute('src');
                document.querySelector('#player-source-element').setAttribute("src", htmlDom.querySelector('#player-source-element').src);

                replaceTrackParamInUrl(source);
                if (isPlaying(plr) === true) {
                    let toQuery = fromDOMObject(el);
                    _trackQueue.push_front(toQuery);
                    createInfoMessage('Queued first: ' + toQuery?.artist + ' - ' + toQuery?.title)
                    return false;
                }
                plr.load();
                plr.play();
                result = true;
                onCompositionSourceChanged(htmlDom.querySelector('#player-source-element').src);
            },
            error: async function (error_) {
                Exception.Throw(`Error loading audio: ${error_.status} ${error_.statusText}`);
                onAjaxLoadError(source, safePlay); //from './../Errors/ajax-errors.js';
            }
        });

        return result;
    } catch (e) {
        console.log(e)
    }
}