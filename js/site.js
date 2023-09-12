import urls from './api.js';
import { loadDirect, setNextComposition, setFooterPlayerSourse } from './Utils/Audio.js';
import { _trackQueue } from './Utils/Queue.js';
import { containsClasses, getWebEntityObject, 
    displayQueuedTracks, safePlay, safeSwitchTrack, GetCurrentCompositionsId } from './utilities.js';
import { toggleTopPageBackground, toggleBodyBackground } from './StyleHandlers/color-handlers.js';
import { addSideNavElements, addSidenavEventListeners } from './StyleHandlers/side-nav-handlers.js';
import { addEventHandlersOnBody, setCurrentPageCompositionByArtistID, setCurrentPageCompositionByID, setCurrentPageAlbumByID } 
from './Router/click-handlers.js';
import { setArtistSongNameAsync, fireOnInputValueChange } from './Page/event-handlers.js';
import { getNext } from './Store/mock-data.js';
import { runBackgroundHandShakes, onSiteLoadIfAuthorized } from './Router/testing.js';
import { initializeKeyboardHook } from './Loading/keyboard-hook.js';
import MusicAPI from './Page/url-decoding.js'
import TrackAPI from './Page/track-decoding.js'
import { FillLocalizationStore } from './Services/Localization/fill-localization-store.js';
import { appendSideNavigationBars } from './Page/Components/side-navigations.js';
import { appendHorizontalVolumeControl } from './Page/Components/volume-controls.js';
import { addSearchTerminal } from './System/search-terminal.js';
import { onTransitionEnd } from './StyleHandlers/footer-handlers.js';
import Debug from './Extensions/cs-debug.js'

document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
const loc = urls.getLocation();

/// On document loaded event
$(document).ready(function () {
    try {
        addSearchTerminal();
        window.isAuthorized = (window.isAuthorized === true) ? true : false;
        appendSideNavigationBars();
        FillLocalizationStore();
        runBackgroundHandShakes();
        addSideNavElements(); addSidenavEventListeners();
        addEventHandlersOnBody();
        toggleBodyBackground(); bindPlayerButtons();
        toggleTopPageBackground(false); initializeKeyboardHook();
        appendHorizontalVolumeControl();
        onSiteLoadIfAuthorized();
        
        let urlHandler = new MusicAPI();
        // set interval for load
        setTimeout(() => { let trackhandler = new TrackAPI(setNextComposition) }, 1000);
        //addButtonOnClickHandlers();
        _trackQueue.onchange = () => {
            displayQueuedTracks(_trackQueue);
        };
        const container = document.querySelector('body');

        container.onmousedown = (e) => {
            Debug.WriteLine('[DBG] site.js/onmousedown | ' + e.target.id + ' ' + e.target.className + ' | e.which: ' + e.which);
            if (!containsClasses('ctxmenu', 'ctxmenu-button')) {
                $('#ctxmenu').innerHTML = '';
            }
        }

        container.addEventListener('click', function (e) {
            Debug.WriteLine('[DBG] site.js/onclick(): ' + e.target.id + ' ' + e.target.className);
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
            Debug.WriteLine('[DBG] site.js/onContentMenu' + e.target.id + ' ' + e.target.className);
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
    } finally {
        onTransitionEnd();
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