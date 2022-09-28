import { setSidebarInputVolumeOnChange, loadDirect } from './Utils/Audio.js'
import urls from './api.js'
import { newQueue, _trackQueue, peekObjectsArtistsAndTitles } from './Utils/Queue.js';
import { isEmpty, containsClasses, getIdFromElementData, getWebEntityObject, 
    displayQueuedTracks, sleep, safePlay, safeSwitchTrack, GetCurrentCompositionsId } from './utilities.js';
import { transitionEnd } from './StyleHandlers/footer-handlers.js';
import colorHandlers, { toggleTopPageBackground } from './StyleHandlers/color-handlers.js'
import { closeNav, openNav } from './StyleHandlers/side-nav-handlers.js'
import { checkInputs } from './signup.js'
import { onAjaxLoadError, onAjaxSwitchPageError } from './Errors/ajax-errors.js'
import { setCurrentPageIndex, setCurrentPageManageAccount, setCurrentPageSignUp, setCurrentPageArtists, setCurrentPageCompositionByArtistID, setCurrentPageMockData, 
setCurrentPageCompositions, setCurrentPageAlbums, setCurrentPageGenres, setCurrentPageCompositionByID, setCurrentPageAlbumByID, setCurrentPageRegister, setCurrentPageLogin } 
from './Router/click-handlers.js'
import { setTitleByArtistAndTitle, setArtistSongNameAsync } from './Page/event-handlers.js'
import { getNext } from './Store/mock-data.js';

