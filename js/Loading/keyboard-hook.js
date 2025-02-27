import { onPauseClicked } from "../Page/Components/navigations/side-nav-handlers.js";

export function initializeKeyboardHook()
{
	document.addEventListener("keydown", (event) => {
  		const focusedElement = document.activeElement;
  		const isInputFocused =
    		focusedElement.tagName === "INPUT" || focusedElement.tagName === "TEXTAREA";
  		if (event.code === "Space" && !isInputFocused) {
			event.preventDefault();
    		onPauseClicked();
  		}
	});
}