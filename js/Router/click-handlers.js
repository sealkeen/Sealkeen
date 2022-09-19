import urls from './../api.js'
const loc = urls.getLocation();

export function setCurrentPageIndex(event) {
    try {
        event.preventDefault();
        let ctrl = (urls.loc + 'IndexPartial');
        if ($("#page-body-container") != undefined) {
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
        console.log(e)
    }
}

export function setCurrentPageManageAccount(event) {
    try {
        event.preventDefault();
        let ctrl = (urls.loc + 'Manage/Index');
        if ($("#page-body-container") != undefined) {
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
                    //window.history.pushState(null, null, '/Sealkeen/Identity/Account/Manage');
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
        console.log(e)
    }
}

export function setCurrentPageSignUp(event) {
    try {
        event.preventDefault();
        let ctrl = (urls.loc + 'GetPartialSignUpPage');  // https://localhost:5001/GetPartialSignUpPage
        if ($("#page-body-container") != undefined) {
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
                    //window.history.pushState(null, null, '/Sealkeen/GetPartialSignUpPage');
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
export function setCurrentPageCompositions(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'GetPartialCompositionsPage');
        if ($("#page-body-container") != undefined) {
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
                    //window.history.pushState(null, null, '/Sealkeen/CompositionsPage');
                    LogMessageRequest('setCurrentPageCompositions(): Ajax returned key count: ' + Object.keys(response).length);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response); 

                },
                error: function (error_) {
                    setCurrentPageMockData();
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        console.log(e)
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
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    //window.history.pushState(null, null, '/Sealkeen/AlbumsPage');
                    console.log('setCurrentPageAlbums(): Ajax returned key count: ' + Object.keys(response).length);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);

                },
                error: function (error_) {
                    setCurrentPageMockData();
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        console.log(e)
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
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    //window.history.pushState(null, null, '/Sealkeen/GenresPage');
                    console.log('setCurrentPageGenres(): Ajax returned key count: ' + Object.keys(response).length);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);

                },
                error: function (error_) {
                    setCurrentPageMockData();
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export function setCurrentPageArtists(event) {
    try {
        event.preventDefault();
        let ctrl = (loc + 'GetPartialArtistsPage');
        if ($("#page-body-container") != undefined) {
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
                    //window.history.pushState(null, null, '/Sealkeen/ArtistsPage');
                    console.log('setCurrentPageAudio(): Ajax returned key count: ' + Object.keys(response).length);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);

                },
                error: function (error_) {
                    setCurrentPageMockData();
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        console.log(e)
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
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    LogMessageRequest('setCurrentPageCompositionByArtistID(el): Ajax returned key count: ' + Object.keys(response).length);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function (error_) {
                    setCurrentPageMockData();
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        console.log(e)
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
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    LogMessageRequest('setCurrentPageCompositionByID(el): Ajax returned key count: ' + Object.keys(response).length);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                },
                error: function (error_) {
                    setCurrentPageMockData();
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        console.log(e)
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
                xhrFields: {
                   withCredentials: true
                },
                crossDomain: true,
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    console.log('setCurrentPageAlbumByID(el): Ajax returned key count: ' + Object.keys(response).length);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);

                },
                error: function (error_) {
                    setCurrentPageMockData();
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        console.log(e)
    }
}

export function setCurrentPageRegister(event) {
    try {
        event.preventDefault();
        console.log('Loading: ' + loc + 'Account/Register');
        let ctrl = (loc + 'Account/Register');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    //window.history.pushState(null, null, '/Sealkeen/Identity/Account/Register');
                    // console.log('setCurrentPageSignUp(): Ajax returned key count: ' + Object.keys(response).length);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                    $('#__AjaxAntiForgeryForm').removeAttr('action'); //, urls.getLocation() + 'Account/Login'
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
                    //let btn = document.createElement("button");
                    //btn.id = 'btn-submit-onclick';
                    //btn.className = 'btn btn-primary form-control';
                    //btn.onclick = (e) => {setRegisterAntiForgeryOnClick(e)}
                    //document.body.appendChild(btn);
                },
                error: function (error_) {
                    setCurrentPageMockData();
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export function setCurrentPageLogin(event) {
    try {
        event.preventDefault();
        console.log('Loading: ' + loc + 'Account/Login');
        let ctrl = (loc + 'Account/Login');
        if ($("#page-body-container") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl,
                type: 'GET',
                contentType: 'html',
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    //window.history.pushState(null, null, '/Sealkeen/Identity/Account/Login');
                    // console.log('setCurrentPageSignUp(): Ajax returned key count: ' + Object.keys(response).length);
                    $("#page-body-container").html('');
                    $("#page-body-container").append(response);
                    $('#__AjaxAntiForgeryForm').removeAttr('action'); //, urls.getLocation() + 'Account/Login'
                    $('#__AjaxAntiForgeryForm').removeAttr('method');                    
                    $('#__AjaxAntiForgeryForm').attr('onsubmit', "return false");
                    $('#__AjaxAntiForgeryForm').attr('referrerpolicy', 'no-referrer')
                    $('.btn-default').removeAttr('type');
                    $('#__AjaxAntiForgeryForm').submit(function (e) {
                        setLoginAntiForgeryOnClick(e)
                    });
                    $('.btn-default').onclick = (e) => {setLoginAntiForgeryOnClick(e)}

                    //let btn = document.createElement("button");
                    //btn.id = 'btn-submit-onclick';
                    //btn.className = 'btn btn-primary form-control';
                    //btn.onclick = (e) => {setLoginAntiForgeryOnClick(e)}
                    //document.body.appendChild(btn);
                },
                error: function (error_) {
                    setCurrentPageMockData();
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}