export function transitionEnd()
{
    try {
        $('.container').css({"padding-bottom":$('.footer').height() + 'px' })
        document.getElementById('horizontal-volume-control').style.marginBottom = 
            document.getElementById('player-audio-div').clientHeight - 5 + 'px';
    } catch (e) {
        console.error('transitionEnd: ' + e);
    }
}