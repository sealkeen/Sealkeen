import urls from './../api.js'
import { getCookie } from './../utilities.js'

export function setLoginAntiForgeryOnClick() {
    try {
        let c = getCookie('.AspNetCore.Antiforgery');
        console.log('%j', c);
        console.log(c);

        $('#__AjaxAntiForgeryForm').removeAttr('action');
        let username = $('#UserName').val();
        console.log('Username: ' + username);
        let password= $('#Password').val();
        let rememberMe = true;
        var form = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', form).val();
        $.ajax({
            url: urls.getLocation() + 'Account/LoginCors',
            type: 'POST',
            dataType: 'json',
            contentType:'text/html',
            headers: {
              'Content-Type': 'application/json',
            },
            // xhrFields: {
            //     withCredentials: true
            // },
            // crossDomain: true,
            data: JSON.stringify({
                'UserName': username ?? "undefined",
                'Password': password ?? "undefined",
                __RequestVerificationToken: token,
                'RememberMe': rememberMe
            }),
            success: function (result) {
                console.log('%j', result)
                alert('Успешный вход.');
            },
            error: function (xhr, ajaxOptions, thrownError){
                console.log(xhr, ajaxOptions, thrownError);
            }
        });
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
            // xhrFields: {
            //     withCredentials: true
            // },
            // crossDomain: true,
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
                    console.log('err: %j', err);
                    console.log('err.responseText: %j', $(err.responseText));
                    console.log('$(err.responseText)[1]: %j', $(err.responseText)[1]);
                    console.log('$($(err.responseText)[1]).text() %j', $($(err.responseText)[1]).text());
                    var parsed = JSON.parse(err.responseText);
                    console.log('JSON.parse(err.responseText) %j', parsed);
                    //$($(err.responseText)[1]).text();
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