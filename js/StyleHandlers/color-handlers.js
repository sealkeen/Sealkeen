import urls from './../api.js'

// color-handlers.js
function setGradientEarlyMidnightBackground() { $('.body')[0].className = ('body gradient-early-midnight'); console.log('body gradient-early-midnight'); }
function setGradientMediumMidnightBackground() { $('.body')[0].className = ('body gradient- midnight'); console.log('body gradient-medium-midnight'); }
function setGradientLateMidnightBackground() { $('.body')[0].className = ('body gradient- midnight'); console.log('body gradient-late-midnight'); }
function setGradientEarlyMorningBackground() { $('.body')[0].className = ('body gradient- midnight'); console.log('body gradient-early-morning'); }
function setGradientLateMorningBackground() { $('.body')[0].className = ('body gradient-late-morning'); console.log('body gradient-late-morning'); }
function setGradientDaylightBackground() { $('.body')[0].className = ('body gradient-daylight'); console.log('body gradient-daylight'); }
function setGradientEarlyAfternoonBackground() { $('.body')[0].className = ('body gradient-early-afternoon'); console.log('body gradient-early-afternoon'); }
function setGradientLateAfternoonBackground() { $('.body')[0].className = ('body gradient-late-afternoon'); console.log('body gradient-late-afternoon'); }
function setGradientEarlyEveningBackground() { $('.body')[0].className = ('body gradient-early-evening'); console.log('body gradient-early-evening'); }
function setGradientLateEveningBackground() { $('.body')[0].className = ('body gradient-late-evening'); console.log('body gradient-late-evening'); }

export function onClickBodyBackground() {
    const bodyClass = $('.body')[0].className;
    switch (bodyClass) {
        case 'body gradient-early-evening':
            setGradientEarlyMidnightBackground(); break;
        case 'body gradient-early-midnight':
            setGradientLateMorningBackground(); break;
        case 'body gradient-late-morning':
            setGradientDaylightBackground(); break;
        case 'body gradient-daylight':
            setGradientEarlyAfternoonBackground(); break;
        case 'body gradient-early-afternoon':
            setGradientLateAfternoonBackground(); break;
        case 'body gradient-late-afternoon':
            setGradientLateEveningBackground(); break;
        case 'body gradient-late-evening':
            setGradientEarlyEveningBackground(); break;
        default:
        break;
    }
}

export function toggleBodyBackground() {
    const hours = new Date().getHours();
    const welcome = $('#welcome')[0];
    if(welcome == null) return;
    if (hours >= 22 || hours <= 7) {
        setGradientEarlyMidnightBackground();
        welcome.innerHTML = 'Good midnight';
    } else if (hours > 7 && hours < 11) {
        setGradientLateMorningBackground();
        welcome.innerHTML = 'Good morning';
    } else if (hours >= 11 && hours <= 13) {
        setGradientDaylightBackground();
        welcome.innerHTML = 'Good day';
    } else if (hours > 13 && hours < 16) {
        setGradientEarlyAfternoonBackground();
        welcome.innerHTML = 'Good early afternoon';
    } else if (hours >= 16 && hours <= 18) {
        setGradientLateAfternoonBackground();
        welcome.innerHTML = 'Good late afternoon';
    } else if (hours > 18 && hours < 20) {
        setGradientEarlyEveningBackground();
        welcome.innerHTML = 'Good early evening';
    } else if (hours >= 20 && hours < 22) {
        setGradientLateEveningBackground();
        welcome.innerHTML = 'Good late evening';
    }
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
            //document.getElementById("top-page-container").style.height = '100%';
            document.getElementById("top-page-container").style.backgroundRepeat= 'no-repeat';
            document.getElementById("top-page-container").style.backgroundPosition = 'center center';
            //document.getElementById("top-page-container").style.backgroundImage= 'none';
            document.getElementById("top-page-container").style.backgroundSize= '0rem 0rem';
            //document.getElementById("top-page-container").setAttribute("style","background: initial;");
        } finally {
            document.getElementById("top-page-container").style.opacity = 0;
            document.getElementsByClassName("container")[0].style.opacity = 1;
        }
    }
}