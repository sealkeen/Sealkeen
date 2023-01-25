import urls, { pushHistoryState } from './../api.js'
import { toggleTopPageBackground, toggleBodyBackground } from './../StyleHandlers/color-handlers.js'
import { setDevelopmentMessages } from '../Development/news-data.js';

export function onDevelopmentCardClick()
{
    if(document.querySelector('#development-body') === null) {
        let developmentBody = document.createElement('div')
        developmentBody.id = 'development-body';
        document.querySelector('#page-body-container').appendChild(developmentBody)
    }
    setDevelopmentMessages();
}

export async function fetchContentCrossOrigin(path)
{
    try {
        toggleTopPageBackground(true);
        let ctrl = (urls.getLocation() + path);
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/json' /* 'Content-Type': 'application/x-www-form-urlencoded',*/ },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok)
                    return response.text();
                else
                    throw new Error('Fetch error.');
            })
            .then((responseText) => {
                $("#page-body-container").html('');
                $("#page-body-container").append(responseText);
                console.log('fetch response key count: ' + Object.keys(responseText).length)
                pushHistoryState(urls.getPostfix());
            })
            .catch((error) => {
                console.log('fetch error. Doing nothing with it.')
            });
        }
    } catch (e) {
        console.log(e)
    } finally {
        toggleTopPageBackground(false);
        toggleBodyBackground();
    }
}