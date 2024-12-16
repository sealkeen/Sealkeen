const MIN_LENGTH = 15;

export function addSidenavEventListeners()
{
    try {
        document.querySelector('.closebtn')?.addEventListener('click', closeNav);
        document.querySelector('.openNavSpan')?.addEventListener('click', openNav);
        
        document.querySelector('.closeRightNavBtn')?.addEventListener('click', closeRightNav);
        document.querySelector('.openRightNavSpan')?.addEventListener('click', openRightNav);
        
        document.querySelector('.left-hover-bar')?.addEventListener('mouseover', openNav);
        document.querySelector('.right-hover-bar')?.addEventListener('mouseover', openRightNav);
        document.querySelector('.left-hover-bar')?.addEventListener('click', openNav);
        document.querySelector('.right-hover-bar')?.addEventListener('click', openRightNav);
        document.querySelector('.footer-pause-track-btn')?.addEventListener('click', onPauseClicked);
    } catch (e) {
        console.log(e);
    } 
}

export function addSideNavElements()
{
    try {
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
        if (document.querySelector('.closeRightNavBtn') == null)
            return;
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
    } catch (e) {
        console.log(e);
    } 
}

function getSideNavWidth() {
    return `min(calc(0.5 * (100vw) ${(window.screen.width < window.screen.height) ? '- var(--scrollbar-width)' : '' }) , 50%)`
}

export function openNav() {
    let leftnav = document.getElementById("left-side-nav");
    if (!leftnav) return;
    leftnav.style.width = getSideNavWidth();
    document.getElementsByClassName("navbar")[0].style.opacity = 0.9;
    leftnav.style.paddingLeft = "5px"; 
    leftnav.style.paddingRight = "5px"; 
}
  
export function closeNav() {
    let leftnav = document.getElementById("left-side-nav");
    if (!leftnav) return;
    leftnav.style.width = "0";
    document.getElementsByClassName("navbar")[0].style.opacity = 1;
    leftnav.style.paddingLeft = "0px"; 
    leftnav.style.paddingRight = "0px"; 
}

export function openRightNav(e) {
    let rNav= document.getElementById("right-side-nav");
    if(rNav == null) return;
    rNav.style.width = getSideNavWidth();
    document.querySelector("#vertical-volume-control")?.classList.add('volume-control-absolute');
    document.getElementsByClassName("navbar")[0].style.opacity = 0.9;
    rNav.style.paddingLeft = "5px"; 
    rNav.style.paddingRight = "5px"; 
}
  
export function closeRightNav(e) {
    let rNav= document.getElementById("right-side-nav");
    if(rNav == null) return;

    rNav.style.width = "0";
    document.querySelector("#vertical-volume-control").classList.remove('volume-control-absolute');
    document.getElementsByClassName("navbar")[0].style.opacity = 1;
    rNav.style.paddingLeft = "0px"; 
    rNav.style.paddingRight = "0px"; 
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