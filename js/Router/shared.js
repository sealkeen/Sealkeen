import urls, { pushHistoryState } from './../api.js'
import { toggleTopPageBackground, toggleBodyBackground } from './../StyleHandlers/color-handlers.js'
import { setDevelopmentMessages } from '../Development/news-data.js';

export function appendNavigationLink(navbarNav, element, path)
{
    if(document.querySelector(`#${element.Id}`) != null) {
        console.log('Element exists, no append: ' + element.Id);
        return;
    }

    let nPath = path.startsWith('Content/') ? path.replace('Content/', '') : path;
    element.innerHTML = element.innerHTML.replace('Partial', 'HTML')
    console.info('[INF] appendNavigationLink : ' + nPath);
    setElementOnClick(element, nPath);
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
export async function fetchContentCrossOrigin(path, shouldSaveState) {
    try {
        toggleTopPageBackground(true);
        let ngPath = path.indexOf('Content/') > 0 ? path.replace('Content/', '') : path;
        let ngCtrl = (path.startsWith("http") ? ngPath : urls.getLocation() + ngPath);
        let ghCtrl = (path.startsWith("http") ? path : urls.getLocation() + path);
        if ($("#page-body-container") != undefined) {
            console.log('[INF] Fecthing content CROSS ORIGIN (' + ngPath +')');
            let response = await fetch(ngCtrl, {
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
            if(shouldSaveState !== false) {
                if( (urls.isGithub() || urls.isNodeJSHost()) || urls.isRemoteWorkspace() )
                    pushHistoryState(path);
                else 
                    pushHistoryState(ngPath)
            }
            
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