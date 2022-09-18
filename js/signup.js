// JS module for User sign up form inputs
// Interaction logic for -> SignUpPage.cshtml
import { LogMessageRequest } from './logging.js';
import { setRegisterAntiForgeryOnClick, setLoginAntiForgeryOnClick } from './Account/verification.js';

const form = document.getElementById('sign-up-form');
const username = document.getElementById('UserName');
const email = document.getElementById('Email');
const password = document.getElementById('Password');
const passwordCheck = document.getElementById('ConfirmPassword');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(checkInputs())
        setRegisterAntiForgeryOnClick();
});

function checkInputs() {
    alert('Данный функционал находится на стадии реализации. js ver = 106.12');
    // get the values from the inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordCheckValue = passwordCheck.value.trim();

    if( checkUsername(usernameValue) && checkEmail(emailValue) &&
        checkPassword(passwordValue) && checkPasswordRepeat(passwordValue, passwordCheckValue) 
    ) {
        LogMessageRequest('Ok, all is fine. JS Returned');
        return true;
    } else {
        return false;
    }
}

function checkUsername(value) {
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

function checkEmail(mlValue) {
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

function checkPassword(value) {
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

function checkPasswordRepeat(origin, repeat) {
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

function setErrorFor(input, message) {
    const group = input.parentElement;
    const small = group.querySelector('small');
    small.innerText = message; // add error message inside small
    small.className = 'form-control-small.error';
    input.className = 'form-control form-control-error';
    console.log('set error for func completed ok');
}

function setSuccessFor(input) {
    const group = input.parentElement; // .form-control
    const small = group.querySelector('small');
    input.className = 'form-control form-control-success';
    small.className = 'form-control-small';
}

function isValidEmail(ml) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(ml);
}