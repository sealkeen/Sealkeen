export function transitionEnd()
{
    try {
        $('.container').css({"padding-bottom":$('.footer').height() + 'px' });
        onTransitionEnd();
    } catch (e) {
        console.error('transitionEnd: ' + e);
    }
}

export function onTransitionEnd()
{
    let horScrollBar = document.getElementById('horizontal-volume-control');
    let footer = document.getElementById('player-audio-div');
    if(horScrollBar != null && footer != null)
        horScrollBar.style.marginBottom = footer.clientHeight - 5 + 'px';
}