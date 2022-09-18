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
            // xhrFields: {
            //     withCredentials: true
            // },
            // crossDomain: true,
            data: JSON.stringify({
                'Input.UserName': username ?? "undefined",
                'Input.Password': password ?? "undefined",
                __RequestVerificationToken: token, 
                'Input.RememberMe': rememberMe
            }),
            success: function (result) {
                console.log('%j', result)
                alert(result);
            },
            error: function (xhr, ajaxOptions, thrownError){
                console.log(xhr, ajaxOptions, thrownError);
            }
        });
        return false;
    } catch (e) {
        console.log('%j' ,e);
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
            url: urls.getLocation() + 'Account/LoginCors',
            type: 'POST',
            dataType: 'json',
            contentType:'text/html',
            // xhrFields: {
            //     withCredentials: true
            // },
            // crossDomain: true,
            data: JSON.stringify({ 
                'Input.UserName': username ?? "undefined",
                'Input.Email': email ?? "undefined",
                'Input.Password': password ?? "undefined",
                'Input.ConfirmPassword': cPassword,
                __RequestVerificationToken: token
            }),
            success: function (result) {
                console.log('%j', result)
                alert(result);
            },
            error: function (xhr, ajaxOptions, thrownError){
                console.log(xhr, ajaxOptions, thrownError);
            }
        });
        return false;
    } catch (e) {
        console.log('%j' ,e);
        alert(e);
    }
}