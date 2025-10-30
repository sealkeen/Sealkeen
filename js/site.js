import { setNextComposition, setFooterPlayerSourse } from './Shared/Audio.js';
import { _trackQueue } from './Shared/Queue.js';
import { hasAnyClass, fromJQueryObject, 
    displayQueuedTracks, GetCurrentCompositionsId, 
    addPlayingElementStyle,
    hasClassSubstring} from './utilities.js';
import { toggleTopPageBackground, toggleBodyBackground } from './StyleHandlers/color-handlers.js';
import { addSideNavElements, addSidenavEventListeners } from './Page/Components/navigations/side-nav-handlers.js';
import { addEventHandlersOnBody, setCurrentPageCompositionByArtistID, setCurrentPageCompositionByID, setCurrentPageAlbumByID } 
from './Router/click-handlers.js';
import { fireOnInputValueChange } from './Page/event-handlers.js';
import { runBackgroundHandShakes, onSiteLoadIfAuthorized } from './Router/testing.js';
import { initializeKeyboardHook } from './Loading/keyboard-hook.js';
import Debug from './Extensions/cs-debug.js'
import TrackAPI from './Page/track-decoding.js'
import Exception from './Extensions/cs-exception.js';
import { FillLocalizationStore } from './Services/Localization/fill-localization-store.js';
import { appendHorizontalVolumeControl } from './Page/Components/volume-controls.js';
import { addSearchTerminal } from './System/search-terminal.js';
import { onTransitionEnd } from './StyleHandlers/footer-handlers.js';
import { attachDraggableEventsToQueue } from './Shared/QueueExtensions/draggable-query-extensions.js';
import { registerDependencies } from './Extensions/di-registration.js';
import { serviceProvider } from './Services/di-container.js';
import { usePageModifyingComponents } from './Page/index.js'
import { createInfoMessage } from './Errors/fetch-errors.js';

const LOW_VOLUME_THRESHOLD = 3;

document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");

