import { appendPopup } from "../Page/Components/Popups/modal-window.js";

export function addRedirectEventListener()
{
    if(document.getElementById('modal-window-background') == null) {
        document.getElementsByTagName('body')[0].insertAdjacentHTML("afterbegin",
        `
        <!-- Modal Background and Modal -->
        <div id="modal-window-background">
        <div id="modal-window">
            <span id="modal-window-close-btn">&times;</span>
            <p class="modal-window-paragraph">Redirect to about.me/sealkeen?</p>
            <div class="buttons">
            <button id="modal-window-yes-btn" class="modal-window-yes-btn popup-btn">
                YES
            </button>
            <button id="modal-window-no-btn" class="modal-window-no-btn popup-btn">
                NO
            </button>
            </div>
        </div>
        </div>
        `);
    }

    // shows the modal when the user clicks open-btn
    document.querySelector('.nav-lnk-about')?.addEventListener('click', function(e) {
        onClickGotoAboutMe(e);
    });  
}

export function onClickGotoAboutMe(e)
{
    e.preventDefault();
    const modalBackground = document.getElementById('modal-window-background');
    (modalBackground ?? { style : {display : '' }}) .style.display = 'block';

    appendPopup(() => { console.log('[INF] Going to about.me/sealkeen...'); window.location = "https://about.me/sealkeen"; });
}