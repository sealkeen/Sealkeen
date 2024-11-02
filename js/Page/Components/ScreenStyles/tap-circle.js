export function useTapCircle() {
    if (window.isMobileOrTablet === true) {
        document.addEventListener('touchend', function(e) {
            addCircle(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        });
    } else {
        document.addEventListener('click', function(event) {
            addCircle(event.pageX, event.pageY);
        });
    }
}

function addCircle(x, y) {
    const circle = document.createElement('div');
    circle.classList.add('tap-circle');
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    document.body.appendChild(circle);
    setTimeout(() => {
        circle.classList.add('tap-circle__faded');
    }, 100);
    setTimeout(() => {
        circle.remove();
    }, 2000);
}