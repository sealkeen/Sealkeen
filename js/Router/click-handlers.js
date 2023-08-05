import urls, { pushHistoryState, redirectIfServerIsReachable } from './../api.js'
import { setLoginAntiForgeryOnClick, setRegisterAntiForgeryOnClick } from './../Account/verification.js'
import { checkInputs } from './../signup.js'
import { CreateDOMFromJSON, CreateArtistsDOMFromJSON, CreateAlbumsDOMFromJSON, CreateGenresDOMFromJSON } from './../Store/mock-data.js'
import { toggleTopPageBackground, onClickBodyBackground, toggleBodyBackground } from './../StyleHandlers/color-handlers.js'
import { transitionEnd } from './../StyleHandlers/footer-handlers.js';
import { addEventOnWindowResize } from './../StyleHandlers/navbar-handlers.js';
import { onClickGotoAboutMe } from './redirect.js';
import { ConvertToDOM } from './../Store/mock-data.js'
import { appendCheckBoxTo } from '../Page/data-processing.js';
import { onDevelopmentCardClick, fetchContentCrossOrigin } from './shared.js';
import { createErrorMessage } from '../Errors/fetch-errors.js';
import { create429ErrorMessageOrThrowError } from '../Errors/fetch-errors-4xx.js';
import { addSearchTerminal } from '../System/search-terminal.js';

const loc = urls.getLocation();

function onContentPageLoaded_Finally()
{
    toggleTopPageBackground(false);
    addSearchTerminal();
}

