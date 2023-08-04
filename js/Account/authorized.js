import urls from './../api.js'
import { appendNavigationLink } from '../Router/shared.js';
import { setCurrentPageLogin } from '../Router/click-handlers.js';

export async function addElementsForAuthorizedUser(pipeLineNext)
{
    try {
        const navbarNavs = document.getElementsByClassName('navbar-nav');
        console.log('[DBG] Seek navbar');
        if(navbarNavs && navbarNavs[0] != null)
        {
            console.log('[DBG] Seek navbar-nav');
            const navbarNav = navbarNavs[0];
            const lbPath = urls.getLocation() + 'GetPartialListenedPage';
            const uplPath = urls.getLocation() + 'GetPartialUploadedCompositionsPage'
            const library = createLibraryElement(lbPath);
            const uploaded = createUploadedElement(uplPath);
            appendNavigationLink(navbarNav, library, lbPath)
            appendNavigationLink(navbarNav, uploaded, uplPath)
            appendLogOut();
        } else {
            console.log('[INF] Navbar-nav not found')
        }
    } catch (e) {
        console.error('addElementsForAuthorizedUser: ' + e);
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

function appendLogOut()
{
    console.log('[DBG] Appending logout...')
    const logoutUrl = urls.getLocation() + 'Identity/Account/Logout';
    const login = document.querySelector('#nav-lnk-login');
    if(login) {
        login.className = 'nav-lnk-logout'
        login.textContent = 'Logout';
        login.removeEventListener('click', setCurrentPageLogin);
        login.addEventListener('click', (e) => {
            console.log('Logout url: ' + logoutUrl)
            window.location = logoutUrl;
        });
        const register = document.getElementById('nav-lnk-register');
        if(register) register.remove();
    }
}