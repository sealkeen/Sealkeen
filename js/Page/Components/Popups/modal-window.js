
export function appendPopupButtonHandlers() {
    // select the modal-background
    let modalBackground = document.getElementsByClassName('modal-window')[0];
    // select the close-btn 
    let closeBtn = document.getElementsByClassName('modal-window__close-btn')[0];
    let noBtn = document.getElementsByClassName('modal-window__no-btn')[0];

    // hides the modal when the user clicks close-btn
    const array = [closeBtn, noBtn]
    array.forEach((b) => {
            b.addEventListener('click', function() {
                modalBackground.style.display = 'none';
            })
        }
    );

    // hides the modal when the user clicks outside the modal
    window.addEventListener('click', function(event) {
    // check if the event happened on the modal-background
        if (event.target === modalBackground) {
            // hides the modal
            modalBackground.style.display = 'none';
        }
    });
}

export function appendPopupYesHandler(onYes)
{
    let yesBtn = document.getElementsByClassName('modal-window__yes-btn')[0];
    yesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        onYes(e);
    })
}

export function appendPopupNoHandler(onNo)
{
    let yesBtn = document.getElementsByClassName('modal-window__no-btn')[0];
    yesBtn.addEventListener('click', function(e) {
        //e.preventDefault();
        onNo(e);
    })
}