import urls from './../api.js'
import { fetchContentCrossOrigin } from '../Router/shared.js';
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
            let library = document.createElement('li');
            library.id = 'nav-lnk-library';  
            library.className = "nav-item";
            library.innerHTML = '<a class="nav-link text-dark stroke-shadow-h3-white">Library</a>';
            console.log('[DBG] append ');
            setLibraryPageOnClick(library);
            navbarNav.appendChild(library);
            appendLogOut();
        } else {
            console.log('[INF] Navbar-nav not found')
        }
    } catch (e) {
        console.error('addElementsForAuthorizedUser: ' + e);
    }  
}

function appendLogOut()
{
    console.log('[DBG] Appending logout...')
    const logoutUrl = urls.getLocation() + 'Identity/Account/Logout';
    const login = document.querySelector('#nav-lnk-login');
    if(login) {
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

function setLibraryPageOnClick(library)
{
    library.addEventListener('click', 
    (event) => {
        fetchContentCrossOrigin('GetPartialListenedPage')
    });
}