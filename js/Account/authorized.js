import urls from './../api.js'
import { appendNavigationLink, fetchContentCrossOrigin } from '../Router/shared.js';
import { setCurrentPageLogin } from '../Router/click-handlers.js';
import Debug from '../Extensions/cs-debug.js';
import routes from '../Router/routing-table.js';

export async function addElementsForAuthorizedUser(pipeLineNext)
{
    try {
        window.isAuthorized = true;
        const navbarNavs = document.getElementsByClassName('navbar-nav');
        Debug.WriteLine('Seek navbar');
        if(navbarNavs && navbarNavs[0] != null)
        {
            Debug.WriteLine('Seek navbar-nav');
            const navbarNav = navbarNavs[0];
            const lbPath = urls.getLocation() + 'Content/GetPartialListenedPage';
            const uplPath = urls.getLocation() + 'Content/GetPartialUploadedCompositionsPage'
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
    Debug.WriteLine('Appending logout...')
    const logoutUrl = urls.getLocation() + 'Identity/Account/Logout';
    const login = document.querySelector('#nav-lnk-login');
    if(login) {
        login.className = 'nav-lnk-logout'
        //login.textContent = '';
        login.innerHTML = `<a class="nav-link text-dark stroke-shadow-h3-white" href="${logoutUrl}">Logout</a>`;
        login.removeEventListener('click', setCurrentPageLogin);
        login.addEventListener('click', (e) => {
            Debug.WriteLine('Logout url: ' + logoutUrl)
            window.location = logoutUrl;
        });
        const register = document.getElementById('nav-lnk-register');
        if(register) register.remove();
    }
}