const MIN_LENGTH = 15;
document.querySelector('.closebtn')?.addEventListener('click', closeNav);
document.querySelector('.openNavSpan')?.addEventListener('click', openNav);

document.querySelector('.closeRightNavBtn')?.addEventListener('click', closeRightNav);
document.querySelector('.openRightNavSpan')?.addEventListener('click', openRightNav);

document.querySelector('.left-hover-bar')?.addEventListener('mouseover', openNav);
document.querySelector('.right-hover-bar')?.addEventListener('mouseover', openRightNav);
document.querySelector('.left-hover-bar')?.addEventListener('click', openNav);
document.querySelector('.right-hover-bar')?.addEventListener('click', openRightNav);
document.querySelector('.footer-pause-track-btn')?.addEventListener('click', onPauseClicked);

export function addSideNavElements()
{
    let leftCircle = document.createElement('div');
    leftCircle.className = 'circle left-circle';
    let rightCircle = document.createElement('div')
    rightCircle.className = 'circle right-circle';
    let leftLine = document.createElement('div');
    leftLine.className = 'line left-line'
    let rightLine = document.createElement('div');
    rightLine.className = 'line right-line'
    leftCircle.appendChild(leftLine)
    rightCircle.appendChild(rightLine)
    document.querySelector('.closeRightNavBtn').after(rightCircle)
    document.querySelector('.closebtn').after(leftCircle)
    
    document.querySelectorAll('.circle').forEach(element => {
        element.addEventListener('click', (e) => { 
            onPauseClicked(e); 
        });
        element.addEventListener('mousedown', (e) => { 
            $('.right-circle').toggleClass('circle-active'); $('.left-circle').toggleClass('circle-active');
        });
        element.addEventListener('touchstart', (e) => { 
            $('.right-circle').toggleClass('circle-active'); $('.left-circle').toggleClass('circle-active');
        });
        element.addEventListener('mouseup', (e) => { 
            setTimeout( () => { $('.right-circle').removeClass('circle-active'); $('.left-circle').removeClass('circle-active')}, 50);
        });
    });
}

function getSideNavWidth() {
    return `min(calc(0.5 * (100vw) ${(window.screen.width < window.screen.height) ? '- var(--scrollbar-width)' : '' }) , 50%)`
}

export function openNav() {
    document.getElementById("mySidenav").style.width = getSideNavWidth();
    //window.addEventListener('resizeend', () => { document.getElementById("mySidenav").style.width = $('body').width() / 2; } )
    //document.getElementById("top-page-container").style.marginLeft = "250px";
    document.getElementsByClassName("navbar")[0].style.opacity = 0.9;
    //document.getElementsByClassName("container")[0].style.opacity = 0.8;
    document.getElementById("mySidenav").style.paddingLeft = "5px"; 
    document.getElementById("mySidenav").style.paddingRight = "5px"; 
}
  
export function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("top-page-container").style.marginLeft= "0";
    document.getElementsByClassName("navbar")[0].style.opacity = 1;
    //document.getElementsByClassName("container")[0].style.opacity = 1;
    document.getElementById("mySidenav").style.paddingLeft = "0px"; 
    document.getElementById("mySidenav").style.paddingRight = "0px"; 
}

export function openRightNav(e) {
    document.getElementById("bottomRightNav").style.width = getSideNavWidth();
    //window.addEventListener('resizeend', () => { document.getElementById("bottomRightNav").style.width = $('body').width() / 2; } )
    //document.getElementById("top-page-container").style.marginRight = "250px";
    document.querySelector("#volume-control").classList.add('volume-control-absolute');
    document.getElementsByClassName("navbar")[0].style.opacity = 0.9;
    //document.getElementsByClassName("container")[0].style.opacity = 0.8;
    document.getElementById("bottomRightNav").style.paddingLeft = "5px"; 
    document.getElementById("bottomRightNav").style.paddingRight = "5px"; 
}
  
export function closeRightNav(e) {
    document.getElementById("bottomRightNav").style.width = "0";
    //document.getElementById("top-page-container").style.marginRight= "0";
    document.querySelector("#volume-control").classList.remove('volume-control-absolute');
    document.getElementsByClassName("navbar")[0].style.opacity = 1;
    //document.getElementsByClassName("container")[0].style.opacity = 1;
    document.getElementById("bottomRightNav").style.paddingLeft = "0px"; 
    document.getElementById("bottomRightNav").style.paddingRight = "0px"; 
}

export function onPauseClicked(e)
{    
    var audio = document.querySelector("audio");
    let sourse = document.querySelector('#player-source-element');
    if (audio.paused || audio.currentTime == 0 || audio.currentTime==audio.duration) {
        //audio paused,ended or not started
        if(sourse.src != null && sourse.src.length > MIN_LENGTH ) {
            document.querySelector('.footer-pause-track-btn').innerHTML = "Pause";
            audio.play();
        }
    } else {
        //audio is playing
        audio.pause();
        document.querySelector('.footer-pause-track-btn').innerHTML = "Play";
    }
}