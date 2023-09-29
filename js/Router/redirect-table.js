import Exception from "../Extensions/cs-exception.js";
import { appendPopupButtonHandlers, appendPopupYesHandler } from "../Page/Components/Popups/modal-window.js";

const redirects = {
    404: () => { },
    "": () => { },
    "/": () => { }, // "/pages/index.html"
    "about.me": (e) => { onClickGotoAboutMe(e) }, 
    "login": async () => { console.error('login') },
    "register": async () => { console.error('register') },
    "logout": async () => { console.error('logout') }
};

function dropExisting()
{
    let modalContainer = document.getElementById('modal-window-background')
    if (modalContainer != null) 
        modalContainer.remove()
}

function recreate(text, buttons)
{
    dropExisting();
    document.getElementsByTagName('body')[0].insertAdjacentHTML("afterbegin",
    `
    <!-- Modal Background and Modal -->
    <div id="modal-window-background">
    <div id="modal-window" class ="modal-window-popup">
        <span id="modal-window-close-btn">&times;</span>
        <p class="modal-window-paragraph">${text}</p>
        <div class="buttons">
        <button id="modal-window-yes-btn" class="modal-window-yes-btn popup-btn">
            ${buttons[0]}
        </button>
        <button id="modal-window-no-btn" class="modal-window-no-btn popup-btn">
            ${buttons[1]}
        </button>
        </div>
    </div>
    </div>
    `);
}

export function onClickGotoAboutMe(e)
{
    e.preventDefault();
    recreate("Go to about.me/sealkeen?", ['YES','NO']);

    const modalBackground = document.getElementById('modal-window-background');
    (modalBackground ?? { style : {display : '' }}) .style.display = 'block';
    appendPopupButtonHandlers();
    appendPopupYesHandler(() => { console.log('[INF] Going to about.me/sealkeen...'); window.location = "https://about.me/sealkeen"; })
}

export function showPopup(event_handler, text, buttons) {
    recreate(text, buttons);
    
    const modalBackground = document.getElementById('modal-window-background');
    (modalBackground ?? { style : {display : '' }}) .style.display = 'block';
    appendPopupButtonHandlers();
    let delegate = redirects[event_handler];
    console.warn("Handler = %j", delegate);
    if(delegate == null) Exception.Throw(`redirects[${event_handler}] is NULL`)

    appendPopupYesHandler(() => { delegate() })
}

export default redirects;