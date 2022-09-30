import urls from './../api.js'

export function onClickBodyBackground()
{
    let hours = (new Date().getHours())
           if ($('.body')[0].className === 'body evening') {
        $('.body')[0].className = ('body gradient-light-blue'); //$('body').css('background-color', 'white');
    } else if ($('.body')[0].className === 'body gradient-light-blue') {
        $('.body')[0].className = ('body midnight');
    } else if ($('.body')[0].className === 'body midnight') {
        $('.body')[0].className = ('body gradient-blue1');
    } else if ($('.body')[0].className === 'body gradient-blue1') {
        $('.body')[0].className = ('body evening'); //$('body').css('background-color', 'grey');
    }
}

export function toggleBodyBackground()
{
    let hours = (new Date().getHours())
    if (hours >= 22 || hours <= 7) {
        $('.body')[0].className = ('body midnight');; //$('body').css('background-color', 'white');
    } else if (hours > 7 || hours < 11) {
        $('.body')[0].className = ('body gradient-light-blue');
    } else {
        $('.body')[0].className = ('body gradient-blue1'); //$('body').css('background-color', 'grey');
    }
}

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