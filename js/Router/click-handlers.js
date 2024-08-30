import urls, { pushHistoryState, redirectIfServerIsReachable } from './../api.js'
import { setLoginAntiForgeryOnClick, setRegisterAntiForgeryOnClick } from './../Account/verification.js'
import { checkInputs } from './../signup.js'
import { CreateDOMFromJSON, CreateArtistsDOMFromJSON, CreateAlbumsDOMFromJSON, CreateGenresDOMFromJSON } from './../Store/mock-data.js'
import { toggleTopPageBackground, onClickBodyBackground, toggleBodyBackground } from './../StyleHandlers/color-handlers.js'
import { transitionEnd } from './../StyleHandlers/footer-handlers.js';
import { addEventOnWindowResize } from './../StyleHandlers/navbar-handlers.js';
import { addRedirectEventListener } from './redirect.js';
import { ConvertToDOM } from './../Store/mock-data.js'
import { appendCheckBoxTo } from '../Page/data-processing.js';
import { onDevelopmentCardClick, fetchContentCrossOrigin } from './shared.js';
import { create429ErrorMessageOrThrowError } from '../Errors/fetch-errors-4xx.js';
import { addSearchTerminal } from '../System/search-terminal.js';
import Debug from '../Extensions/cs-debug.js'
import Exception from '../Extensions/cs-exception.js'
import redirects, { showPopup } from "./redirect-table.js";
import routes from './routing-table.js';
import { createInfoMessage } from '../Errors/fetch-errors.js'
import { isHostNameValidIP } from '../Utils/WindowLocation/AddressParser.js'

routes[""] = async () => { setCurrentPageIndex() } // "/pages/index.html"
routes["/"] = async () => { setCurrentPageIndex() } // "/pages/index.html"
routes["/Content/GetHTMLCompositionsPage"] = setCurrentPageCompositions
routes["/Content/GetHTMLArtistsPage"] = setCurrentPageArtists
routes["/Content/GetHTMLGenresPage"] = setCurrentPageGenres
routes["/Content/GetHTMLAlbumsPage"] = setCurrentPageAlbums

routes["/Content/GetHTMLListenedPage"] = libraryEventHandler
routes["/Content/GetHTMLUploadedCompositionsPage"] = uploadedEventHandler

// Disable location handling for AspNetCore Apps.
if(!urls.isAspNetCore()) {
    routes["Identity/Account/Login"] = setCurrentPageLogin //window.location.href = urls.getLocation() + "Identity/Account/Login"
    routes["Identity/Account/Register"] = setCurrentPageRegister // window.location.href = urls.getLocation() + "Identity/Account/Register" 
}

redirects['logout'] = setCurrentPageLogout
redirects['login'] = setCurrentPageLogin
redirects['register'] = setCurrentPageRegister

function onContentPageLoaded_Finally()
{
    toggleTopPageBackground(false);
    addSearchTerminal();
}

export async function libraryEventHandler(event) { 
    event?.preventDefault();
    if(window.isAuthorized !== true) 
        Exception.Throw("[401] Unauthorized - Forbidden");
    else {
        createInfoMessage("[INF] Ok. Authorized.")
        //await fetchContentCrossOrigin("Content/GetPartialListenedPage", true, 'error') 
    }
}

export async function uploadedEventHandler(event) { 
    event?.preventDefault();
    if (window.isAuthorized !== true) {
        Exception.Throw("[401] Unauthorized - Forbidden");
    } else {
        createInfoMessage("[INF] Ok. Authorized.")
        //await fetchContentCrossOrigin("Content/GetPartialUploadedCompositionsPage", true, 'error')
    }
}

