// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
import urls from './api.js'
import LogMessageRequest from './logging.js';
import { isEmpty, containsClasses, getIdFromElementData, getWebEntityObject, displayQueuedTracks } from './utilities.js';
import newQueue from './Utils/Queue.js';

document.querySelector('#nav-lnk-sign-up')?.addEventListener('click', setCurrentPageSignUp);
document.querySelector('#nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
document.querySelector('#nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
document.querySelector('#nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
document.querySelector('#nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
document.querySelector('#nav-lnk-register')?.addEventListener('click', setCurrentPageRegister);
document.querySelector('#nav-lnk-login')?.addEventListener('click', setCurrentPageLogin);
document.querySelector('#navbar-logo-title')?.addEventListener('click', setCurrentPageIndex);
document.querySelector('#nav-lnk-background')?.addEventListener('click', toggleBodyBackground);

const _trackQueue = newQueue();

const loc = urls.loc;

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

export function toggleBodyBackground()
{
    if ($('body').hasClass('white')) {
        $('body').toggleClass('white');
        //$('body').css('background-color', 'white');
    } else {
        $('body').toggleClass('white');
        //$('body').css('background-color', 'grey');
    }
}

export function setFooterPlayerSourse(el) {
    try {
        console.log(el.children[2].value); //el.children[2] = <data>
        console.log("currentSrc bottom = " + $("#player-source-element").currentSrc);
        console.log("src bottom = " + $("#player-source-element").attr('src'));
        let source = el.children[0].value;
        let ctrl = ( /*el.baseURI*/ loc + 'GetHtmlPlayer/?id=' + source);
        if ($("#player-source-element") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#player-audio-div").html('');
                    $("#player-audio-div").append(response);
                    plr = $("#player-audio-element").get(0);
                    plr.play();
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });

        }

    } catch (e) {
        alert(e)
    }
}

export function setCurrentPageGenres() {
    try {
        let ctrl = (loc + 'GetPartialGenresPage');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

export function setCurrentPageAlbums() {
    try {
        let ctrl = (loc + 'GetPartialAlbumsPage');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

export function setCurrentPageCompositions() {
    try {
        let ctrl = (loc + 'GetHtmlCompositionsPage');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function (error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

export function setCurrentPageCompositionByID(el) {
    try {
        let id = el.children[0].value;
        let ctrl = (loc + 'GetPartialCompositionPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

export function setCurrentPageAlbumByID(el) {
    try {
        let id = el.children[0].value;
        let ctrl = (loc + 'GetPartialAlbumPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

export function setCurrentPageSignUp() {
    try {
        let ctrl = (loc + 'GetPartialSignUpPage'); // https://localhost:5001/GetHtmlSignUpPage
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function(response) {
                    console.log('Ajax returned: ' + response);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function(error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}