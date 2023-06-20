import urls from './../api.js'
import LocalizationService from './../Services/Localization/localization-service.js';

const lS = LocalizationService.getInstance();
var loc = await urls.getLocation();

// color-handlers.js
function setGradientEarlyMidnightBackground() { $('.body')[0].className = ('body gradient-early-midnight'); }
function setGradientMediumMidnightBackground() { $('.body')[0].className = ('body gradient-medium-midnight'); }
function setGradientLateMidnightBackground() { $('.body')[0].className = ('body gradient-late-midnight'); }
function setGradientEarlyMorningBackground() { $('.body')[0].className = ('body gradient-early-morning'); }
function setGradientLateMorningBackground() { $('.body')[0].className = ('body gradient-late-morning'); }
function setGradientDaylightBackground() { $('.body')[0].className = ('body gradient-daylight'); }
function setGradientEarlyAfternoonBackground() { $('.body')[0].className = ('body gradient-early-afternoon'); }
function setGradientLateAfternoonBackground() { $('.body')[0].className = ('body gradient-late-afternoon'); }
function setGradientEarlyEveningBackground() { $('.body')[0].className = ('body gradient-early-evening'); }
function setGradientLateEveningBackground() { $('.body')[0].className = ('body gradient-late-evening'); }

export function onClickBodyBackground() {
  
    const bodyClass = $('.body')[0].className;
    switch (bodyClass) {
        case 'body gradient-late-evening':
            setGradientEarlyMidnightBackground(); break;
        case 'body gradient-early-midnight':
            setGradientMediumMidnightBackground(); break;
        case 'body gradient-medium-midnight':
            setGradientLateMidnightBackground(); break;
        case 'body gradient-late-midnight':
            setGradientEarlyMorningBackground(); break;
        case 'body gradient-early-morning':
            setGradientLateMorningBackground(); break;
        case 'body gradient-late-morning':
            setGradientDaylightBackground(); break;
        case 'body gradient-daylight':
            setGradientEarlyAfternoonBackground(); break;
        case 'body gradient-early-afternoon':
            setGradientLateAfternoonBackground(); break;
        case 'body gradient-late-afternoon':
            setGradientEarlyEveningBackground(); break;
        case 'body gradient-early-evening':
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
            let hostRoot =  urls.isGithub() ? `../${urls.getPostfix()}` : `${loc}`;
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