export function addEventHandlersOnBody() {
    document.addEventListener('transitionend', function() { transitionEnd() });
    document.querySelector('#navbar-logo-title')?.addEventListener('click', setCurrentPageIndex);
    document.querySelector('#nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
    document.querySelector('#nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
    document.querySelector('#nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
    document.querySelector('#nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
    document.querySelector('#nav-lnk-sign-up')?.addEventListener('click', setCurrentPageSignUp);
    document.querySelector('#nav-lnk-background')?.addEventListener('click', onClickBodyBackground);
    
    document.querySelector('.nav-lnk-genres')?.addEventListener('click', setCurrentPageGenres);
    document.querySelector('.nav-lnk-albums')?.addEventListener('click', setCurrentPageAlbums);
    document.querySelector('.nav-lnk-compositions')?.addEventListener('click', setCurrentPageCompositions);
    document.querySelector('.nav-lnk-artists')?.addEventListener('click', setCurrentPageArtists);
    document.querySelector('.nav-lnk-sign-up')?.addEventListener('click', setCurrentPageSignUp);
    document.querySelector('.nav-lnk-background')?.addEventListener('click', onClickBodyBackground);
    
    addRedirectEventListener('.nav-lnk-about', redirects['about.me']);
    // No event handlers for Razor pages <a href>'s
    
    if (!urls.isNgrok() && !urls.isVSDebug() || !isHostNameValidIP()) {
        addRedirectEventListener('#btn-identity-account-register', 
            () => {
                showPopup("register", "Redirect to auth service?", ['Redirect', 'Stay']);
            }
        );
        addRedirectEventListener('#btn-identity-account-login', 
            () => {
                showPopup("login", "Redirect to auth service?", ['Redirect', 'Stay']);
            }
        );
    }
    addEventOnWindowResize();
}

export async function setCurrentPageIndex(event) {
    try {
        event?.preventDefault();
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
                const responseHtml = $.parseHTML(responseText);
                $("#page-body-container").html('').append(responseHtml);
                console.log(`fetch response key count: ${Object.keys(responseHtml).length}`);
            } else 
                create429ErrorMessageOrThrowError(response.status);
        }).catch((error) => {
            if (error.message === 'Too many requests.') {
                Exception.Throw(error.message);
            } else {
                setCurrentPageMockData();
                Exception.Throw('setCurrentPageIndex: ' + error);
            }
        });
    } catch (error) {
        Exception.Throw('setCurrentPageIndex: ' + error);
    } finally {
        onDevelopmentCardClick();
        toggleBodyBackground();
        onContentPageLoaded_Finally()
        pushHistoryState('/')
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
        event?.preventDefault();
        toggleTopPageBackground(true);
        let pageBodyContainer = document.getElementById("page-body-container");

        let isFirstLoad = (document.getElementById('track-filter') == null); 
        let isCheckedAlready = document.querySelector('.track-filter-checkbox')?.checked;
        let appendText = ''; 
        if(isFirstLoad === true || isCheckedAlready === true) { 
            appendText = '?reverse=true'; 
        }
        let ctrl = (urls.getLocation() + 'GetJSONCompositionsPage/' + appendText);
        if (pageBodyContainer != null) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async (response) => {
                if (response.ok) {
                    let data = await response.json();
                    Debug.WriteLine('handling response text');
                    let trackDom = CreateDOMFromJSON(data);
                    $("#page-body-container").html('');
                    appendCheckBoxTo(pageBodyContainer, isFirstLoad ? true : isCheckedAlready);
                    $("#page-body-container").append(trackDom);
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {
                    setCurrentPageMockData();
                    Exception.Throw('setCurrentPageCompositions: ' + error); 
            });
        }
    } catch (error) {
        Exception.Throw('setCurrentPageCompositions: ' + error);
    } finally {
        // Push Anyway (even if not loaded)
        pushHistoryState('/Content/GetHTMLCompositionsPage');
        onContentPageLoaded_Finally()
    }
}

export async function setCurrentPageAlbums(event) {
    try {
        event?.preventDefault();
        toggleTopPageBackground(true);
        let ctrl = (urls.getLocation() + 'GetJSONAlbumsPage');
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let data = await response.json();
                    Debug.WriteLine('click-handlers.js/.. Handling response text');
                    let albumsDom = CreateAlbumsDOMFromJSON(data);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(albumsDom);
                    Debug.WriteLine('fetch response key count: ' + Object.keys(albumsDom).length);
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {
                setCurrentPageMockData();
                Exception.Throw('in setCurrentPageAlbums: ' + error); 
            });
        }
    } catch (error) {
        Exception.Throw('in setCurrentPageAlbums: ' + error);
    } finally {
        pushHistoryState('/Content/GetHTMLAlbumsPage');
        onContentPageLoaded_Finally()
    }
}

export async function setCurrentPageGenres(event) {
    try {
        event?.preventDefault();
        toggleTopPageBackground(true);
        let ctrl = (urls.getLocation() + 'GetJSONGenresPage');
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let data = await response.json();
                    Debug.WriteLine('Handling response text');
                    let genresDom = CreateGenresDOMFromJSON(data);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(genresDom);
                    Debug.WriteLine('fetch response key count: ' + Object.keys(genresDom).length);
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {
                setCurrentPageMockData();
                Exception.Throw('in setCurrentPageGenres: ' + error);
            });
        }
    } catch (error) {
        Exception.Throw('in setCurrentPageAlbums: ' + error);
    } finally {
        pushHistoryState('/Content/GetHTMLGenresPage');
        onContentPageLoaded_Finally()
    }
}

