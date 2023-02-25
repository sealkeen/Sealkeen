import { onPauseClicked } from "../StyleHandlers/side-nav-handlers.js";

export function initializeKeyboardHook()
{
	document.addEventListener("keydown", (event) => {
  		const focusedElement = document.activeElement;
  		const isInputFocused =
    		focusedElement.tagName === "INPUT" || focusedElement.tagName === "TEXTAREA";
  		if (event.code === "Space" && !isInputFocused) {
    		onPauseClicked();
  		}
	});
}