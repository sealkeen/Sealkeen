export function useTapCircle() {
    document.addEventListener('click', function(event) {
        const circle = document.createElement('div');
        circle.classList.add('tap-circle');
        circle.style.left = event.pageX + 'px';
        circle.style.top = event.pageY + 'px';
        document.body.appendChild(circle);
        setTimeout(() => {
            circle.classList.add('tap-circle__faded');
        }, 100);
        setTimeout(() => {
            circle.remove();
        }, 2000);
    });
}