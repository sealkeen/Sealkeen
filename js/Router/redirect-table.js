import Exception from "../Extensions/cs-exception.js";
import { appendPopupButtonHandlers, appendPopupYesHandler } from "../Page/Components/Popups/modal-window.js";
import { serviceProvider } from "../Services/di-container.js";

const redirects = {
    404: () => { },
    "": () => { },
    "/": () => { },
    "about.me": (e) => { onClickGotoAboutMe(e) },
    "login": async () => { console.error('login') },
    "register": async () => { console.error('register') },
    "logout": async () => { console.error('logout') }
};

function dropExisting()
{
    let modalContainer = document.getElementsByClassName('modal-window')[0];
    if (modalContainer != null) 
        modalContainer.remove()
}

function recreate(text, buttons)
{
    dropExisting();
    document.getElementsByTagName('body')[0].insertAdjacentHTML("afterbegin",
    `
    <!-- Modal Background and Modal -->
    <div class="modal-window">
    <div class="modal-window__background">
        <span class="modal-window__close-btn">&times;</span>
        <p class="modal-window__paragraph">${text}</p>
        <div class="modal-window__buttons">
            <button class="modal-window__button modal-window__yes-btn">
                ${buttons[0]}
            </button>
            <button class="modal-window__button modal-window__no-btn">
                ${buttons[1]}
            </button>
        </div>
    </div>
    </div>
    `);
}

export function onClickGotoAboutMe(e)
{
    window.history.pushState(null, null, '/about');

    let router = serviceProvider.resolve('nativeRouter');
    let routeActions = router.routes;
    
    if (routeActions)
        routeActions['/about']();
    else
        Exception.Throw('Error when executing about action route.'); 

    //setAboutHtmlPage();
    return; // about.me blocked in Russia
    recreate("Go to about.me/sealkeen?", ['YES','NO']);

    const modalBackground = document.getElementsByClassName('modal-window')[0];
    (modalBackground ?? { style : {display : '' }}) .style.display = 'block';
    appendPopupButtonHandlers();
    appendPopupYesHandler(() => { console.log('[INF] Going to about.me/sealkeen...'); window.location = "https://about.me/sealkeen"; })
}

export function showPopup(event_handler, text, buttons) {
    recreate(text, buttons);
    
    const modalBackground = document.getElementsByClassName('modal-window')[0];
    (modalBackground ?? { style : {display : '' }}) .style.display = 'block';
    appendPopupButtonHandlers();
    let delegate = redirects[event_handler];
    console.warn("Handler = %j", delegate);
    if(delegate == null) Exception.Throw(`redirects[${event_handler}] is NULL`)

    appendPopupYesHandler(() => { delegate() })
}

export default redirects;