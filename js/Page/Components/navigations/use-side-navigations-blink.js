let leftSideNav = null;
let rightSideNav = null;

export function useSideNavigationsBlink() {
    leftSideNav = document.getElementById('left-side-nav');
    rightSideNav = document.getElementById('right-side-nav');
    function applyStyles() {
        if (leftSideNav) {
            leftSideNav.style.zIndex = "-1";
            leftSideNav.style.opacity = "80%";
        }
        if (rightSideNav) {
            rightSideNav.style.zIndex = "-1";
            rightSideNav.style.opacity = "80%";
        }
    }
    function removeStyles() {
        if (leftSideNav) {
            leftSideNav.style.zIndex = "";
            leftSideNav.style.opacity = "";
        }
        if (rightSideNav) {
            rightSideNav.style.zIndex = "";
            rightSideNav.style.opacity = "";
        }
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Control') {
            applyStyles();
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.key === 'Control') {
            removeStyles();
        }
    });
}