export async function setCurrentPageArtists(event) {
    try {
        event?.preventDefault();
        toggleTopPageBackground(true);
        //event?.preventDefault();
        let ctrl = (urls.getLocation() + 'GetJSONArtistsPage');
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) {     
                    let data = await response.json();
                    Debug.WriteLine('handling response text');
                    let artistsDom = CreateArtistsDOMFromJSON(data);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(artistsDom);  
                    Debug.WriteLine('fetch response key count: ' + Object.keys(artistsDom).length);
                } else 
                    create429ErrorMessageOrThrowError()
            })
            .catch((error) => {
                setCurrentPageMockData();
                Exception.Throw('in setCurrentPageArtists: ' + error);
            });
        }
    } catch (error) {
        Exception.Throw('in setCurrentPageArtists: ' + error);
    } finally {
        pushHistoryState('/Content/GetHTMLArtistsPage');
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

        let ctrl = (urls.getLocation() + 'GetPartialCompositionPageByArtistID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    Debug.WriteLine('fetch response key count: ' + Object.keys(responseText).length)
                } else if (response.status === 429) {
                    Exception.Throw('Request rate is too high');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    Exception.Throw(error.message);
                } else {
                    setCurrentPageMockData();
                    Exception.Throw('in GetPartialCompositionPageByArtistID/?id=' + id + '\n'+ error);
                }
            });
        }
    } catch (error) {
        Exception.Throw('in GetPartialCompositionPageByArtistID/?id=' + '\n'+ e);
    } finally {
        // Disabled push: History state is pushed 
        // by the concrete Track Id handler (NO PUSH HERE)
        // pushHistoryState('/Content/GetHtmlCompositionPageByArtistID/?id=' + id);
        onContentPageLoaded_Finally()
    }
}

/* Sets the compositions page based on the ALBUM ID
 * el - dom element on which the call invokes
*/
export async function setCurrentPageCompositionByID(el) {
    try {
        toggleTopPageBackground(true);
        let id = el;
        //TODO: event?
        if (!event.target.classList.contains('card-body')) {
            id = el.parentNode.children[0].value;
        } else {
            id = el.children[0].value;
        }

        let ctrl = (urls.getLocation() + 'GetPartialCompositionPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json'  },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    Debug.WriteLine('fetch response key count: ' + Object.keys(responseText).length)
                } else if (response.status === 429) {
                    Exception.Throw('Request rate is too high');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    Exception.Throw(error.message);
                } else {
                    setCurrentPageMockData();
                    Exception.Throw('in GetPartialCompositionPageByID/?id=' + id + '\n' + error);
                }
            });
        }
    } catch (error) {
        setCurrentPageMockData();
        Debug.WriteLine('fetch error. Setting up mock data. Details: ' + e)
    } finally {
        // Disabled push: History state is pushed 
        // by the concrete Track Id handler (NO PUSH HERE)
        //pushHistoryState('/Content/GetHtmlCompositionPageByID/?id=' + id);
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
        let ctrl = (urls.getLocation() + 'GetPartialAlbumPageByID/?id=' + id);
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    pushHistoryState('/Content/GetHtmlAlbumPageByID/?id=' + id);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                } else if (response.status === 429) {
                    Exception.Throw('Request rate is too high.');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    Exception.Throw(error.message);
                } else {
                    setCurrentPageMockData();
                    Exception.Throw('in setCurrentPageAlbumByID/?id=' + id + '\n' + error);
                }
            });
        }
    } catch (error) {
        setCurrentPageMockData();
        Exception.Throw('in setCurrentPageAlbumByID: ' + error);
    } finally {
        onContentPageLoaded_Finally()
    }
}

export async function FetchGetPartialListenedPage(nextActionInPipeLine, onCatchPipelineAction)
{
    await fetchContentCrossOrigin('GetPartialListenedPage', false).then(result => {
        if(result.ok) {
            nextActionInPipeLine();
        } else {
            (onCatchPipelineAction ?? (()=>{
                 console.log('[INF] No action executed for catch in get library handshake.')
            })) ();
        }
    });
}