document.addEventListener('transitionend', function() { transitionEnd() });
document.querySelector('#navbar-logo-title')?.addEventListener('click', setCurrentPageIndex);
document.querySelector('#nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
document.querySelector('#nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
document.querySelector('#nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
document.querySelector('#nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
document.querySelector('#nav-lnk-sign-up')?.addEventListener('click', setCurrentPageSignUp);
document.querySelector('#nav-lnk-register')?.addEventListener('click', setCurrentPageRegister);
document.querySelector('#nav-lnk-login')?.addEventListener('click', setCurrentPageLogin);
document.querySelector('#nav-lnk-background')?.addEventListener('click', colorHandlers.toggleBodyBackground);

document.querySelector('.nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
document.querySelector('.nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
document.querySelector('.nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
document.querySelector('.nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
document.querySelector('.nav-lnk-sign-up')?.addEventListener('click', setCurrentPageSignUp);
document.querySelector('.nav-lnk-register')?.addEventListener('click', setCurrentPageRegister);
document.querySelector('.nav-lnk-login')?.addEventListener('click', setCurrentPageLogin);
document.querySelector('.nav-lnk-background')?.addEventListener('click', colorHandlers.toggleBodyBackground);

const loc = urls.getLocation();

$(document).ready(function () {
    bindPlayerButtons();
    toggleTopPageBackground(false);
    //addButtonOnClickHandlers();
    _trackQueue.onchange = () => {
        displayQueuedTracks(_trackQueue);
    };
    const container = document.querySelector('.body');

    container.onmousedown = () => {
        if (!containsClasses('ctxmenu', 'ctxmenu-button')) {
            $('#ctxmenu').innerHTML = '';
        }
    }

    container.addEventListener('click', function (e) {
        // But only alert for elements that have an alert-button class
        //if (containsClasses(e.target, 'card-body', 'card-text', 'card-title', 'card-body-composition')) {
        let target = e.target;
        if (containsClasses(target, 'card-text', 'card-title')) {
            target = e.target.parentNode;
        }
        if (target.classList.contains('card-body-composition')) {
            setFooterPlayerSourse(e.target)
            if (e.which === 3) {/* Right Mouse Click */
                //onCompositionRightMouseDown(); 
            }
        }
        if (target.classList.contains('album-card-div')) {
            setCurrentPageCompositionByID(e.target);
        }
        if (target.classList.contains('genre-card-div')) {
            setCurrentPageAlbumByID(e.target);
        }
        if (target.classList.contains('artist-card-div')) {
            setCurrentPageCompositionByArtistID(e.target);
        }
        if (target.classList.contains('btn-default')) {
            //$('.btn-default').onclick = (e) => { e.preventDefault(); };
            //urls.getInDevelopmentMessage();
        }
    });
    setSidebarInputVolumeOnChange();
});

document.oncontextmenu = function (e) {
    let target = e.target;
    if (containsClasses(target, 'card-text', 'card-title')) {
        target = e.target.parentNode;
    }

    if (target.classList.contains('card-body-composition')) {
        e.preventDefault();
        onCompositionRightMouseDown(e);
    }
    if (target.classList.contains('album-card-div')) { }
    if (target.classList.contains('genre-card-div')) { }
    if (target.classList.contains('artist-card-div')) { }
}

export function onCompositionSourceChanged(compId)
{
    //bindPlayerButtons();
    setArtistSongNameAsync();
    displayQueuedTracks(_trackQueue);
    setSidebarInputVolumeOnChange();
    //setTitleByArtistAndTitle(el);
    let plr = $("#player-audio-element").get(0);
    if(plr != null)
        plr.onended = function () {
            let id = GetCurrentCompositionsId() ?? compId;
            console.log('id is :' + id);
            setNextComposition(id); 
        };
}

export function onCompositionRightMouseDown(e) {
    try {
        let menu = document.createElement("div")
        let cmiQueueSelected = document.createElement("p")
        cmiQueueSelected.id = 'ctxmenu-button';
        cmiQueueSelected.innerHTML = "Enqueue";
        menu.id = "ctxmenu";

        cmiQueueSelected.onclick = () => { _trackQueue.enqueue(getWebEntityObject(e)); };
        menu.onfocusout = () => menu.outerHTML = '';
        menu.onmouseleave = () => menu.outerHTML = ''
        menu.appendChild(cmiQueueSelected)
        
        console.log(e.target)
        let insertTarget = {};
        if(e.target.classList.contains('card-body'))
            insertTarget = e.target.parentElement;
        if(e.target.classList.contains('card'))
            insertTarget = e.target;
        if(containsClasses(e.target, 'card-text', 'card-title'))
            insertTarget = e.target.parentElement.parentElement;
        
        insertTarget.appendChild(menu);

        // setTimeout(() => {
        //     menu.style.opacity = 0;
        // }, 1500); 
        
        // e.target.appendChild(menu);
        // var timeout = setTimeout(function () {
        //     $('#ctxmenu').remove();
        // }, 4500);
    } catch (err) {
        console.log(err)
    }
}

export function bindPlayerButtons() {
    console.log('binding player buttons...');
    document.querySelector('.footer-next-track-btn')?.addEventListener("click", (e) => {
        console.log("clicked");

        let id = "nextTrackId";
        if (_trackQueue.isEmpty()) {
            console.log('Empty');
            id = GetCurrentCompositionsId();
        }
        else {
            console.log('Not Empty');
            id = _trackQueue.peek().id;
            console.log('peeked. len: ' + _trackQueue.elts.length); 
        }
        setNextComposition(id);
    });
}

export function setNextComposition(compId) {
    try {
        if (compId == null) {
            console.log('setNextComposition() error, compId is undefined || null')
            return;
        }
        console.log('setNextComposition() compsId is ' + compId)
        if(compId.includes('docs.google') || compId.includes(':')) {
            let newUrl = compId;
            if(_trackQueue.isEmpty()) {
                console.log('setNextComposition: Query=empty');
                newUrl = getNext(compId);
            } else {
                console.log('setNextComposition: Query NOT empty');
                newUrl = _trackQueue.dequeue().id;
            }
            console.log('calling load Direct, compId = ' + newUrl);
            loadDirect(newUrl   );
            onCompositionSourceChanged(newUrl);
            return;
        }
        let path = 'GetHtmlNextTrackPlayer/?id=';
        if (!_trackQueue.isEmpty()) {
            compId = _trackQueue.dequeue().id;
            path = 'GetHtmlStreamPlayer/?url=';
        }
        let ctrl = (loc + path + compId);
        if ($("#player-source-element") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    const htmlDom = new DOMParser().parseFromString(response, 'text/html');
                    document.querySelector('#player-source-element').setAttribute("src", htmlDom.querySelector('#player-source-element').src); 
                    console.log('setNextComposition: Ajax returned key count: ' + Object.keys(response).length);
                    console.log(htmlDom.documentElement.innerHTML);
                    
                    let plr = $("#player-audio-element").get(0);
                    plr.load();
                    plr.play();
                    onCompositionSourceChanged(compId);
                },
                error: async function (error_) {
                    document.title = 'Medweb';
                    onAjaxSwitchPageError(compId, error_, safeSwitchTrack);
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
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    const htmlDom = new DOMParser().parseFromString(response, 'text/html');
                    document.querySelector('#player-source-element').setAttribute("src", htmlDom.querySelector('#player-source-element').src); 
                    console.log(htmlDom.documentElement.innerHTML);
                    console.log('setFooterPlayerSourse: Ajax returned key count: ' + Object.keys(response).length);
                    //id="player-source-element" src="http://localhost:8080/GetAudio?Id=9dcb0a84-f33b-44c9-9d96-45f85d2506f8"
                    
                    let plr = $("#player-audio-element").get(0);
                    plr.load();
                    plr.play();
                    onCompositionSourceChanged(htmlDom.querySelector('#player-source-element').src);
                },
                error: async function (error_) {
                    document.title = 'Medweb';
                    onAjaxLoadError(source, error_, safePlay);
                }
            });
        }
    } catch (e) {
        console.log(e)
    }
}
