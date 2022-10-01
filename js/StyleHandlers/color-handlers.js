import urls from './../api.js'

export function onClickBodyBackground()
{
    if ($('.body')[0].className === 'body early-evening') {
        $('.body')[0].className = ('body midnight'); //$('body').css('background-color', 'white');
    } else if ($('.body')[0].className ==='body midnight') {
        $('.body')[0].className = ('body gradient-light-blue');
    } else if ($('.body')[0].className ==='body gradient-light-blue') {
        $('.body')[0].className = ('body gradient-daylight'); //$('body').css('background-color', 'grey');
    } else if ($('.body')[0].className ==='body gradient-daylight') {
        $('.body')[0].className = ('body early-evening');
    }
}

export function toggleBodyBackground()
{
    let hours = (new Date().getHours())
    let welcome = $('#welcome')[0];
    if (hours >= 22 || hours <= 7) {
        $('.body')[0].className = ('body midnight'); //$('body').css('background-color', 'white');
        $('#welcome')[0] == null ? noOp() : $('#welcome')[0].innerHTML = 'Good midnight';
    } else if (hours > 7 && hours < 11) {
        $('.body')[0].className = ('body gradient-light-blue');
        $('#welcome')[0] == null ? noOp() : $('#welcome')[0].innerHTML = 'Good morning';
    } else if (hours >= 11 && hours <= 16) {
        $('.body')[0].className = ('body gradient-daylight'); //$('body').css('background-color', 'grey');
        $('#welcome')[0] == null ? noOp() : $('#welcome')[0].innerHTML = 'Good day';
    } else if (hours > 16 && hours < 22) {
        $('.body')[0].className = ('body early-evening');
        $('#welcome')[0] == null ? noOp() : $('#welcome')[0].innerHTML = 'Good evening';
    }
}

function noOp() { console.log('no-op')}

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