export function addEventHandlersOnBody() {
    document.addEventListener('transitionend', function() { transitionEnd() });
    document.querySelector('#navbar-logo-title')?.addEventListener('click', setCurrentPageIndex);
    document.querySelector('#nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
    document.querySelector('#nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
    document.querySelector('#nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
    document.querySelector('#nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
    document.querySelector('#nav-lnk-sign-up')?.addEventListener('click', setCurrentPageSignUp);

    // No event handlers for Razor pages <a href>'s
    if( !urls.isNgrok() ) { 
        document.querySelector('#nav-lnk-register')?.addEventListener('click', setCurrentPageRegister);
        document.querySelector('#nav-lnk-login')?.addEventListener('click', setCurrentPageLogin);
    }
    document.querySelector('#nav-lnk-background')?.addEventListener('click', onClickBodyBackground);
    document.querySelector('.nav-lnk-about')?.addEventListener('click', onClickGotoAboutMe);
    
    document.querySelector('.nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
    document.querySelector('.nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
    document.querySelector('.nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
    document.querySelector('.nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
    document.querySelector('.nav-lnk-sign-up')?.addEventListener('click', setCurrentPageSignUp);
    document.querySelector('.nav-lnk-register')?.addEventListener('click', setCurrentPageRegister);
    document.querySelector('.nav-lnk-login')?.addEventListener('click', setCurrentPageLogin);
    document.querySelector('.nav-lnk-background')?.addEventListener('click', onClickBodyBackground);
    document.querySelector('.nav-lnk-about')?.addEventListener('click', onClickGotoAboutMe);
    addEventOnWindowResize();
}

export async function setCurrentPageIndex(event) {
    try {
        event.preventDefault();
        toggleTopPageBackground(true);
        let ctrl = (urls.getLocation() + 'IndexPartial');
        if (!$("#page-body-container").length) return;
        await fetch(ctrl, {
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
        }).then(async response => {
            if (response.ok) {
                let responseText = await response.text();
                pushHistoryState(urls.getPostfix());
                const responseHtml = $.parseHTML(responseText);
                $("#page-body-container").html('').append(responseHtml);
                console.log(`fetch response key count: ${Object.keys(responseHtml).length}`);
                toggleBodyBackground();
            } else 
                create429ErrorMessageOrThrowError(response.status);
        }).catch((error) => {
            if (error.message === 'Too many requests.') {
                createErrorMessage(error.message);
            } else {
                setCurrentPageMockData();
                createErrorMessage('setCurrentPageIndex: ' + error);
            }
        });
    } catch (error) {
        createErrorMessage('setCurrentPageIndex: ' + error);
    } finally {
        onDevelopmentCardClick();
        toggleBodyBackground();
        onContentPageLoaded_Finally()
    }
}


export function setCurrentPageMockData()
{
    $("#page-body-container").html('');
    $("#page-body-container").append(ConvertToDOM());
}

/* <summary> 
    CONTENT PAGES :
    * Composition
    * Albums
    * Genres
    * Artists
</summary> */

export async function setCurrentPageCompositions(event) {
    try {
        event.preventDefault();
        toggleTopPageBackground(true);
        let pageBodyContainer = document.getElementById("page-body-container");

        let isFirstLoad = (document.getElementById('track-filter') == null); 
        let isCheckedAlready = document.querySelector('.track-filter-checkbox')?.checked;
        let appendText = ''; 
        if(isFirstLoad === true || isCheckedAlready === true) { 
            appendText = '?reverse=true'; 
        }
        let ctrl = (loc + 'GetJSONCompositionsPage/' + appendText);
        if (pageBodyContainer != null) {
            var ftchComps = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async (response) => {
                if (response.ok) {
                    let data = await response.json();
                    console.log('[DBG] handling response text');
                    let trackDom = CreateDOMFromJSON(data);
                    $("#page-body-container").html('');
                    appendCheckBoxTo(pageBodyContainer, isFirstLoad ? true : isCheckedAlready);
                    $("#page-body-container").append(trackDom);
                    pushHistoryState('GetHTMLCompositionsPage/');
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {
                    setCurrentPageMockData();
                    createErrorMessage('setCurrentPageCompositions: ' + error); 
            });
        }
    } catch (error) {
        createErrorMessage('setCurrentPageCompositions: ' + error);
    } finally {
        onContentPageLoaded_Finally()
    }
}

export async function setCurrentPageAlbums(event) {
    try {
        event.preventDefault();
        toggleTopPageBackground(true);
        let ctrl = (loc + 'GetJSONAlbumsPage');
        if ($("#page-body-container") != undefined) {
            var ftchAlb = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let data = await response.json();
                    console.log('[DBG] click-handlers.js/.. Handling response text');
                    let albumsDom = CreateAlbumsDOMFromJSON(data);
                    pushHistoryState('GetHTMLAlbumsPage/');
                    $("#page-body-container").html('');
                    $("#page-body-container").append(albumsDom);
                    console.log('[DBG] fetch response key count: ' + Object.keys(albumsDom).length);
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {
                setCurrentPageMockData();
                createErrorMessage('in setCurrentPageAlbums: ' + error); 
            });
        }
    } catch (error) {
        createErrorMessage('in setCurrentPageAlbums: ' + error);
    } finally {
        onContentPageLoaded_Finally()
    }
}

export async function setCurrentPageGenres(event) {
    try {
        event.preventDefault();
        toggleTopPageBackground(true);
        let ctrl = (loc + 'GetJSONGenresPage');
        if ($("#page-body-container") != undefined) {
            var ftchGnrs = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let data = await response.json();
                    pushHistoryState('GetHTMLGenresPage/');
                    console.log('[DBG] Handling response text');
                    let genresDom = CreateGenresDOMFromJSON(data);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(genresDom);
                    console.log('[DBG] fetch response key count: ' + Object.keys(genresDom).length);
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {
                setCurrentPageMockData();
                createErrorMessage('in setCurrentPageGenres: ' + error);
            });
        }
    } catch (error) {
        createErrorMessage('in setCurrentPageAlbums: ' + error);
    } finally {
        onContentPageLoaded_Finally()
    }
}

export async function setCurrentPageArtists(event) {
    try {
        toggleTopPageBackground(true);
        //event.preventDefault();
        let ctrl = (loc + 'GetJSONArtistsPage');
        if ($("#page-body-container") != undefined) {
            var ftchArts = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    pushHistoryState('GetHTMLArtistsPage/');
                    let data = await response.json();
                    console.log('[DBG] handling response text');
                    let artistsDom = CreateArtistsDOMFromJSON(data);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(artistsDom);  
                    console.log('[DBG] fetch response key count: ' + Object.keys(artistsDom).length);
                } else 
                    create429ErrorMessageOrThrowError()
            })
            .catch((error) => {
                setCurrentPageMockData();
                createErrorMessage('in setCurrentPageArtists: ' + error);
            });
        }
    } catch (error) {
        createErrorMessage('in setCurrentPageArtists: ' + error);
    } finally {
        onContentPageLoaded_Finally()
    }
}

export async function setCurrentPageCompositionByArtistID(el) {
    try {
        toggleTopPageBackground(true);
        let id = el;
        if (!event.target.classList.contains('card-body')) {
            id = el.parentNode.children[0].value;
        } else {
            id = el.children[0].value;
        }

        let ctrl = (loc + 'GetPartialCompositionPageByArtistID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            var ftchCmpsById = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    pushHistoryState('GetHtmlCompositionPageByArtistID/?id=' + id);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    console.log('[DBG] fetch response key count: ' + Object.keys(responseText).length)
                } else if (response.status === 429) {
                    createErrorMessage('Request rate is too high');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    createErrorMessage(error.message);
                } else {
                    setCurrentPageMockData();
                    createErrorMessage('in GetPartialCompositionPageByArtistID/?id=' + id + '\n'+ error);
                }
            });
        }
    } catch (error) {
        createErrorMessage('in GetPartialCompositionPageByArtistID/?id=' + '\n'+ e);
    } finally {
        onContentPageLoaded_Finally()
    }
}

export async function setCurrentPageCompositionByID(el) {
    try {
        toggleTopPageBackground(true);
        let id = el;
        if (!event.target.classList.contains('card-body')) {
            id = el.parentNode.children[0].value;
        } else {
            id = el.children[0].value;
        }

        let ctrl = (loc + 'GetPartialCompositionPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            var ftchPartCmpsById = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    pushHistoryState('GetHtmlCompositionPageByID/?id=' + id);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    console.log('[DBG] fetch response key count: ' + Object.keys(responseText).length)
                } else if (response.status === 429) {
                    createErrorMessage('Request rate is too high');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    createErrorMessage(error.message);
                } else {
                    setCurrentPageMockData();
                    createErrorMessage('in GetPartialCompositionPageByID/?id=' + id + '\n' + error);
                }
            });
        }
    } catch (error) {
        setCurrentPageMockData();
        console.log('[DBG] fetch error. Setting up mock data. Details: ' + e)
    } finally {
        onContentPageLoaded_Finally()
    }
}

