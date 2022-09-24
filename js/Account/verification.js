import urls from './../api.js'
import { getCookie } from './../utilities.js'
import colorHandlers from './../StyleHandlers/color-handlers.js'

export function setLoginAntiForgeryOnClick(e) {
    try {
        //let c = getCookie('.AspNetCore.Antiforgery');
        //console.log('%j', c);
        //console.log(c);

        $('#__AjaxAntiForgeryForm').removeAttr('action');
        let username = $('#UserName').val();
        console.log('Username: ' + username);
        let password= $('#Password').val();
        let rememberMe = true;
        var form = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', form).val();
        var stLgnAntFrgNClk = fetch(urls.getLocation() + 'Account/LoginCors', {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                'UserName': username ?? "undefined",
                'Password': password ?? "undefined",
                __RequestVerificationToken: token,
                'RememberMe': rememberMe
            })
        }).then(result => {
            if(result.ok) {
                console.log('%j', result)
                alert('Успешный вход.');
            } else {
                alert('Ошибка входа');
            }
        }).catch(err => {
            try {
                var nodes = $(err.responseText).find('#page-body-container')
                if(nodes != undefined && Object.entries(nodes).length > 0) {
                    $("#page-body-container").html('');
                    $("#page-body-container").append(...nodes);
                    $("#page-body-container").css("background-color: ", "rgba(255, 255, 255)");
                    $("#page-body-container").css("border-radius", "5% 5% 40% 85%");
                    colorHandlers.toggleBodyBackground();
                } else {
                    console.log('ajax response error');
                }
            } catch (e) {
                console.log('try-catch-ajax-error' + e);
            }
        })
        return false;
    } catch (e) {
        console.log('%j', e);
        alert(e);
    }
}

export function setRegisterAntiForgeryOnClick() {
    try {
        $('#__AjaxAntiForgeryForm').removeAttr('action');
        let username = $('#UserName').val();
        let password= $('#Password').val();
        let email= $('#Email').val();
        let cPassword = $('#ConfirmPassword').val();

        var form = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', form).val();
        $.ajax({
            url: urls.getLocation() + 'Account/RegisterCors',
            type: 'POST',
            dataType: 'json',
            contentType:'text/html',
            headers: {
                'Content-Type': 'application/json',
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: JSON.stringify({ 
                'UserName': username ?? "undefined",
                'Email': email ?? "undefined",
                'Password': password ?? "undefined",
                'ConfirmPassword': cPassword,
                __RequestVerificationToken: token
            }),
            success: function (result) {
                console.log('%j', result)
                alert('Успешная регистрация.');
            },
            error: function (err){
                try {
                    var nodes = $(err.responseText).find('#page-body-container')
                    if(nodes != undefined && Object.entries(nodes).length > 0) {
                        $("#page-body-container").html('');
                        $("#page-body-container").append(...nodes);
                        $("#page-body-container").css("background-color: ", "rgba(255, 255, 255)");
                        $("#page-body-container").css("border-radius", "5% 5% 40% 85%");
                        toggleBodyBackground();
                    } else {
                        console.log('ajax response error');
                    }
                } catch (e) {
                    console.log('try-catch-ajax-error' + e);
                }
            }
        });
        return false;
    } catch (e) {
        console.log('%j' ,e);
        alert(e);
    }
}