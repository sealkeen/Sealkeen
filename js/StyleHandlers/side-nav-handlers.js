
document.querySelector('.closebtn')?.addEventListener('click', closeNav);
document.querySelector('.openNavSpan')?.addEventListener('click', openNav);

document.querySelector('.closeRightNavBtn')?.addEventListener('click', closeRightNav);
document.querySelector('.openRightNavSpan')?.addEventListener('click', openRightNav);

document.querySelector('.left-hover-bar')?.addEventListener('mouseover', openNav);
document.querySelector('.right-hover-bar')?.addEventListener('mouseover', openRightNav);
document.querySelector('.left-hover-bar')?.addEventListener('click', openNav);
document.querySelector('.right-hover-bar')?.addEventListener('click', openRightNav);

export function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("top-page-container").style.marginLeft = "250px";
    document.getElementsByClassName("navbar")[0].style.opacity = 0.6;
    document.getElementsByClassName("container")[0].style.opacity = 0.6;
}
  
export function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("top-page-container").style.marginLeft= "0";
    document.getElementsByClassName("navbar")[0].style.opacity = 1;
    document.getElementsByClassName("container")[0].style.opacity = 1;
}

export function openRightNav(e) {
    document.getElementById("bottomRightNav").style.width = "250px";
    document.getElementById("top-page-container").style.marginRight = "250px";
    document.getElementsByClassName("navbar")[0].style.opacity = 0.6;
    document.getElementsByClassName("container")[0].style.opacity = 0.6;
}
  
export function closeRightNav(e) {
    document.getElementById("bottomRightNav").style.width = "0";
    document.getElementById("top-page-container").style.marginRight= "0";
    document.getElementsByClassName("navbar")[0].style.opacity = 1;
    document.getElementsByClassName("container")[0].style.opacity = 1;
}