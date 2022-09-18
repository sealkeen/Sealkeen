import urls from './../api.js'

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
        alert(e)
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
        alert(e)
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
        alert(e)
    }
}

import { ConvertToDOM } from './../Store/mock-data.js'
export function setCurrentPageMockData()
{
    $("#page-body-container").html('');
    $("#page-body-container").append(ConvertToDOM());
}
