import urls from './../api.js'
import { toggleBodyBackground } from './../StyleHandlers/color-handlers.js'
import { checkInputs } from '../signup.js';
import { addElementsForAuthorizedUser } from './authorized.js';
import { createInfoMessage } from '../Errors/fetch-errors.js';
import Debug from '../Extensions/cs-debug.js';
import Exception from '../Extensions/cs-exception.js';

export function setRegisterAntiForgeryOnClick() {
    try {
        if(!checkInputs())
            return;

        if(document.getElementById('ConfirmPassword') == null)
            return;

        $('#__AjaxAntiForgeryForm').removeAttr('action');
        let username = $('#UserName').val();
        let password= $('#Password').val();
        let email= $('#Email').val();
        let cPassword = $('#ConfirmPassword').val();

        var form = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', form).val();
        fetch(urls.getLocation() + 'Account/RegisterCors', {
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
                'UserName': username == null ? "undefined" : username,
                'Email': email == null ? "undefined" :  email,
                'Password': password == null ? "undefined" : password,
                'ConfirmPassword': cPassword,
                __RequestVerificationToken: token
            })
        }).then(result => {
            if(result.ok) {
                let div = document.createElement('div');
                let sucH1 = document.createElement('h1'); sucH1.className = 'text-info stroke-shadow'; sucH1.innerHTML = 'Success.' 
                let sucH2 = document.createElement('h2'); sucH2.className = 'text-info stroke-shadow-h3'; sucH2.innerHTML = 'Your Account has been registered successfully.'
                $("#page-body-container").html('');
                div.appendChild(sucH1); div.appendChild(sucH2);
                $("#page-body-container").append(div);
                // <h1 class="text-info">Success.</h1>
                // <h2 class="text-info">Your Account has been registered successfully.</h2>
                Debug.WriteLine('%j', result)
            } else {
                Exception.Throw('Ошибка регистрации');
            }
        }).catch(err => {
            try {
                var nodes = $(err.text()/*responseText*/).find('#page-body-container')
                if(nodes != undefined && Object.entries(nodes).length > 0) {
                    $("#page-body-container").html('');
                    $("#page-body-container").append(...nodes);
                    $("#page-body-container").css("background-color: ", "rgba(255, 255, 255)");
                    $("#page-body-container").css("border-radius", "5% 5% 40% 85%");
                    toggleBodyBackground();
                } else {
                    createInfoMessage('[INF] verification.js/setRegisterAntiForgeryOnClick() ajax response error')
                    Debug.WriteLine('verification.js/setRegisterAntiForgeryOnClick() ajax response error')
                }
            } catch (e) {
                createInfoMessage(`[ERR] verification.js/setRegisterAntiForgeryOnClick() try-catch-fetch-error ${e}`)
                console.log(`[ERR] verification.js/setRegisterAntiForgeryOnClick() try-catch-fetch-error ${e}`)
            }
        });
        return false;
    } catch (e) {
        createInfoMessage(`[ERR] verification.js/setRegisterAntiForgeryOnClick() ${e}`)
        console.log(`[ERR] verification.js/setRegisterAntiForgeryOnClick() ${e}`, )
        alert(e)
    }
}

export function setLoginAntiForgeryOnClick(e) {
    try {
        if(!checkInputs())
            return;
        $('#__AjaxAntiForgeryForm').removeAttr('action');
        let username = $('#UserName').val();
        Debug.WriteLine('verification.js/set... Username: ' + username);
        let password= $('#Password').val();
        let rememberMe = true;
        var form = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', form).val();

        fetch(urls.getLocation() + 'Account/LoginCors', {
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
                'UserName': username == null ? "undefined" : username,
                'Password': password == null ? "undefined" : password,
                __RequestVerificationToken: token,
                'RememberMe': rememberMe
            })
        }).then(result => {
            if(result.ok) {
                let div = document.createElement('div');
                let sucH1 = document.createElement('h1'); sucH1.className = 'text-info stroke-shadow'; sucH1.innerHTML = 'Success.' 
                let sucH2 = document.createElement('h2'); sucH2.className = 'text-info stroke-shadow-h3'; sucH2.innerHTML = 'Your have successfully logged in.'
                $("#page-body-container").html('');
                div.appendChild(sucH1); div.appendChild(sucH2);
                $("#page-body-container").append(div);
                addElementsForAuthorizedUser( () => { } );
            } else {
                createInfoMessage('Ошибка входа. Возможно, сервер недоступен.')
            }
        }).catch(err => {
            try {
                var nodes = $(err.text()/*responseText*/).find('#page-body-container')
                if(nodes != undefined && Object.entries(nodes).length > 0) {
                    $("#page-body-container").html('');
                    $("#page-body-container").append(...nodes);
                    $("#page-body-container").css("background-color: ", "rgba(255, 255, 255)");
                    $("#page-body-container").css("border-radius", "5% 5% 40% 85%");
                    toggleBodyBackground();
                } else {
                    Exception.Throw('[ERR] verification.js/set... ajax response error');
                }
            } catch (e) {
                console.log('[ERR] verification.js/set... try-catch-ajax-error' + e);
            }
        });
        return false;
    } catch (e) {
        console.log('%j', e);
        alert(e);
    }
};