/// On document loaded event
$(document).ready(async function () {
    try {
        registerDependencies();
        usePageModifyingComponents();
        window.isAuthorized = (window.isAuthorized === true) ? true : false;
        FillLocalizationStore();
        runBackgroundHandShakes();

        addSideNavElements();
        addSidenavEventListeners();
        addEventHandlersOnBody();
        
        let pathHelper = serviceProvider.resolve('actionPathHelper');
        toggleBodyBackground(!pathHelper.isNoActionPath(window.location.pathname));

        bindPlayerButtons();
        toggleTopPageBackground(false);
        initializeKeyboardHook();
        appendHorizontalVolumeControl();

        await onSiteLoadIfAuthorized(false, addSearchTerminal);
        
        serviceProvider.resolve('musicApi');
        
        setTimeout(() => { new TrackAPI(setNextComposition) }, 1000);
        
        _trackQueue.onchange = () => {
            displayQueuedTracks(_trackQueue);
        };
        attachDraggableEventsToQueue();
        const container = document.querySelector('body');

        container.onmousedown = (e) => {
            Debug.WriteLine('site.js/onmousedown | ' + e.target.id + ' ' + e.target.className + ' | e.which: ' + e.which);
            if (!hasAnyClass(e?.target, 'ctxmenu', 'ctxmenu__button')) {
                document.querySelectorAll('.ctxmenu').forEach(el => { 
                    el.innerHTML = '';
                })
            }
        }

        container.addEventListener('click', async function (e) {
            const target = e.target;
            const clickedElement = hasAnyClass(target, 'card-text', 'card-title')
                ? target.parentElement : target;

            if (clickedElement?.classList.contains('card-body-composition')) {
                let result = await setFooterPlayerSourse(clickedElement);
                if (result === true) {
                    addPlayingElementStyle(clickedElement);
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
            if (hasAnyClass(e.target, 'footer-volume-control', 'volume-control-absolute', 'player-audio-element') === true) {
                let target = e.target;
                
                let value = target.value
                if (value > LOW_VOLUME_THRESHOLD) {
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
            let target = e.target;
            if (hasClassSubstring(target, 'card'))
            {
                e.preventDefault();
                if (hasAnyClass(target, 'card-text', 'card-title')) {
                    target = e.target.parentNode;
                }
                if (target.classList.contains('card-body-composition')) {
                    onCompositionRightMouseDown(e);
                }
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
    if (hasAnyClass(target, 'card-text', 'card-title')) {
        target = e.target.parentNode;
    }
    if (target.classList.contains('card-body-composition')) {
        onCompositionRightMouseDown(e);
    }
}

function appendPushListItem(e, menu) { 
    let push = document.createElement("p");
    push.className = 'ctxmenu__button';
    push.innerHTML = "Add first";
    push.onclick = () => { _trackQueue.push_front(fromJQueryObject(e)); };
    menu.appendChild(push)
}
function appendQueueListItem(e, menu) { 
    let queue = document.createElement("p")
    queue.className = 'ctxmenu__button';
    queue.innerHTML = "Add last";
    queue.onclick = () => { _trackQueue.enqueue(fromJQueryObject(e)); };
    menu.appendChild(queue)
}

function getTrackId(e) { 
    const card = e.target.closest('.card');
    if (!card) return;
    const data = card.querySelector('data');
    if (!data || !data.value) return;
    return data.value
}

function appendDownloadItem(e, menu) {
    const trackId = getTrackId(e);
    if(!trackId) return;
    const downloadUrl = `${window.location.origin}/GetAudio?Id=${trackId}`; // todo: api urls
    const download = document.createElement("p");
    download.className = 'ctxmenu__button';
    download.innerHTML = "Download";
    download.onclick = () => {
        const a = document.createElement('a');
        a.href = downloadUrl;

        let fileName = '';
        if (downloadUrl.includes('GetAudio')) {
            const card = e.target.closest('.card');
            const cardTitle = card.querySelector('.card-title');
            const cardText = card.querySelector('.card-text');
            
            if (cardTitle && cardText) {
                const artist = cardTitle.textContent.trim();
                const title = cardText.textContent.trim();
                
                fileName = `${artist} – ${title}`
                    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
                    .replace(/\s+/g, ' ') // Collapse multiple spaces
                    .trim() + '.mp3';
            }
        }
        
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    menu.appendChild(download);
}

function appendStreamItem(e, menu) {
    const trackId = getTrackId(e);
    if (!trackId) return;
    const openUrl = `${window.location.origin}/Media`; // todo: api urls
    const ostream = document.createElement("p");
    ostream.className = 'ctxmenu__button';
    ostream.innerHTML = "Open Stream";
    ostream.onclick = () => {
        sendData(openUrl, trackId).then(() => {
            let player = document.querySelector("#player-audio-element");
            if (player) player.src = '/api/AudioStreaming/mp3';
                const card = e.target.closest('.card');
                const cardTitle = card.querySelector('.card-title');
                const cardText = card.querySelector('.card-text');
                if (cardTitle && cardText) {
                    const artist = cardTitle.textContent.trim();
                    const title = cardText.textContent.trim();
                    
                    document.title = `${artist} – ${title}`
                        .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
                        .replace(/\s+/g, ' ') // Collapse multiple spaces
                        .trim();
                }
                player.play();
        });
    };
    menu.appendChild(ostream);
}

export function onCompositionRightMouseDown(e) {
    try {
        let menu = document.createElement("div")
        menu.onfocusout = () => menu.outerHTML = '';
        menu.onmouseleave = () => menu.outerHTML = ''
        menu.className = "ctxmenu"
        appendPushListItem(e, menu)
        appendQueueListItem(e, menu)
        appendDownloadItem(e, menu);
        appendStreamItem(e, menu);
        
        console.log(e.target)
        let insertTarget = {};
        if (e.target.classList.contains('card-body'))
            insertTarget = e.target.parentElement;
        if (e.target.classList.contains('card'))
            insertTarget = e.target;
        if (hasAnyClass(e.target, 'card-text', 'card-title'))
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

// ============ STREAM TRACK ============
async function sendData(url, id) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({Input: `media-command open ${id}`}),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
        }
        const result = await response.json();
        console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Fetch error:', error.message);
        throw error;
    }
}