import { loadDirect } from './Utils/Audio.js';
import urls from './api.js';
import { _trackQueue } from './Utils/Queue.js';
import { containsClasses, getWebEntityObject, 
    displayQueuedTracks, safePlay, safeSwitchTrack, GetCurrentCompositionsId } from './utilities.js';
import { toggleTopPageBackground, toggleBodyBackground } from './StyleHandlers/color-handlers.js';
import { addSideNavElements, addSidenavEventListeners } from './StyleHandlers/side-nav-handlers.js';
import { onAjaxLoadError, onAjaxSwitchPageError } from './Errors/ajax-errors.js';
import { addEventHandlersOnBody, setCurrentPageCompositionByArtistID, setCurrentPageCompositionByID, setCurrentPageAlbumByID } 
from './Router/click-handlers.js';
import { setTitleByArtistAndTitle, setArtistSongNameAsync, fireOnInputValueChange } from './Page/event-handlers.js';
import { getNext } from './Store/mock-data.js';
import { runBackgroundHandShakes, onSiteLoadIfAuthorized } from './Router/testing.js';
import { initializeKeyboardHook } from './Loading/keyboard-hook.js';
import MusicApi from './Page/url-decoding.js'
import { FillLocalizationStore } from './Services/Localization/fill-localization-store.js';
import { appendSideNavigationBars } from './Page/Components/side-navigations.js';
import { appendHorizontalVolumeControl } from './Page/Components/volume-controls.js';

document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
const loc = urls.getLocation();

/// On document loaded event
$(document).ready(function () {
    try {
        appendSideNavigationBars();
        FillLocalizationStore();
        runBackgroundHandShakes();
        addSideNavElements(); addSidenavEventListeners();
        addEventHandlersOnBody();
        toggleBodyBackground(); bindPlayerButtons();
        toggleTopPageBackground(false); initializeKeyboardHook();
        appendHorizontalVolumeControl();
        onSiteLoadIfAuthorized();

        let urlHandler = new MusicApi();
        //addButtonOnClickHandlers();
        _trackQueue.onchange = () => {
            displayQueuedTracks(_trackQueue);
        };
        const container = document.querySelector('body');

        container.onmousedown = (e) => {
            console.log('[DBG] site.js/onmousedown' + e.target.id + ' ' + e.target.className);
            if (!containsClasses('ctxmenu', 'ctxmenu-button')) {
                $('#ctxmenu').innerHTML = '';
            }
        }

        container.addEventListener('click', function (e) {
            console.log('[DBG] site.js/onclick' + e.target.id + ' ' + e.target.className);
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
            }
            if (target.id == 'ctxmenu') {
                document.querySelector('#ctxmenu').outerHTML = "";
            }
        });
        
        /// Mobile devices: toggle context menu through touch-end event (touch and scroll to see track's menu)
        document.querySelector('.container')?.addEventListener('touchend', function (e) {
            setTimeout( () => {
                console.log('[DBG] site.js/touchend' + e.target.id + ' ' + e.target.className);
                const highlightedItems = document.querySelectorAll("#ctxmenu");
                highlightedItems.forEach((userItem) => {
                    userItem.outerHTML = "";
                });
                onCardTapped(e)
            }, 75);
        });

        /// Toggle change volume by mouse wheel for scroll on footer / absolute volume control
        document.onwheel = (e) =>
        {        
            if (containsClasses(e.target, 'footer-volume-control', 'volume-control-absolute', 'player-audio-element') === true) {
                let target = e.target;
                
                let value = target.value
                if(value > 3) {
                    if(-(e.deltaY) > 0)
                        target.value *= 1.2;
                    else
                        target.value *= 0.8;
                } else {
                    if(-(e.deltaY) > 0)
                        target.value += 1;
                    else
                        target.value -= 1;
                }
                fireOnInputValueChange(target);
            }
        }

        document.querySelector('.container').oncontextmenu = (e) => {
            console.log('[DBG] site.js/onContentMenu' + e.target.id + ' ' + e.target.className);
            e.preventDefault();
            let target = e.target;
            if (containsClasses(target, 'card-text', 'card-title')) {
                target = e.target.parentNode;
            }
            if (target.classList.contains('card-body-composition')) {
                onCompositionRightMouseDown(e);
            }
        }
    } catch (e) {
        console.log(e);
    } 
});


export function onCardTapped(e)
{
    let target = e.target;
    if (containsClasses(target, 'card-text', 'card-title')) {
        target = e.target.parentNode;
    }
    if (target.classList.contains('card-body-composition')) {
        onCompositionRightMouseDown(e);
    }
}

export function onCompositionSourceChanged(compId)
{
    //bindPlayerButtons();
    setArtistSongNameAsync();
    displayQueuedTracks(_trackQueue);
    appendHorizontalVolumeControl(); // changed source - apply volume control once more
    //setTitleByArtistAndTitle(el);
    let plr = $("#player-audio-element").get(0);
    if(plr != null) {
        plr.onended = function () {
            let id = GetCurrentCompositionsId();
            id == null ? compId : id;

            console.log('[DBG] site.js/onCompositionSourceChanged() id is :' + id);
            setNextComposition(id); 
        };
    }
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

    } catch (err) {
        console.log(err)
    }
}

export function bindPlayerButtons() {
    console.log('[DBG] binding player buttons...');
    document.querySelector('.footer-next-track-btn')?.addEventListener("click", (e) => {
        console.log("[DBG] clicked");

        let id = "nextTrackId";
        if (_trackQueue.isEmpty()) {
            console.log('[DBG] .footer-next-track-btn.click() : Track Query is Empty.');
            id = GetCurrentCompositionsId();
        }
        else {
            console.log('[DBG] .footer-next-track-btn.click() : Track Query is Not Empty.');
            id = _trackQueue.peek().id;
            console.log('[DBG] .footer-next-track-btn.click() : peeked item. Elts len: ' + _trackQueue.elts.length); 
        }
        setNextComposition(id);
    });
}

export function setNextComposition(compId) {
    try {
        if (compId == null) {
            console.log('[DBG] site.js/setNextComposition() error, compId is undefined || null')
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
            $.ajax({ 
                url: ctrl, type: 'GET', contentType: 'html',
                xhrFields: { withCredentials: true },
                crossDomain: true,
                success: function (response) {
                    const htmlDom = new DOMParser().parseFromString(response, 'text/html');
                    document.querySelector('#player-source-element').setAttribute("src", htmlDom.querySelector('#player-source-element').src); 
                    console.log('[DBG] setNextComposition: Ajax returned key count: ' + Object.keys(response).length);
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
                success: function (response) {
                    const htmlDom = new DOMParser().parseFromString(response, 'text/html');
                    document.querySelector('#player-source-element').setAttribute("src", htmlDom.querySelector('#player-source-element').src); 
                    console.log('[DBG] setFooterPlayerSourse: Ajax returned key count: ' + Object.keys(response).length);
                    console.log(htmlDom.documentElement.innerHTML);
                    //id="player-source-element" src="http://localhost:8080/GetAudio?Id=9dcb0a84-f33b-44c9-9d96-45f85d2506f8"
                    
                    let plr = $("#player-audio-element").get(0);
                    plr.load();
                    plr.play();
                    onCompositionSourceChanged(htmlDom.querySelector('#player-source-element').src);
                },
                error: async function (error_) {
                    document.title = 'Medweb';
                    const errorMessage = `Error loading audio: ${error_.status} ${error_.statusText}`;
                    createErrorMessage(errorMessage);
                    onAjaxLoadError(source, error_, safePlay);
                }
            });
        }
    } catch (e) {
        console.log(e)
    }
}