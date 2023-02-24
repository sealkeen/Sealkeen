import { onPauseClicked } from "../StyleHandlers/side-nav-handlers.js";

export function initializeKeyboardHook()
{
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            onPauseClicked();
        }
    });
}