import { isEmpty, GetCurrentCompositionsId } from './../utilities.js'
import urls from './../api.js'
const loc = urls.getLocation();

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

        if (!isEmpty(artist) && !isEmpty(song)) {
            document.title = `${artist} – ${song}`;
            $(".track-artist-song-name").html('');
            $(".track-artist-song-name").append(`${artist} – ${song}`);
        }
    } catch (e) {
        console.log(e);
    } 
}

export function setArtistSongNameAsync() {
    let compId = GetCurrentCompositionsId();
    let ctrl = (loc + 'GetArtistSongName/?id=' + compId);
    
    if ($(".track-artist-song-name") != undefined) {
        $.ajax({ //$.get({ //
            url: ctrl,
            type: 'GET',
            contentType: 'html',
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            /*data: ("_ViewPlayer=" + source),*/
            success: function (response) {
                console.log('setArtistSongNameAsync: Ajax returned key count: ' + Object.keys(response).length);
                $(".track-artist-song-name").html('');
                $(".track-artist-song-name").append(response);
                document.title = (response);
            },
            error: function (error_) {

                console.log("Ajax error: " + error_);
            }
        });
    }
}