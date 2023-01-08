import { setSidebarInputVolumeOnChange, loadDirect } from './Utils/Audio.js'
import urls from './api.js'
import { newQueue, _trackQueue, peekObjectsArtistsAndTitles } from './Utils/Queue.js';
import { isEmpty, containsClasses, getIdFromElementData, getWebEntityObject, 
    displayQueuedTracks, sleep, safePlay, safeSwitchTrack, GetCurrentCompositionsId } from './utilities.js';
import { toggleTopPageBackground, onClickBodyBackground, toggleBodyBackground } from './StyleHandlers/color-handlers.js'
import { addSideNavElements } from './StyleHandlers/side-nav-handlers.js'
import { onAjaxLoadError, onAjaxSwitchPageError } from './Errors/ajax-errors.js'
import { addEventHandlersOnBody, setCurrentPageCompositionByArtistID, setCurrentPageCompositionByID, setCurrentPageAlbumByID } 
from './Router/click-handlers.js'
import { setTitleByArtistAndTitle, setArtistSongNameAsync, fireOnInputValueChange } from './Page/event-handlers.js'
import { getNext } from './Store/mock-data.js';
import { setDevelopmentMessages } from './Development/news-data.js'

document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
const loc = urls.getLocation();

$(document).ready(function () {
    addSideNavElements();
    addEventHandlersOnBody();
    toggleBodyBackground();
    bindPlayerButtons();
    toggleTopPageBackground(false);
    //addButtonOnClickHandlers();
    _trackQueue.onchange = () => {
        displayQueuedTracks(_trackQueue);
    };
    const container = document.querySelector('body');

    container.onmousedown = (e) => {
        console.log('onmousedown' + e.target.id + ' ' + e.target.className);
        if (!containsClasses('ctxmenu', 'ctxmenu-button')) {
            $('#ctxmenu').innerHTML = '';
        }
    }

    container.addEventListener('click', function (e) {
        console.log('onclick' + e.target.id + ' ' + e.target.className);
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
        if (target.id == 'ctxmenu') {
            document.querySelector('#ctxmenu').outerHTML = "";
        }
    });
    setSidebarInputVolumeOnChange();
    setDevelopmentMessages();
});

document.querySelector('.container')?.addEventListener('touchend', function (e) {
    setTimeout( () => {
        console.log('touchend' + e.target.id + ' ' + e.target.className);
        const highlightedItems = document.querySelectorAll("#ctxmenu");
        highlightedItems.forEach((userItem) => {
            userItem.outerHTML = "";
        });
        onCardTapped(e)
    }, 75);
});

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
    console.log('onContentMenu' + e.target.id + ' ' + e.target.className);
    e.preventDefault();
    let target = e.target;
    if (containsClasses(target, 'card-text', 'card-title')) {
        target = e.target.parentNode;
    }
    if (target.classList.contains('card-body-composition')) {
        onCompositionRightMouseDown(e);
    }
}

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
