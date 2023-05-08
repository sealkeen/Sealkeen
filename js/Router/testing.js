import urls from './../api.js'
import { toggleForId } from '../Utils/ClassQuery.js';
import { getTime_HH_MM_SS_MS } from '../Utils/Chrono/main.js';
import { setDevelopmentMessages } from '../Development/news-data.js';
import { FetchGetPatialListenedPage } from './click-handlers.js';

window.handShakeCondition = false;

const MAX_INTERVAL = 48500; // Max value for the HandShake Health condition in milliseconds
const DEFAULT_INTERVAL = 8000; // Default handshake interval value is ms
const INTERVAL_INCREASE = 1450; // Increase interval after the handshake is failed in ms
var g_interval = DEFAULT_INTERVAL;
const isVisibilityHiddenState = 'hidden';

export async function runBackgroundHandShakes()
{
    setInterval(async function() {
        if(//document.visibilityState !== isVisibilityHiddenState && 
            (urls.isGithub() || window.handShakeCondition)
        ) {
            onPerformHandShakeInterval(noOp);
        }
    }, g_interval);
}

export async function onPerformHandShakeInterval(onSuccessAction)
{
    try {
        //console.log('HandShake at ' + getTime_HH_MM_SS_MS())
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
                console.log(`HandShake error. Increased handshake interval to ${g_interval} ⛔%j`, error);
                setDevelopmentMessages();
            });
        }
    } catch (e) {
        console.log(e)
    } 
}

export async function onSiteLoadIfAuthorized()
{
    let result = "";
    if(window.location.origin + "/" + urls.getPostfix() == window.location.href) // in the homepage
        onPerformHandShakeInterval(FetchGetPatialListenedPage);
    else
        onPerformHandShakeInterval(noOp);
}

export function countCookies()
{
    response.headers.forEach((val, key) => {
        if(key === 'set-cookie'){
            count += val.split("; ").length;
        }
    });
    console.log(count + " cookies found");
}

async function noOp() {}