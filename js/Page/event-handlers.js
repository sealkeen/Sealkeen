import { isEmpty } from './../utilities.js'

export function setTitleByArtistAndTitle(el) {
    try {
        let artist = el;
        let song = el;
        let songInfo = el;
        if (!event.target.classList.contains('card-body')) {
            songInfo = el.parentNode;
        }

        artist = songInfo.querySelector('.card-title')?.firstChild?.nodeValue;
        song = songInfo.querySelector('.card-text')?.firstChild?.nodeValue;

        if (!isEmpty(artist) && !isEmpty(song))
            document.title = `${artist} – ${song}`;
    } catch (e) {
        console.log(e);
    } 
}