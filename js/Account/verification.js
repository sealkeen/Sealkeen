import urls from './../api.js'

export function setLoginAntiForgeryOnClick() {
    try {
        $('#__AjaxAntiForgeryForm').removeAttr('action');
        let username = $('#UserName').value.trim();
        let password= $('#Password').value.trim();
        let rememberMe = true;
        var form = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', form).val();
        $.ajax({
            url: urls.getLocation() + 'Account/Login',
            type: 'POST',
            dataType: 'jsonp',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                __RequestVerificationToken: token, 
                UserName: username,
                Password: password,
                RememberMe: rememberMe
            },
            success: function (result) {
                console.log('%j', result)
                alert(result);
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
        let username = $('#UserName').value.trim();
        let password= $('#Password').value.trim();
        let email= $('#Email').value.trim();
        let cPassword = $('#ConfirmPassword').value.trim();

        var form = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', form).val();
        $.ajax({
            url: urls.getLocation() + 'Account/Register',
            type: 'POST',
            dataType: 'jsonp',
            xhrFields: {
            withCredentials: true
            },
            crossDomain: true,
            data: { 
                __RequestVerificationToken: token, 
                UserName: username,
                Email: email,
                Password: password,
                ConfirmPassword: cPassword
            },
            success: function (result) {
                console.log('%j', result)
                alert(result);
            }
        });
        return false;
    } catch (e) {
        console.log('%j' ,e);
        alert(e);
    }
}