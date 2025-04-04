import { serviceProvider } from "../Services/di-container.js";

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

function useOpacityTransitions() {
    setTimeout(() => {
        document.querySelectorAll('.lbl-srv-status').forEach(el => {
            el.classList.add('invisibly-hidden');
        });
    }, 2000);
}

serviceProvider?.register('opacityTransitions', function() { return { activate: useOpacityTransitions } }, []);
serviceProvider?.resolve('opacityTransitions').activate()