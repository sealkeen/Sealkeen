export function addEventOnWindowResize() {
    document.querySelector('.spacer').style.height = $('.navbar').height() * 1.5 + 'px';
    window.addEventListener('resize', function(event) {
        console.log('size changed:' + $('.navbar').height() + 'px');  
        document.querySelector('.spacer').style.height = $('.navbar').height() * 1.5 + 'px';
    }, true);
}