import urls, { anyPathSpecified } from './../api.js'
import { toggleForId } from '../Utils/ClassQuery.js';
import Debug from '../Extensions/cs-debug.js';
import { setDevelopmentMessages } from '../Development/news-data.js';
import { FetchGetPatialListenedPage } from './click-handlers.js';
import { addElementsForAuthorizedUser } from '../Account/authorized.js';

window.handShakeCondition = false;

const MAX_INTERVAL = 48500; // Max value for the HandShake Health condition in milliseconds
const DEFAULT_INTERVAL = 8000; // Default handshake interval value is ms
const INTERVAL_INCREASE = 1450; // Increase interval after the handshake is failed in ms
var g_interval = DEFAULT_INTERVAL;
var g_inProcess = false;
const isVisibilityHiddenState = 'hidden';

export async function runBackgroundHandShakes()
{
    setInterval(async function() {
        if(//document.visibilityState !== isVisibilityHiddenState && 
            g_inProcess == false &&
            (urls.isGithub() || window.handShakeCondition)
        ) {
            g_inProcess = true;
            onPerformHandShakeInterval(noOp);
        }
    }, g_interval);
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
            }).then(async (response) => {
                //countCookies();
                if(response.ok) {
                    g_interval = DEFAULT_INTERVAL;
                    toggleForId('srv-status-disabled', 'srv-status-enabled', '#srv-status-light', false);
                    onSuccessAction().then(() => {
                        if (!document.getElementById("development-body")) {
                            setDevelopmentMessages();
                        }
                    });
                }
                else throw new Error('Fetch error.');
            })
            .catch((error) => {
                toggleForId('srv-status-disabled', 'srv-status-enabled', '#srv-status-light', true)
                if(g_interval < MAX_INTERVAL) 
                    g_interval += INTERVAL_INCREASE;
                    
                console.log(`[INF] HandShake not sucessfull. Increased handshake interval to ${g_interval} ⛔%j`, error);
                setDevelopmentMessages();
            });
        }
    } catch (e) {
        console.log(e)
    } finally {
        g_inProcess = false;
    }
}

export async function onSiteLoadIfAuthorized(skipLibraryFetch)
{
    if ( window.isAuthorized === false && anyPathSpecified(window.location.href)) {
        skipLibraryFetch = true
    }
    if(
        urls.isHomePage() || skipLibraryFetch === true
    ) {
        // Only
        const nextActionInPipeLine = //urls.isGithub() || urls.isNodeJSHost() ? 
            addElementsForAuthorizedUser 
        // noOp;
        if(skipLibraryFetch === true)
            onPerformHandShakeInterval(nextActionInPipeLine);
        else
            onPerformHandShakeInterval(async () => { FetchGetPatialListenedPage(nextActionInPipeLine); });
    } else {
        onPerformHandShakeInterval(noOp);
    }
}

export function countCookies()
{
    response.headers.forEach((val, key) => {
        if(key === 'set-cookie'){
            count += val.split("; ").length;
        }
    });
    Debug.WriteLine('" + count + " cookies found');
}

async function noOp() {}