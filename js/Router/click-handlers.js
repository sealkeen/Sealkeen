import urls, { pushHistoryState } from './../api.js'
import { LogMessageRequest } from '.././logging.js';
import { setLoginAntiForgeryOnClick, setRegisterAntiForgeryOnClick } from './../Account/verification.js'
import { checkInputs } from './../signup.js'
import { CreateDOMFromJSON, CreateArtistsDOMFromJSON, CreateAlbumsDOMFromJSON, CreateGenresDOMFromJSON } from './../Store/mock-data.js'


const loc = urls.getLocation();

export async function setCurrentPageIndex(event) {
    try {
        event.preventDefault();
        let ctrl = (urls.loc + 'IndexPartial');
        if ($("#page-body-container") != undefined) {
            var ftchIndx = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response.text();
                else
                    throw new Error('Fetch error.');
            })
            .then((responseText) => {
                $("#page-body-container").html('');
                $("#page-body-container").append(responseText);
                console.log('%j', responseText)
                console.log(responseText)
                pushHistoryState(urls.getPostfix());
            })
            .catch((error) => {
                console.log('fetch error. Doing nothing with it.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export async function setCurrentPageManageAccount(event) {
    try {
        event.preventDefault();
        let ctrl = (urls.loc + 'Manage/Index');
        if ($("#page-body-container") != undefined) {
            var ftchMngAcc = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response.text();
                else
                    throw new Error('Fetch error.');
            })
            .then((responseText) => {
                $("#page-body-container").html('');
                $("#page-body-container").append(responseText);
                console.log('%j', responseText)
                console.log(responseText)
                pushHistoryState(urls.getPostfix() + 'Manage/Index');
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export async function setCurrentPageSignUp(event) {
    try {
        event.preventDefault();
        let ctrl = (urls.loc + 'GetPartialSignUpPage');  // https://localhost:5001/GetPartialSignUpPage
        if ($("#page-body-container") != undefined) {
            var ftchSignUp = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response.text();
                else
                    throw new Error('Fetch error.');
            })
            .then((responseText) => {
                $("#page-body-container").html('');
                $("#page-body-container").append(responseText);
                console.log('%j', responseText)
                console.log(responseText);
                pushHistoryState('GetHtmlSignUpPage/');
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

import { ConvertToDOM } from './../Store/mock-data.js'
export function setCurrentPageMockData()
{
    $("#page-body-container").html('');
    $("#page-body-container").append(ConvertToDOM());
}


// TODO: separate
export async function setCurrentPageCompositions(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'GetJSONCompositionsPage');
        if ($("#page-body-container") != undefined) {
            var ftchComps = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response;
                else
                    throw new Error('Fetch error.');
            }).then(async (response) => {
                let data = await response.json();
                console.log('handling response text');
                let trackDom = CreateDOMFromJSON(data);
                $("#page-body-container").html('');
                $("#page-body-container").append(trackDom);
                pushHistoryState('GetHTMLCompositionsPage/');
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export async function setCurrentPageAlbums(event) {
    try {
        event.preventDefault();
        
        let ctrl = (loc + 'GetJSONAlbumsPage');
        if ($("#page-body-container") != undefined) {
            var ftchAlb = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response;
                else
                    throw new Error('Fetch error.');
            }).then(async (response) => {
                let data = await response.json();
                console.log('handling response text');
                let albumsDom = CreateAlbumsDOMFromJSON(data);
                pushHistoryState('GetHTMLAlbumsPage/');
                $("#page-body-container").html('');
                $("#page-body-container").append(albumsDom);
                console.log('%j', albumsDom)
                console.log(albumsDom)
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export async function setCurrentPageGenres(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'GetJSONGenresPage');
        if ($("#page-body-container") != undefined) {
            var ftchGnrs = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response;
                else
                    throw new Error('Fetch error.');
            }).then(async (response) => {
                pushHistoryState('GetHTMLGenresPage/');
                let data = await response.json();
                console.log('handling response text');
                let genresDom = CreateGenresDOMFromJSON(data);
                $("#page-body-container").html('');
                $("#page-body-container").append(genresDom);
                console.log('%j', genresDom)
                console.log(genresDom)
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export async function setCurrentPageArtists(event) {
    try {
        //event.preventDefault();
        let ctrl = (loc + 'GetJSONArtistsPage');
        if ($("#page-body-container") != undefined) {
            var ftchArts = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response;
                else
                    throw new Error('Fetch error.');
            }).then(async (response) => {
                pushHistoryState('GetHTMLArtistsPage/');
                let data = await response.json();
                console.log('handling response text');
                let artistsDom = CreateArtistsDOMFromJSON(data);
                $("#page-body-container").html('');
                $("#page-body-container").append(artistsDom);
                console.log('%j', artistsDom)
                console.log(artistsDom)
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export async function setCurrentPageCompositionByArtistID(el) {
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
            var ftchCmpsById = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response.text();
                else
                    throw new Error('Fetch error.');
            })
            .then((responseText) => {
                pushHistoryState('GetPartialCompositionPageByArtistID/?id=' + id);
                $("#page-body-container").html('');
                $("#page-body-container").append(responseText);
                console.log('%j', responseText)
                console.log(responseText)
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export async function setCurrentPageCompositionByID(el) {
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
            var ftchPartCmpsById = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response.text();
                else
                    throw new Error('Fetch error.');
            })
            .then((responseText) => {
                pushHistoryState('GetPartialCompositionPageByID/?id=' + id);
                $("#page-body-container").html('');
                $("#page-body-container").append(responseText);
                console.log('%j', responseText)
                console.log(responseText)
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export async function setCurrentPageAlbumByID(el) {
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
            var ftchPartAlbmsById = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response.text();
                else
                    throw new Error('Fetch error.');
            })
            .then((responseText) => {
                pushHistoryState('GetPartialAlbumPageByID/?id=' + id);
                $("#page-body-container").html('');
                $("#page-body-container").append(responseText);
                console.log('%j', responseText)
                console.log(responseText)
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export async function setCurrentPageRegister(event) {
    try {
        event.preventDefault();
        console.log('Loading: ' + loc + 'Account/Register');
        let ctrl = (loc + 'Account/Register');
        if ($("#page-body-container") != undefined) {
            var ftchPartRegister = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response.text();
                else
                    throw new Error('Fetch error.');
            })
            .then((responseText) => {
                pushHistoryState('Account/Register/');
                $("#page-body-container").html('');
                $("#page-body-container").append(responseText);
                console.log('%j', responseText)
                console.log(responseText)                    
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
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export async function setCurrentPageLogin(event) {
    try {
        event.preventDefault();
        console.log('Loading: ' + loc + 'Account/Login');
        let ctrl = (loc + 'Account/Login');
        if ($("#page-body-container") != undefined) {
            var ftchPartLgn = await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response.text();
                else
                    throw new Error('Fetch error.');
            })
            .then((responseText) => {
                $("#page-body-container").html('');
                $("#page-body-container").append(responseText);
                console.log('%j', responseText)
                console.log(responseText)                    
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
            })
            .catch((error) => {
                setCurrentPageMockData();
                console.log('fetch error. Setting up mock data.')
            });
        }
    } catch (e) {
        console.log(e);
    }
}