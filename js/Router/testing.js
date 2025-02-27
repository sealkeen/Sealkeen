import urls, { anyPathSpecified } from './../api.js'
import { toggleForId } from '../Shared/ClassQuery.js';
import Debug from '../Extensions/cs-debug.js';
import { setDevelopmentMessages } from '../Development/news-data.js';
import { FetchGetPartialListenedPage, FetchPublicHandShake } from './click-handlers.js';
import { addElementsForAuthorizedUser, Unauthorized } from '../Account/authorized.js';
import { createInfoMessage } from '../Errors/fetch-errors.js';

window.handShakeCondition = false;

const MAX_INTERVAL = 48500; // Max value for the HandShake Health condition in milliseconds
const DEFAULT_INTERVAL = 8000; // Default handshake interval value is ms
const INTERVAL_INCREASE = 1450; // Increase interval after the handshake is failed in ms
var g_interval = DEFAULT_INTERVAL;
var g_inProcess = false;

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

export async function onPerformHandShakeInterval(onSuccessAction, onErrorAction)
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
                    
                console.log(`[INF] HandShake not sucessfull. Increased handshake interval to ${g_interval} ⛔%j. \nCalling onErrorActon delegate.`, error);
                (onErrorAction ?? (() => {}))();
                setDevelopmentMessages();
            });
        }
    } catch (e) {
        console.log(e)
        (onErrorAction ?? (() => {}))();
    } finally {
        g_inProcess = false;
    }
}

function changeSearchBoxVisibility(shouldShow) 
{
    let searchBox = document.getElementById("terminal-container");
    if (searchBox) {
        searchBox.style.display = shouldShow ? "block" : "none";
    }
}

export async function onSiteLoadIfAuthorized(skipLibraryFetch, onSuccess = () => {})
{
    if ( window.isAuthorized !== true 
        && anyPathSpecified(window.location.href)
    ) {
        createInfoMessage('Library fetch skipped.');
        skipLibraryFetch = true;
    }
    if (
        urls.isHomePage() || skipLibraryFetch === true
    ) {
        const nextActionInPipeLine = addElementsForAuthorizedUser;
        
        if (skipLibraryFetch === true) {
            console.log('[INF] chain 2 handshake requests if one was not successful')
            onPerformHandShakeInterval( async () => { 
                FetchPublicHandShake(
                    () => { 
                        onSuccess();
                        changeSearchBoxVisibility(true);
                    },
                    () => { Unauthorized(); changeSearchBoxVisibility(false); }
                ); 
            }, Unauthorized );
        }
        else {
            console.log('[INF] Pass catch error delegate if handshake not successfull, and library not');
            onPerformHandShakeInterval( async () => { 
                FetchGetPartialListenedPage(
                    () => {
                        nextActionInPipeLine();
                        onSuccess();
                        changeSearchBoxVisibility(true);
                    },
                    () => { Unauthorized(); changeSearchBoxVisibility(false); }
                )
            }, Unauthorized );
        }
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