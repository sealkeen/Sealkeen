import urls, { pushHistoryState } from './../api.js'
import { toggleTopPageBackground, toggleBodyBackground } from './../StyleHandlers/color-handlers.js'
import { setDevelopmentMessages } from '../Development/news-data.js';
import Exception from '../Extensions/cs-exception.js';

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
        if(window.isAuthorized !== true) 
            Exception.Throw("[401] Unauthorized - Forbidden");
        else {
            fetchContentCrossOrigin(path, true, 'error')
        }
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

export async function fetchContentCrossOrigin(path, shouldSaveState, shouldRedirect) {
    try {
        toggleTopPageBackground(true);
        shouldRedirect = shouldRedirect || 'follow';
        let ngPath = path.indexOf('Content/') > -1 ? path.replace('Content/', '') : path;
        let ngCtrl = (path.startsWith("http") ? ngPath : urls.getLocation() + ngPath);
        let ghCtrl = (path.startsWith("http") ? path : urls.getLocation() + path);
        if ($("#page-body-container") != undefined) {
            console.log('[INF] Fetching content CROSS ORIGIN (' + ngCtrl +')');
            let response = await fetch(ngCtrl, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                redirect: shouldRedirect,
                referrerPolicy: 'no-referrer'
            });

            if (!response.ok) { 
                console.log('fetchContentCrossOrigin() -> response not ok, returning { ok: false }')
                Exception.Throw(`Fetch error for <${ngCtrl}>: ` + JSON.stringify(response)); 
                return { ok : false };
            }
            
            let responseText = await response.text();
            $("#page-body-container").html('');
            $("#page-body-container").append(responseText); 
            console.log('[INF] fetch response key count: ' + Object.keys(responseText).length);
            if(shouldSaveState !== false) {
                if( urls.isGithub() || urls.isNodeJSHost() || urls.isRemoteWorkspace() )
                    pushHistoryState(path)
                else
                    pushHistoryState(ngPath)
            }
            
            return response;
        }
    } catch (e) {
        Exception.Throw('shared.js/fetch(): ' + e)
        return { ok : false };
    } finally {
        toggleTopPageBackground(false);
        toggleBodyBackground();
    }
}