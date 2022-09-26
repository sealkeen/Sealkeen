import urls from './../api.js'

export default { 
    toggleBodyBackground()
    {
        if ($('body').hasClass('white')) {
            $('body').toggleClass('white');
            //$('body').css('background-color', 'white');
        } else {
            $('body').toggleClass('white');
            //$('body').css('background-color', 'grey');
        }
    }
}

export function toggleBodyBackground()
{
    if ($('body').hasClass('white')) {
        $('body').toggleClass('white');
        //$('body').css('background-color', 'white');
    } else {
        $('body').toggleClass('white');
        //$('body').css('background-color', 'grey');
    }
}

export function toggleTopPageBackground(on)
{
    if (on)
    {   
        try {
            //document.getElementById("top-page-container").style.height = '50%';
            document.getElementById("top-page-container").style.backgroundRepeat= 'no-repeat';
            document.getElementById("top-page-container").style.backgroundPosition = 'center top';
            //document.getElementById("top-page-container").style.backgroundSize= '70% 70%';
            document.getElementById("top-page-container").style.backgroundImage = `url(../${urls.getPostfix()}Images/WebPack/loading-transparent.gif)`;
        } finally {
            document.getElementsByClassName("container")[0].style.opacity = 0;
        }
    } else {
        try {
            //document.getElementById("top-page-container").style.height = '100%';
            document.getElementById("top-page-container").style.backgroundRepeat= 'no-repeat';
            document.getElementById("top-page-container").style.backgroundPosition = 'center center';
            document.getElementById("top-page-container").style.backgroundImage= 'none';
            //document.getElementById("top-page-container").style.backgroundSize= '100% 100%';
            //document.getElementById("top-page-container").setAttribute("style","background: initial;");
        } finally {
            document.getElementsByClassName("container")[0].style.opacity = 1;
        }
    }
}