// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
import urls from './api.js'
import { newQueue, _trackQueue, peekObjectsArtistsAndTitles } from './Utils/Queue.js';
import { LogMessageRequest } from './logging.js';
import { isEmpty, containsClasses, getIdFromElementData, getWebEntityObject, displayQueuedTracks, sleep, safePlay, safeSwitchTrack } from './utilities.js';
import { setLoginAntiForgeryOnClick, setRegisterAntiForgeryOnClick } from './Account/verification.js'
import colorHandlers from './StyleHandlers/color-handlers.js'
import { checkInputs } from './signup.js'
import { onAjaxLoadError } from './Errors/ajax-errors.js'
import { setCurrentPageIndex, setCurrentPageManageAccount, setCurrentPageSignUp, setCurrentPageArtists, setCurrentPageCompositionByArtistID, setCurrentPageMockData, 
    setCurrentPageCompositions, setCurrentPageAlbums, setCurrentPageGenres, setCurrentPageCompositionByID, setCurrentPageAlbumByID, setCurrentPageRegister, setCurrentPageLogin } 
from './Router/click-handlers.js'
import { setTitleByArtistAndTitle, setArtistSongNameAsync } from './Page/event-handlers.js'

document.querySelector('#nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
document.querySelector('#nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
document.querySelector('#nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
document.querySelector('#nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
document.querySelector('#nav-lnk-sign-up')?.addEventListener('click', setCurrentPageRegister);
document.querySelector('#nav-lnk-register')?.addEventListener('click', setCurrentPageRegister);
document.querySelector('#nav-lnk-login')?.addEventListener('click', setCurrentPageLogin);
document.querySelector('#navbar-logo-title')?.addEventListener('click', setCurrentPageIndex);
document.querySelector('#nav-lnk-background')?.addEventListener('click', colorHandlers.toggleBodyBackground);

const loc = urls.getLocation();

$(document).ready(function () {
    bindPlayerButtons();
    //addButtonOnClickHandlers();
    _trackQueue.onchange = () => {
        displayQueuedTracks(_trackQueue);
    };
    const container = document.querySelector('#page-body-container');
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
            $('.btn-default').onclick = (e) => { e.preventDefault(); };
            urls.getInDevelopmentMessage();
        }
    });
});


document.oncontextmenu = function (e) {
    let target = e.target;
    if (containsClasses(target, 'card-text', 'card-title')) {
        target = e.target.parentNode;
    }

    if (target.classList.contains('card-body-composition')) {
        e.preventDefault();
        let menu = document.createElement("div")
        let cmiQueueSelected = document.createElement("p")
        cmiQueueSelected.id = 'ctxmenu-button';
        cmiQueueSelected.innerHTML = "Enqueue";
        menu.id = "ctxmenu"
        menu.style = `top:${e.pageY - 10}px;left:${e.pageX - 40}px`

        cmiQueueSelected.onclick = () => { _trackQueue.enqueue(getWebEntityObject(e)); };
        menu.onfocusout = () => menu.outerHTML = '';
        menu.onfocusout = () => menu.outerHTML = ''
        menu.innerHTML = '';
        menu.style.opacity = 100;
        menu.appendChild(cmiQueueSelected);

        setTimeout(() => {
            menu.style.opacity = 0;
        }, this.animationDelay + 120); 
        
        document.body.appendChild(menu);
        var timeout = setTimeout(function () {
            $('#ctxmenu').remove();
        }, 2500);
    }
    if (target.classList.contains('album-card-div')) { }
    if (target.classList.contains('genre-card-div')) { }
    if (target.classList.contains('artist-card-div')) { }
}

export function bindPlayerButtons() {
    console.log('binding player buttons...');
    document.querySelector('.footer-next-track-btn')?.addEventListener("click", (e) => {
        console.log("clicked");

        let id = "";
        if (_trackQueue.isEmpty()) {
            console.log('Empty');
            id = GetCurrentCompositionsId();
        }
        else {
            console.log('Not Empty');
        }

        setNextComposition(id);
    });
}

$(document).ready(function () {
    bindPlayerButtons();
    //addButtonOnClickHandlers();
    _trackQueue.onchange = () => {
        displayQueuedTracks(_trackQueue);
    };
    const container = document.querySelector('#page-body-container');
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
    });
});

export function GetCurrentCompositionsId() { 
    try {
        let audioSrc = $("#player-audio-element").get(0).children[0];
        console.log('GetCurrentCompId = ' + audioSrc.src.substring(audioSrc.src.length - (13 + loc.length)).toString().replace('.io', '').replace('/GetAudio?Id=', ''));
        if (audioSrc.src === undefined || audioSrc.src === null)
            return undefined;
        // cropping [ 'https://localhost:5001/GetAudio?Id=' ]
        // leaving [ 'f648ef94-bfb7-44a2-82d3-d68bca5a49a8' ]
        let result = audioSrc.src.substring(audioSrc.src.length - (13 + loc.length).toString()).replace('.io', '').replace('/GetAudio?Id=', '');
        console.log('GetCurrentCompositionsId(): %j', result);
        return result;
    } catch (e) {
        console.log(e);
    } 
}

export function setNextComposition(compId) {
    try {
        if (compId === undefined || compId === null)
            return;
        if(compId.includes('docs.google')) {
            let src = document.createElement('source');
            src.setAttribute('id', "player-source-element");
            src.setAttribute('src', compId);
            src.setAttribute('type', 'audio/mp3');
            $("#player-audio-element").html('');
            $("#player-audio-element").append(src);
            
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
                    console.log('setNextComposition: Ajax returned key count: ' + Object.keys(response).length);
                    $("#player-audio-div").html('');
                    $("#player-audio-div").append(response);
                    let plr = $("#player-audio-element").get(0);
                    plr.play();
                    bindPlayerButtons();
                    setArtistSongNameAsync();
                    displayQueuedTracks(_trackQueue);

                    plr.onended = function () {
                        console.log('id is :' + id);
                        let id = GetCurrentCompositionsId() ?? compId;
                        setNextComposition(id); 
                    };
                },
                error: async function (error_) {
                    onAjaxLoadError(compId, error_, safeSwitchTrack);
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
        if (!event.target.classList.contains('card-body')) { songInfo = el.parentNode; }
        source = songInfo.querySelector('data').value; //data
        setTitleByArtistAndTitle(el);

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
                    console.log('setFooterPlayerSourse: Ajax returned key count: ' + Object.keys(response).length);
                    $("#player-audio-div").html('');
                    $("#player-audio-div").append(response);
                    let plr = $("#player-audio-element").get(0);
                    plr.play();
                    bindPlayerButtons();

                    displayQueuedTracks(_trackQueue);
                    plr.onended = function () {
                        console.log('Calling get next composition from ID: ', source);
                        setNextComposition(source);
                    };
                },
                error: async function (error_) {
                    onAjaxLoadError(source, error_, safePlay);
                }
            });
        }
    } catch (e) {
        console.log(e)
    }
}
