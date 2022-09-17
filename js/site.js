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

export function setArtistSongNameAsync() {
    let compId = GetCurrentCompositionsId();
    let ctrl = (/*el.baseURI*/loc + 'GetArtistSongName/?id=' + compId);
    
    if ($(".track-artist-song-name") != undefined) {
        $.ajax({ //$.get({ //
            url: ctrl,
            type: 'GET',
            contentType: 'html',
            /*data: ("_ViewPlayer=" + source),*/
            success: function (response) {
                console.log('setArtistSongNameAsync: Ajax returned key count: ' + Object.keys(response).length);
                $(".track-artist-song-name").html('');
                $(".track-artist-song-name").append(response);
                document.title = (response);
            },
            error: function (error_) {
                console.log("Ajax error: " + error_);
            }
        });
    }
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
            //let result = _trackQueue.dequeue();
            //console.log('%j', result);
            //id = result;
        }

        setNextComposition(id);
    });
}

export function setTitleByArtistAndTitle(el) {
    let artist = el;
    let song = el;
    let songInfo = el;
    if (!event.target.classList.contains('card-body')) {
        songInfo = el.parentNode;
    }

    artist = songInfo.querySelector('.card-title')?.firstChild?.nodeValue;
    song = songInfo.querySelector('.card-text')?.firstChild?.nodeValue;

    if (!isEmpty(artist) && !isEmpty(song))
        document.title = `${artist} – ${song}`;
}

export function GetCurrentCompositionsId() { 
    let audioSrc = $("#player-audio-element").get(0).children[0];
    console.log('GetCurrentCompId = ' + audioSrc.src.substring(audioSrc.src.length - (13 + loc.length)).toString().replace('.io', '').replace('/GetAudio?Id=', ''));
    if (audioSrc.src === undefined || audioSrc.src === null)
        return undefined;
    // cropping [ 'https://localhost:5001/GetAudio?Id=' ]
    // leaving [ 'f648ef94-bfb7-44a2-82d3-d68bca5a49a8' ]
    return audioSrc.src.substring(audioSrc.src.length - (13 + loc.length).toString()).replace('.io', '').replace('/GetAudio?Id=', '');
}

export function setNextComposition(compId) {
    if (compId === undefined || compId === null)
        return;

    let path = 'GetHtmlNextTrackPlayer/?id=';
    if (!_trackQueue.isEmpty()) {
        compId = _trackQueue.dequeue().id;
        path = 'GetHtmlStreamPlayer/?url=';
    }

    let ctrl = (/*el.baseURI*/loc + path + compId);
    if ($("#player-source-element") != undefined) {
        $.ajax({ //$.get({ //
            url: ctrl,
            type: 'GET',
            contentType: 'html',
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
                    let id = GetCurrentCompositionsId() ?? compId;
                    setNextComposition(id);
                };
            },
            error: function (error_) {
                displayQueuedTracks(_trackQueue);
                console.log("Ajax error: " + error_);
            }
        });
    }
}

export function setFooterPlayerSourse(el)
{
    try {
        let source = el;
        let songInfo = el;
        if (!event.target.classList.contains('card-body')) {
            songInfo = el.parentNode;
        }
        source = songInfo.querySelector('data').value; //data
        setTitleByArtistAndTitle(el);

        let ctrl = (/*el.baseURI*/loc + 'GetHtmlStreamPlayer/?url=' + source);
        if ($("#player-source-element") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
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
                error: function (error_) {
                    displayQueuedTracks(_trackQueue);
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        alert(e)
    }
}

export function setCurrentPageCompositions(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'GetPartialCompositionsPage');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    window.history.pushState(null, null, '/CompositionsPage');
                    LogMessageRequest('setCurrentPageCompositions(): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageAlbums(event) {
    try {
        event.preventDefault();
        
        let ctrl = (loc + 'GetPartialAlbumsPage');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    window.history.pushState(null, null, '/AlbumsPage');
                    console.log('setCurrentPageAlbums(): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageGenres(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'GetPartialGenresPage');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    window.history.pushState(null, null, '/GenresPage');
                    console.log('setCurrentPageGenres(): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageArtists(event) {
    try {
        event.preventDefault();
        let loc = `${location.protocol}//${location.host}`;
        loc = loc.replace(/\/$|$/, '/'); // add trailing slash
        let ctrl = (loc + 'GetPartialArtistsPage');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    window.history.pushState(null, null, '/ArtistsPage');
                    console.log('setCurrentPageAudio(): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageCompositionByArtistID(el) {
    try {
        let id = el;
        if (!event.target.classList.contains('card-body')) {
            console.log('not contains card-body. el.currentTarget.parentNode.children[0].value');
            id = el.parentNode.children[0].value;
        }
        else {
            console.log('contains card-body. el.children[0].value');
            id = el.children[0].value;
        }

        let ctrl = (loc + 'GetPartialCompositionPageByArtistID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    LogMessageRequest('setCurrentPageCompositionByArtistID(el): Ajax returned key count: ' + Object.keys(response).length);
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
        let id = el;
        if (!event.target.classList.contains('card-body')) {
            console.log('not contains card-body. el.currentTarget.parentNode.children[0].value');
            id = el.parentNode.children[0].value;
        }
        else {
            console.log('contains card-body. el.children[0].value');
            id = el.children[0].value;
        }

        let ctrl = (loc + 'GetPartialCompositionPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    LogMessageRequest('setCurrentPageCompositionByID(el): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageAlbumByID(el) {
    try {
        let id = el;
        if (!event.target.classList.contains('card-body')) {
            console.log('not contains card-body. el.currentTarget.parentNode.children[0].value');
            id = el.parentNode.children[0].value;
        }
        else {
            console.log('contains card-body. el.children[0].value');
            id = el.children[0].value;
        }
        let ctrl = (loc + 'GetPartialAlbumPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    console.log('setCurrentPageAlbumByID(el): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageRegister(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'Account/Register');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    window.history.pushState(null, null, '/Identity/Account/Register');
                    console.log('setCurrentPageSignUp(): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageLogin(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'Account/Login');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    window.history.pushState(null, null, '/Identity/Account/Login');
                    console.log('setCurrentPageSignUp(): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageSignUp(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'GetPartialSignUpPage');  // https://localhost:5001/GetPartialSignUpPage
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    window.history.pushState(null, null, '/GetPartialSignUpPage');
                    console.log('setCurrentPageSignUp(): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageIndex(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'IndexPartial');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    //window.location = loc;
                    console.log('setCurrentPageSignUp(): Ajax returned key count: ' + Object.keys(response).length);
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

export function setCurrentPageManageAccount(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'Manage/Index');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    window.history.pushState(null, null, '/Identity/Account/Manage');
                    console.log('setCurrentPageSignUp(): Ajax returned key count: ' + Object.keys(response).length);
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