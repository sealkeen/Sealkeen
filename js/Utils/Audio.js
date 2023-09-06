import urls from './../api.js';
import { replaceTrackParamInUrl } from './../Page/track-decoding.js'
import { appendHorizontalVolumeControl } from "../Page/Components/volume-controls.js";
import { setArtistSongNameAsync, setTitleByArtistAndTitle } from "../Page/event-handlers.js";
import { GetCurrentCompositionsId, displayQueuedTracks } from "../utilities.js";
import { _trackQueue } from "./Queue.js";
import { onAjaxLoadError, onAjaxSwitchPageError } from './../Errors/ajax-errors.js';
import { safeSwitchTrack } from './../utilities.js';

const loc = urls.getLocation();
export async function loadDirect(source)
{
    if(source.includes(':')) {
        console.log('[DBG] loadDirect: $("#player-audio-element")[0] is %j', $("#player-audio-element")[0]);
        $("#player-source-element")[0].setAttribute('src', source);
        let loadPromise = await $("#player-audio-element")[0].load();
        if (loadPromise !== undefined) {
            loadPromise.then(() => {
                $("#player-audio-element")[0].play()
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

export function onCompositionSourceChanged(compId)
{
    //bindPlayerButtons();
    setArtistSongNameAsync(); //from "../Page/event-handlers.js";
    displayQueuedTracks(_trackQueue); //from "../utilities.js";
    // changed source - apply volume control once more
    appendHorizontalVolumeControl(); //from "../Page/Components/volume-controls.js"; 
    
    //setTitleByArtistAndTitle(el);
    let plr = $("#player-audio-element").get(0);
    if(plr != null) {
        plr.onended = function () {
            let id = GetCurrentCompositionsId(); //from "../utilities.js";
            
            id == null ? compId : id;

            console.log('[DBG] Audio.js/onCompositionSourceChanged() id is :' + id);
            setNextComposition(id); //from here
        };
    }
}

export function setNextComposition(compId) {
    try {
        if (compId == null) {
            console.log('[DBG] Audio.js/setNextComposition() error, compId is undefined || null')
            return;
        }
        console.log('[DBG] setNextComposition(): compsId is ' + compId)
        if(compId.includes('docs.google') || compId.includes(':')) {
            let newUrl = compId;
            if(_trackQueue.isEmpty()) {
                console.log('[DBG] setNextComposition: Query=empty');
                newUrl = getNext(compId);
            } else {
                console.log('[DBG] setNextComposition: Query NOT empty');
                newUrl = _trackQueue.dequeue().id;
            }
            console.log('[DBG] setNextComposition: calling load Direct, compId = ' + newUrl);
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
        if ($("#player-source-element") != undefined) {
            $.ajax({ 
                url: ctrl, type: 'GET', contentType: 'html', xhrFields: { withCredentials: true }, crossDomain: true,
                success: function (response) {
                    const htmlDom = new DOMParser().parseFromString(response, 'text/html');
                    document.querySelector('#player-source-element').setAttribute("src", htmlDom.querySelector('#player-source-element').src); 
                    console.log('[DBG] setNextComposition: Ajax returned key count: ' + Object.keys(response).length);
                    console.log(htmlDom.documentElement.innerHTML);
                    
                    let plr = $("#player-audio-element").get(0);
                    plr.load();
                    plr.play();
                    onCompositionSourceChanged(compId); //from here
                },
                error: async function (error_) {
                    document.title = 'Medweb';
                    
                    onAjaxSwitchPageError(compId, error_, safeSwitchTrack); // from './../utilities.js';
                }
            });
        }
    } catch (e) {
        console.log(e);
    } 
}

export async function setFooterPlayerSourse(el)
{
    try {
        let source = el;
        let songInfo = el;
        if (!el.classList.contains('card-body')) { songInfo = el.parentNode; }
            source = songInfo.querySelector('data').value; //data

        setTitleByArtistAndTitle(el);
        let direct = loadDirect(source);
        if(direct != null && direct === true)
            return;

        let ctrl = (loc + 'GetHtmlStreamPlayer/?url=' + source);
        if ($("#player-source-element") != undefined) {
            await $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                success: function (response) {
                    const htmlDom = new DOMParser().parseFromString(response, 'text/html');
                    document.querySelector('#player-source-element').setAttribute("src", htmlDom.querySelector('#player-source-element').src); 
                    console.log('[DBG] setFooterPlayerSourse: Ajax returned key count: ' + Object.keys(response).length);
                    console.log(htmlDom.documentElement.innerHTML);
                    //id="player-source-element" src="http://localhost:8080/GetAudio?Id=9dcb0a84-f33b-44c9-9d96-45f85d2506f8"
                    replaceTrackParamInUrl(source);

                    let plr = $("#player-audio-element").get(0);
                    plr.load();
                    plr.play();
                    onCompositionSourceChanged(htmlDom.querySelector('#player-source-element').src);
                },
                error: async function (error_) {
                    document.title = 'Medweb';
                    const errorMessage = `Error loading audio: ${error_.status} ${error_.statusText}`;
                    createErrorMessage(errorMessage);
                    onAjaxLoadError(source, error_, safePlay); //from './../Errors/ajax-errors.js';
                }
            });
        }
    } catch (e) {
        console.log(e)
    }
}