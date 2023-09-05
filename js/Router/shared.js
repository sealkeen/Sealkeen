import urls, { pushHistoryState } from './../api.js'
import { toggleTopPageBackground, toggleBodyBackground } from './../StyleHandlers/color-handlers.js'
import { setDevelopmentMessages } from '../Development/news-data.js';
import routes from './routing-table.js';

//appendNavigationLink(navbarNav, library, 'GetPartialListenedPage')
export function appendNavigationLink(navbarNav, element, path)
{
    if(document.querySelector(`#${element.Id}`) != null) {
        console.log('Element exists, no append: ' + element.Id);
        return;
    }

    element.innerHTML = element.innerHTML.replace('Partial', 'HTML')
    console.info('[INF] appendNavigationLink : ' + path);
    setElementOnClick(element, path);
    navbarNav.appendChild(element);
}

function setElementOnClick(element, path)
{
    element.addEventListener('click', 
    (event) => {
        event.preventDefault();
        fetchContentCrossOrigin(path)
    });
}

export function onDevelopmentCardClick()
{
    if(document.querySelector('#development-body') === null) {
        let developmentBody = document.createElement('div')
        developmentBody.id = 'development-body';
        document.querySelector('#page-body-container').appendChild(developmentBody)
    }
    setDevelopmentMessages();
}
export async function fetchContentCrossOrigin(path) {
    try {
        toggleTopPageBackground(true);
        let ctrl = (path.startsWith("http") ? path : urls.getLocation() + path);
        if ($("#page-body-container") != undefined) {
            console.log('[INF] Fecthing content CROSS ORIGIN (' + path +')');
            let response = await fetch(ctrl, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            });

            if (!response.ok) { throw new Error('Fetch error.'); }
            
            let responseText = await response.text();
            $("#page-body-container").html('');
            $("#page-body-container").append(responseText);
            console.log('[INF] fetch response key count: ' + Object.keys(responseText).length);
            let goToPath = "";
            pushHistoryState(goToPath + path);
            console.error(`Routes not some ${path}, %j`, routes);
            
            return response;
        }
    } catch (e) {
        console.log(e);
        return { ok : false };
    } finally {
        toggleTopPageBackground(false);
        toggleBodyBackground();
    }
}