// JS module for User sign up form inputs
// Interaction logic for -> SignUpPage.cshtml
import { LogMessageRequest } from './logging.js';
import { setRegisterAntiForgeryOnClick, setLoginAntiForgeryOnClick } from './Account/verification.js';

const button = document.getElementById('form-btn-default');
const username = document.getElementById('UserName');
const email = document.getElementById('Email');
const password = document.getElementById('Password');
const passwordCheck = document.getElementById('ConfirmPassword');

button?.addEventListener('click', (e) => {
    e.preventDefault();

    if(checkInputs())
        setRegisterAntiForgeryOnClick();
});

export function checkInputs() {
    // alert('Данный функционал находится на стадии реализации. js ver = 106.12');
    // get the values from the inputs
    const usernameValue = username.value.trim();
    const emailValue = email?.value.trim();
    const passwordValue = password.value.trim();
    const passwordCheckValue = passwordCheck?.value.trim();

    if( checkUsername(usernameValue) && checkPassword(passwordValue) 
        && checkEmail(emailValue) &&checkPasswordRepeat(passwordValue, passwordCheckValue) 
    ) {
        LogMessageRequest('Ok, all is fine. JS Returned');
        return true;
    } else {
        return false;
    }
}

export function checkUsername(value) {
    //alert('username... value is: ' + value);
    if (value === '') { //console.log('username: blank');
        setErrorFor(username, 'Username cannot be blank'); // show error 
        return false;
    } else {
        setSuccessFor(username); // add success class
        return true;
    }
    //alert('username: ok');
}

export function checkEmail(mlValue) {
    if(email == null)
        return true;
    //alert('email... value is: ' + mlValue);
    if (mlValue === '') { 
        setErrorFor(email, 'Email cannot be blank');
        return false;
    } else if (!isValidEmail(mlValue)) {
        setErrorFor(email, 'Email is not valid');
        return false;
    } else {
        setSuccessFor(email);
        return true;
    }
    //alert('email: ok');
}

export function checkPassword(value) {
    //console.log('password... value is: ' + value);
    if (value === '') {
        setErrorFor(password, 'Password cannot be empty');
        return false;
    } else {
        setSuccessFor(password);
        console.log('password: ok');
        return true;
    }
}

export function checkPasswordRepeat(origin, repeat) {
    if(passwordCheck == null)
        return true;
    //console.log('passwordChk... value is: ' + repeat);
    if (repeat === '') {
        setErrorFor(passwordCheck, 'Password cannot be empty');
        return false;
    } else if (origin !== repeat) {
        setErrorFor(passwordCheck, 'Passwords should match');
        return false;
    } else {
        setSuccessFor(passwordCheck);
        console.log('passwordChk: ok');
        return true;
    }
}

export function setErrorFor(input, message) {
    if(input == undefined)
        return
    let group = input.parentElement;
    let small = group.querySelector('small')
    console.log('err, small: %j', small)
    if(small == undefined) {
        small = document.createElement('small');
        group.appendChild(small);
    }
    small.innerText = message; // add error message inside small
    small.className = 'form-control-small.error';
    input.className = 'form-control form-control-error';
    console.log('set error for func completed ok');
}

export function setSuccessFor(input) {
    if(input == undefined)
        return
    let group = input.parentElement; // .form-control
    let small = group.querySelector('small')
    console.log('suc, small: %j', small)
    if(small == undefined) {
        small = document.createElement('small');
        group.appendChild(small);
    }
    input.className = 'form-control form-control-success';
    small.className = 'form-control-small';
}

export function isValidEmail(ml) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(ml);
}