export async function FetchPublicHandShake(nextActionInPipeLine, onCatchPipelineAction)
{
    console.log('Authroized must be false. Fetching public handshake instead...')
    await fetch(urls.getLocation() + 'PerformPublicHandShake').then(result => {
        if(result.ok) {
            nextActionInPipeLine();
        } else {
            (onCatchPipelineAction ?? (( ) => { 
                Exception.Throw('FetchPublicHandShake() -> onCatchPipelineAction argument was null.' )
            }))();
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
        event?.preventDefault();
        toggleTopPageBackground(true);
        let ctrl = (urls.getLocation() + 'Manage/Index');
        if ($("#page-body-container").length) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer'
            }).then(async (response) => {
                if(response.ok) {
                    let responseText = await response.text();
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    Debug.WriteLine('fetch response key count: ' + Object.keys(responseText).length)
                    pushHistoryState('Identity/Manage/Index');
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {
                setCurrentPageMockData();
                Exception.Throw('setCurrentPageManageAccount: ' + error);
            });
        }
    } catch (error) {
        Exception.Throw('setCurrentPageManageAccount: ' + error);
    } finally {
        toggleTopPageBackground(false);
    }
}

export async function setCurrentPageSignUp(event) {
    try {
        event?.preventDefault();
        toggleTopPageBackground(true);
        let ctrl = (urls.getLocation() + 'GetPartialSignUpPage');  // https://localhost:5001/GetPartialSignUpPage
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
            headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    
                    Debug.WriteLine('fetch response key count: ' + Object.keys(responseText).length);
                    pushHistoryState(`Identity/Account/Register`);

                    const button = document.getElementById('form-btn-default');
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        if(checkInputs()) setRegisterAntiForgeryOnClick();
                    });
                } else 
                    create429ErrorMessageOrThrowError(response.status);
            }).catch((error) => {         
                if (error.message === 'Too many requests.') {
                    Exception.Throw(error.message);
                } else {
                    setCurrentPageMockData();
                    Exception.Throw('setCurrentPageSignUp: ' + error); 
                }
            });
        }
    } catch (error) {
        Exception.Throw('setCurrentPageSignUp: ' + error);
    } finally {
        toggleTopPageBackground(false);
    }
}

export async function setCurrentPageRegister(event) {
    event?.preventDefault();
    try {
        if( redirectIfServerIsReachable('Identity/Account/Register') ) return;

        let prefix = urls.isNgrok() ? 'Identity/' : '';
    
        toggleTopPageBackground(true);
        console.log('Loading: ' + urls.getLocation() + 'Account/Register');
        let ctrl = (urls.getLocation() + prefix + 'Account/Register');
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    pushHistoryState(`Identity/Account/Register`);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    Debug.WriteLine('fetch response key count: ' + Object.keys(responseText).length)                    
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
                    Exception.Throw('Request rate is too high');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    Exception.Throw(error.message);
                } else {
                    setCurrentPageMockData();
                    Exception.Throw('in setCurrentPageRegister: ' + error);
                }
            });
        }
    } catch (error) {
        Exception.Throw('in setCurrentPageRegister: ' + error);
    } finally {
        toggleTopPageBackground(false);
    }
}

export async function setCurrentPageLogout(e)
{
    e?.preventDefault();
    const logoutUrl = urls.getLocation() + 'Identity/Account/Logout';
    Debug.WriteLine('Logout url: ' + logoutUrl)
    window.location = logoutUrl;
}

export async function setCurrentPageLogin(event) {
    try {
        if( redirectIfServerIsReachable('Identity/Account/Login') ) return;
        event?.preventDefault();

        let prefix = urls.isNgrok() ? 'Identity/' : '';
        toggleTopPageBackground(true);
        console.log('[INF] click-handlers.js/setCurrentPageLogin(): Loading: ' + urls.getLocation() + 'Account/Login');
        let ctrl = (urls.getLocation() + prefix + 'Account/Login');
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then(async response => {
                if (response.ok) { 
                    let responseText = await response.text();
                    $("#page-body-container").html('');
                    $("#page-body-container").append(responseText);
                    
                    Debug.WriteLine('fetch response key count: ' + Object.keys(responseText).length)                    
                    $('#__AjaxAntiForgeryForm').removeAttr('action'); //, location.host + 'Account/Login'
                    $('#__AjaxAntiForgeryForm').removeAttr('method');                    
                    $('#__AjaxAntiForgeryForm').attr('onsubmit', "return false");
                    $('#__AjaxAntiForgeryForm').attr('referrerpolicy', 'no-referrer')
                    $('.btn-default').removeAttr('type');
                    $('#__AjaxAntiForgeryForm').submit(function (e) {
                        setLoginAntiForgeryOnClick(e)
                    });
                    $('.btn-default').onclick = (e) => {setLoginAntiForgeryOnClick(e)}
                    pushHistoryState(`Identity/Account/Register`);
                } else if (response.status === 429) {
                    Exception.Throw('Request rate is too high');
                } else {
                    throw new Error('Fetch error.');
                }
            }).catch((error) => {
                if (error.message === 'Too many requests.') {
                    Exception.Throw(error.message);
                } else {
                    setCurrentPageMockData();
                    Exception.Throw('in setCurrentPageLogin: ' + error);
                }
            });
        }
    } catch (error) {
        Exception.Throw('in setCurrentPageLogin: ' + error);
    } finally {
        toggleTopPageBackground(false);
    }
}