export async function setCurrentPageAlbumByID(el) {
    try {
        toggleTopPageBackground(true);
        let id = el;
        if (!event.target.classList.contains('card-body')) {
            id = el.parentNode.children[0].value;
        }
        else {
            id = el.children[0].value;
        }
        let ctrl = (loc + 'GetPartialAlbumPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            var ftchPartAlbmsById = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    pushHistoryState('GetHtmlAlbumPageByID/?id=' + id);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                } else if (response.status === 429) {
                    createErrorMessage('Request rate is too high');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    createErrorMessage(error.message);
                } else {
                    setCurrentPageMockData();
                    createErrorMessage('in setCurrentPageAlbumByID/?id=' + id + '\n' + error);
                }
            });
        }
    } catch (error) {
        setCurrentPageMockData();
        createErrorMessage('in setCurrentPageAlbumByID: ' + error);
    } finally {
        onContentPageLoaded_Finally()
    }
}

export async function FetchGetPatialListenedPage(nextActionInPipeLine)
{
    await fetchContentCrossOrigin('GetPartialListenedPage').then(result => {
        if(result.ok) {
            nextActionInPipeLine();
        }
    });
}

/* <summary> 
    ACCOUNT / MANAGE PAGES  
    * ManageAccount
    * SignUp
    * Register
    * Login
</summary> */

export async function setCurrentPageManageAccount(event) {
    try {
        event.preventDefault();
        toggleTopPageBackground(true);
        let ctrl = (urls.getLocation() + 'Manage/Index');
        if ($("#page-body-container").length) {
            var ftchMngAcc = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer'
            }).then(async (response) => {
                if(response.ok) {
                    let responseText = await response.text();
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    console.log('[DBG] fetch response key count: ' + Object.keys(responseText).length)
                    pushHistoryState(urls.getPostfix() + 'Manage/Index');
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {
                setCurrentPageMockData();    setCurrentPageMockData();
                createErrorMessage('setCurrentPageManageAccount: ' + error);
            });
        }
    } catch (error) {
        createErrorMessage('setCurrentPageManageAccount: ' + error);
    } finally {
        toggleTopPageBackground(false);
    }
}

