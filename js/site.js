import { setNextComposition, setFooterPlayerSourse } from './Shared/Audio.js';
import { _trackQueue } from './Shared/Queue.js';
import { containsClasses, fromJQueryObject, 
    displayQueuedTracks, GetCurrentCompositionsId } from './utilities.js';
import { toggleTopPageBackground, toggleBodyBackground } from './StyleHandlers/color-handlers.js';
import { addSideNavElements, addSidenavEventListeners } from './StyleHandlers/side-nav-handlers.js';
import { addEventHandlersOnBody, setCurrentPageCompositionByArtistID, setCurrentPageCompositionByID, setCurrentPageAlbumByID } 
from './Router/click-handlers.js';
import { fireOnInputValueChange } from './Page/event-handlers.js';
import { runBackgroundHandShakes, onSiteLoadIfAuthorized } from './Router/testing.js';
import { initializeKeyboardHook } from './Loading/keyboard-hook.js';
import Debug from './Extensions/cs-debug.js'
import TrackAPI from './Page/track-decoding.js'
import Exception from './Extensions/cs-exception.js';
import { FillLocalizationStore } from './Services/Localization/fill-localization-store.js';
import { appendSideNavigationBars } from './Page/Components/side-navigations.js';
import { appendHorizontalVolumeControl } from './Page/Components/volume-controls.js';
import { addSearchTerminal } from './System/search-terminal.js';
import { onTransitionEnd } from './StyleHandlers/footer-handlers.js';
import { attachDraggableEventsToQueue } from './Shared/QueueExtensions/draggable-query-extensions.js';
import { registerDependencies } from './Extensions/di-registration.js';
import { serviceProvider } from './Services/di-container.js';
import { useVirtualMouseIfMobile } from './Page/Components/Inputs/virtual-mouse.js'

const RIGHT_MOUNT_BUTTON = 3;

document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");

/// On document loaded event
$(document).ready(function () {
    try {
        registerDependencies();
        useVirtualMouseIfMobile();
        addSearchTerminal();
        window.isAuthorized = (window.isAuthorized === true) ? true : false;
        appendSideNavigationBars();
        FillLocalizationStore();
        runBackgroundHandShakes();

        addSideNavElements();
        addSidenavEventListeners();
        addEventHandlersOnBody();
        toggleBodyBackground();
        bindPlayerButtons();
        toggleTopPageBackground(false);
        initializeKeyboardHook();
        appendHorizontalVolumeControl();

        onSiteLoadIfAuthorized();
        serviceProvider.resolve('musicApi');
        
        setTimeout(() => { new TrackAPI(setNextComposition) }, 1000);
        
        _trackQueue.onchange = () => {
            displayQueuedTracks(_trackQueue);
        };
        attachDraggableEventsToQueue();
        const container = document.querySelector('body');

        container.onmousedown = (e) => {
            Debug.WriteLine('site.js/onmousedown | ' + e.target.id + ' ' + e.target.className + ' | e.which: ' + e.which);
            if (!containsClasses(e?.target, 'ctxmenu', 'ctxmenu-button')) {
                document.querySelectorAll('.ctxmenu').forEach(el => { 
                    el.innerHTML = ''; 
                })
            }
        }

        container.addEventListener('click', function (e) {
            Debug.WriteLine('site.js/onclick(): ' + e.target.id + ' ' + e.target.className);
            
            let target = e.target;
            if (containsClasses(target, 'card-text', 'card-title')) {
                target = e.target.parentNode;
            }
            if (target.classList.contains('card-body-composition')) {
                setFooterPlayerSourse(e.target)
                if (e.which === RIGHT_MOUNT_BUTTON) {
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
            if (target.id == 'ctxmenu') {
                document.querySelector('#ctxmenu').outerHTML = "";
            }
        });
        
        /// Mobile devices: toggle context menu through touch-end event (touch and scroll to see track's menu)
        document.querySelector('.container')?.addEventListener('touchend', function (e) {
            setTimeout( () => {
                Debug.WriteLine('site.js/touchend' + e.target.id + ' ' + e.target.className);
                const highlightedItems = document.querySelectorAll(".ctxmenu");
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
            Debug.WriteLine('site.js/onContentMenu' + e.target.id + ' ' + e.target.className);
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
        Exception.Throw(e)
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

export function appendPushListItem(e, menu /* : ContextMenuHTML */) { 
    let push = document.createElement("p");
    push.className = 'ctxmenu-button';
    push.innerHTML = "Add first";
    push.onclick = () => { _trackQueue.push_front(fromJQueryObject(e)); };
    menu.appendChild(push)
}
export function appendQueueListItem(e, menu /* : ContextMenuHTML */) { 
    let queue = document.createElement("p")
    queue.className = 'ctxmenu-button';
    queue.innerHTML = "Add last";
    queue.onclick = () => { _trackQueue.enqueue(fromJQueryObject(e)); };
    menu.appendChild(queue)
}

export function onCompositionRightMouseDown(e) {
    try {
        let menu = document.createElement("div")
        menu.onfocusout = () => menu.outerHTML = '';
        menu.onmouseleave = () => menu.outerHTML = ''
        menu.className = "ctxmenu"
        appendPushListItem(e, menu)
        appendQueueListItem(e, menu)

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
    Debug.WriteLine('binding player buttons...');
    if (document.querySelector('.footer-next-track-btn') == null)
        return
    document.querySelector('.footer-next-track-btn')?.addEventListener("click", (e) => {
        Debug.WriteLine("clicked");

        let id = "nextTrackId";
        if (_trackQueue.isEmpty()) {
            Debug.WriteLine('.footer-next-track-btn.click() : Track Query is Empty.');
            id = GetCurrentCompositionsId();
        }
        else {
            Debug.WriteLine('.footer-next-track-btn.click() : Track Query is Not Empty.');
            id = _trackQueue.peek().id;
            Debug.WriteLine('.footer-next-track-btn.click() : peeked item. Elts len: ' + _trackQueue.elts.length); 
        }
        setNextComposition(id);
    });
}