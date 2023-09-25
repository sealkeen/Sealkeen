
export function appendPopup(onYes) {
    // select the modal-background
    let modalBackground = document.getElementById('modal-window-background');
    // select the close-btn 
    let closeBtn = document.getElementById('modal-window-close-btn');
    let noBtn = document.getElementById('modal-window-no-btn');
    let yesBtn = document.getElementById('modal-window-yes-btn')

    // hides the modal when the user clicks close-btn
    const array = [closeBtn, noBtn]
    array.forEach((b) => {
            b.addEventListener('click', function() {
                modalBackground.style.display = 'none';
            })
        }
    );

    yesBtn.addEventListener('click', function() {
        onYes();
    })

    // hides the modal when the user clicks outside the modal
    window.addEventListener('click', function(event) {
    // check if the event happened on the modal-background
        if (event.target === modalBackground) {
            // hides the modal
            modalBackground.style.display = 'none';
        }
    });
}