export async function setCurrentPageSignUp(event) {
    try {
        event.preventDefault();
        toggleTopPageBackground(true);
        let ctrl = (urls.getLocation() + 'GetPartialSignUpPage');  // https://localhost:5001/GetPartialSignUpPage
        if ($("#page-body-container") != undefined) {
            var ftchSignUp = await fetch(ctrl, {
            headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    
                    console.log('[DBG] fetch response key count: ' + Object.keys(responseText).length);
                    pushHistoryState('GetHtmlSignUpPage/');

                    const button = document.getElementById('form-btn-default');
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        if(checkInputs()) setRegisterAntiForgeryOnClick();
                    });
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {         
                if (error.message === 'Too many requests.') {
                    createErrorMessage(error.message);
                } else {
                    setCurrentPageMockData();
                    createErrorMessage('setCurrentPageSignUp: ' + error); 
                }
            });
        }
    } catch (error) {
        createErrorMessage('setCurrentPageSignUp: ' + error);
    } finally {
        toggleTopPageBackground(false);
    }
}

export async function setCurrentPageRegister(event) {
    toggleTopPageBackground(true);
    event.preventDefault();
    try {
        if( redirectIfServerIsReachable('Identity/Account/Register') ) return;

	    let prefix = urls.isNgrok() ? 'Identity/' : '';
	
        toggleTopPageBackground(true);
        console.log('Loading: ' + loc + 'Account/Register');
        let ctrl = (loc + prefix + 'Account/Register');
        if ($("#page-body-container") != undefined) {
            var ftchPartRegister = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    pushHistoryState('Account/Register/');
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    console.log('[DBG] fetch response key count: ' + Object.keys(responseText).length)                    
                    $('#__AjaxAntiForgeryForm').removeAttr('action'); //, location.host + 'Account/Login'
                    $('#__AjaxAntiForgeryForm').removeAttr('method');                    
                    $('#__AjaxAntiForgeryForm').attr('onsubmit', "return false");
                    $('#__AjaxAntiForgeryForm').attr('referrerpolicy', 'no-referrer')
                    $('.btn-default').removeAttr('type');
                    $('#__AjaxAntiForgeryForm').submit(function (e) {
                        //e.preventDefault();
                    });
                    $('.btn-default').onclick = (e) => {setRegisterAntiForgeryOnClick(e)}

                    const button = document.getElementById('form-btn-default');
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        if(checkInputs()) setRegisterAntiForgeryOnClick();
                    });
                } else if (response.status === 429) {
                    createErrorMessage('Request rate is too high');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    createErrorMessage(error.message);
                } else {
                    setCurrentPageMockData();
                    createErrorMessage('in setCurrentPageRegister: ' + error);
                }
            });
        }
    } catch (error) {
        createErrorMessage('in setCurrentPageRegister: ' + error);
    } finally {
        toggleTopPageBackground(false);
    }
}

export async function setCurrentPageLogin(event) {
    toggleTopPageBackground(true);
    try {
        if( redirectIfServerIsReachable('Identity/Account/Login') ) return;

	    let prefix = urls.isNgrok() ? 'Identity/' : '';
	
        event.preventDefault();
        toggleTopPageBackground(true);
        console.log('Loading: ' + loc + 'Account/Login');
        let ctrl = (loc + prefix + 'Account/Login');
        if ($("#page-body-container") != undefined) {
            var ftchPartLgn = await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    
                    console.log('[DBG] fetch response key count: ' + Object.keys(responseText).length)                    
                    $('#__AjaxAntiForgeryForm').removeAttr('action'); //, location.host + 'Account/Login'
                    $('#__AjaxAntiForgeryForm').removeAttr('method');                    
                    $('#__AjaxAntiForgeryForm').attr('onsubmit', "return false");
                    $('#__AjaxAntiForgeryForm').attr('referrerpolicy', 'no-referrer')
                    $('.btn-default').removeAttr('type');
                    $('#__AjaxAntiForgeryForm').submit(function (e) {
                        setLoginAntiForgeryOnClick(e)
                    });
                    $('.btn-default').onclick = (e) => {setLoginAntiForgeryOnClick(e)}
                    pushHistoryState('Login/');
                } else if (response.status === 429) {
                    createErrorMessage('Request rate is too high');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    createErrorMessage(error.message);
                } else {
                    setCurrentPageMockData();
                    createErrorMessage('in setCurrentPageLogin: ' + error);
                }
            });
        }
    } catch (error) {
        createErrorMessage('in setCurrentPageLogin: ' + error);
    } finally {
        toggleTopPageBackground(false);
    }
}
