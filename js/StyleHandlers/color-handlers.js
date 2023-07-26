import { sleep } from './../utilities.js';
import urls from './../api.js'
import LocalizationService from './../Services/Localization/localization-service.js';

const lS = LocalizationService.getInstance();

// color-handlers.js 
function setGradientEarlyMidnightBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-early-midnight'); console.log('background-image-div gradient-early-midnight'); }
function setGradientMediumMidnightBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-medium-midnight'); console.log('background-image-div gradient-medium-midnight'); }
function setGradientLateMidnightBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-late-midnight'); console.log('background-image-div gradient-late-midnight'); }
function setGradientEarlyMorningBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-early-morning'); console.log('background-image-div gradient-early-morning'); }
function setGradientLateMorningBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-late-morning'); console.log('background-image-div gradient-late-morning'); }
function setGradientDaylightBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-daylight'); console.log('background-image-div gradient-daylight'); }
function setGradientEarlyAfternoonBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-early-afternoon'); console.log('background-image-div gradient-early-afternoon'); }
function setGradientLateAfternoonBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-late-afternoon'); console.log('background-image-div gradient-late-afternoon'); }
function setGradientEarlyEveningBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-early-evening'); console.log('background-image-div gradient-early-evening'); }
function setGradientLateEveningBackground() { $('.background-image-div')[0].className = ('background-image-div gradient-late-evening'); console.log('background-image-div gradient-late-evening'); }

export async function setBackgroundOpacityInterval()
{
    //console.log('[INF] Get elements ("background-image-div")')
    let elts = document.getElementsByClassName('background-image-div');
    if(elts != null && elts[0] != null)
    {
        console.log('[INF] Transform-Increase opacity ...')
        elts[0].style.opacity = 1
    } 
}

function customSleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

export function onClickBodyBackground() {
  
    const bodyClass = $('.background-image-div')[0].className;
    switch (bodyClass) {
        case 'background-image-div gradient-late-evening':
            setGradientEarlyMidnightBackground(); break;
        case 'background-image-div gradient-early-midnight':
            setGradientMediumMidnightBackground(); break;
        case 'background-image-div gradient-medium-midnight':
            setGradientLateMidnightBackground(); break;
        case 'background-image-div gradient-late-midnight':
            setGradientEarlyMorningBackground(); break;
        case 'background-image-div gradient-early-morning':
            setGradientLateMorningBackground(); break;
        case 'background-image-div gradient-late-morning':
            setGradientDaylightBackground(); break;
        case 'background-image-div gradient-daylight':
            setGradientEarlyAfternoonBackground(); break;
        case 'background-image-div gradient-early-afternoon':
            setGradientLateAfternoonBackground(); break;
        case 'background-image-div gradient-late-afternoon':
            setGradientEarlyEveningBackground(); break;
        case 'background-image-div gradient-early-evening':
            setGradientLateEveningBackground(); break;
        default:
        break;
    }
}

export function toggleBodyBackground() {
    window.toggleBodyBackground = toggleBodyBackground;
    
    const hours = new Date().getHours();
    let greetingKey = '';
    if (hours >= 22 || hours <= 7) {
        setGradientEarlyMidnightBackground();
        greetingKey = 'greeting_midnight';
    } else if (hours > 7 && hours < 11) {
        setGradientLateMorningBackground();
        greetingKey = 'greeting_morning';
    } else if (hours >= 11 && hours <= 13) {
        setGradientDaylightBackground();
        greetingKey = 'greeting_day';
    } else if (hours > 13 && hours < 16) {
        setGradientEarlyAfternoonBackground();
        greetingKey = 'greeting_early_afternoon';
    } else if (hours >= 16 && hours <= 18) {
        setGradientLateAfternoonBackground();
        greetingKey = 'greeting_late_afternoon';
    } else if (hours > 18 && hours < 20) {
        setGradientEarlyEveningBackground();
        greetingKey = 'greeting_early_evening';
    } else if (hours >= 20 && hours < 22) {
        setGradientLateEveningBackground();
        greetingKey = 'greeting_late_evening';
    }
    
    window.translateGreetings(greetingKey);
}

function noOp() { console.log('no-op') }

export function toggleTopPageBackground(on)
{
    if (on)
    {   
        try {
            document.getElementById("top-page-container").style.opacity = 1;
            document.getElementById("top-page-container").style.backgroundRepeat= 'no-repeat';
            document.getElementById("top-page-container").style.backgroundPosition = 'center top';
            document.getElementById("top-page-container").style.backgroundSize= '50rem 38rem';
            let hostRoot =  urls.isGithub() ? `../${urls.getPostfix()}` : `${urls.getLocation()}`;
            hostRoot = urls.isNodeJSHost() ? urls.getHostRootPath() : hostRoot;

            document.getElementById("top-page-container").style.backgroundImage = `url(${hostRoot}Images/WebPack/loading-transparent.gif)`;
        } finally {
            document.getElementsByClassName("container")[0].style.opacity = 0;
        }
    } else {
        try {
            document.getElementById("top-page-container").style.backgroundRepeat= 'no-repeat';
            document.getElementById("top-page-container").style.backgroundPosition = 'center center';
            document.getElementById("top-page-container").style.backgroundSize= '0rem 0rem';
        } finally {
            document.getElementById("top-page-container").style.opacity = 0;
            document.getElementsByClassName("container")[0].style.opacity = 1;
        }
    }
}