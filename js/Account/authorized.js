import urls from './../api.js'
import Debug from '../Extensions/cs-debug.js';
import lS from '../Services/Localization/fill-localization-store.js';
import { appendNavigationLink, fetchContentCrossOrigin } from '../Router/shared.js';
import { setCurrentPageLogin } from '../Router/click-handlers.js';
import Exception from '../Extensions/cs-exception.js';
import { showPopup } from '../Router/redirect-table.js';
import { InvokeAddEventListener, addRedirectEventListener } from '../Router/redirect.js';
import { createInfoMessage } from '../Errors/fetch-errors.js';

export async function addElementsForAuthorizedUser(pipeLineNext)
{
    try {
        window.isAuthorized = true
        const navbarNavs = document.getElementsByClassName('navbar-nav')
        Debug.WriteLine('Seek navbar')
        if(navbarNavs && navbarNavs[0] != null)
        {
            Debug.WriteLine('Seek navbar-nav')
            const navbarNav = navbarNavs[0]
            const lbPath = urls.getLocation() + 'Content/GetPartialListenedPage'
            const uplPath = urls.getLocation() + 'Content/GetPartialUploadedCompositionsPage'
            const library = createLibraryElement(lbPath)
            const uploaded = createUploadedElement(uplPath)
            appendNavigationLink(navbarNav, library, lbPath)
            appendNavigationLink(navbarNav, uploaded, uplPath)
            Authorized();
        } else {
            console.log('[INF/ERR] Navbar-nav not found')
        }
    } catch (e) {
        Exception.Throw('addElementsForAuthorizedUser: ' + e)
    }  
}

function createUploadedElement(path)
{
    let uploaded = document.createElement('li');
    uploaded.id = 'nav-lnk-uploaded';  
    uploaded.className = "nav-item";
    uploaded.innerHTML = `<a class="nav-link text-dark stroke-shadow-h3-white" href="${path}">Uploaded</a>`;
    return uploaded;
}

function createLibraryElement(path)
{
    let library = document.createElement('li');
    library.id = 'nav-lnk-library';  
    library.className = "nav-item";
    library.innerHTML = `<a class="nav-link text-dark stroke-shadow-h3-white" href="${path}">Library</a>`;
    return library;
}

function createNavAElement(id, href, innerText) {
    let result = document.createElement('a')
    result.innerText = innerText
    result.id = id
    result.href = href
    result.className = "nav-link text-dark stroke-shadow-h3-white"
    return result
}

var authorizedCallback = () => { }
const authorizedHandler = () => { showPopup("logout", "Redirect to auth service?", ['Redirect', 'Stay']) }
function Authorized()
{
    createInfoMessage('Authorized')
    Debug.WriteLine('Appending logout...')
    const logoutUrl = urls.getLocation() + 'Identity/Account/Logout'
    const login = document.querySelector('#nav-lnk-login')
    if(login) {
        let loginA = createNavAElement("btn-identity-account-login", logoutUrl, "Logout");
        authorizedCallback = InvokeAddEventListener(loginA, () => authorizedHandler() );
        login.className = 'nav-lnk-logout'
        login.appendChild(loginA)
        login.removeEventListener('click', setCurrentPageLogin)
        
        const register = document.getElementById('nav-lnk-register')
        if(register) register.style.display = 'none'
    }
}

var unauthorizedCallback = () => { }
const unauthorizedHandler = () => { showPopup("login", "Redirect to auth service?", ['Redirect', 'Stay']) }
export function Unauthorized()
{
    createInfoMessage('Unauthorized')
    const loginUrl = 'Identity/Account/Login'
    let text = lS.getDefault("nav-lnk-login")
    let loginA = createNavAElement("btn-identity-account-register", loginUrl, text);
    unauthorizedCallback = InvokeAddEventListener(loginA, () => unauthorizedHandler() );
    loginA.removeEventListener('click', authorizedCallback)

    const login = document.querySelector('#nav-lnk-login')
    login.className = 'nav-item'
    login.innerHTML = '';
    login.appendChild(loginA)
    const register = document.getElementById('nav-lnk-register')
    if(register) register.style.display = 'item-list'
}