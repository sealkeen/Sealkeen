import urls from './../api.js'
import { toggleForId } from '../Utils/ClassQuery.js';
import { fetchContentCrossOrigin } from './shared.js';

export async function runBackgroundHandShakes()
{
    if(urls.isGithub()) {
        setInterval(function() {
            onPerformHandShakeInterval()
        }, 8000);
    }
}

export async function onPerformHandShakeInterval(onSuccessAction)
{
    try {
        let ctrl = (urls.getLocation() + 'PerformPublicHandShake');
        if ($("#page-body-container") != undefined) {
            await fetch(ctrl, {
                method: 'GET', /* *GET, POST, PUT, DELETE, etc.*/ mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', /* include, *same-origin, omit */ headers: { 'Content-Type': 'application/json' }, // 'Content-Type': 'application/x-www-form-urlencoded',
                redirect: 'follow', /* manual, *follow, error*/ referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }).then((response) => {
                if(response.ok) {
                    toggleForId('srv-status-disabled', 'srv-status-enabled', '#srv-status-light', false);
                    onSuccessAction == null ? '' : onSuccessAction();
                }
                else throw new Error('Fetch error.');
            })
            .catch((error) => {
                toggleForId('srv-status-disabled', 'srv-status-enabled', '#srv-status-light', true)
                console.log('HandShake error. Doing nothing with it.')
            });
        }
    } catch (e) {
        console.log(e)
    } 
}

export async function onSiteLoadIfAuthorized()
{
    if(window.location.origin + "/" + urls.getPostfix() == window.location.href) // in the homepage
        onPerformHandShakeInterval(fetchContentCrossOrigin('GetPartialListenedPage'));
    else
        onPerformHandShakeInterval(null);
}