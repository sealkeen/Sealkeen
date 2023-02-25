import { isEmpty, GetCurrentCompositionsId } from './../utilities.js'
import urls from './../api.js'
import MusicApi from './../Page/url-decoding.js'

const loc = urls.getLocation();

export function setTitleByArtistAndTitle(el) {
    try {
        let artist = el; let song = el; let songInfo = el;
        if (!el.target.classList.contains('card-body')) {
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
    try {
        let compId = GetCurrentCompositionsId();
        let ctrl = (loc + 'GetArtistSongName/?id=' + compId);
        
        if ($(".track-artist-song-name") != undefined) {
            $.ajax({ //$.get({ //
                url: ctrl, type: 'GET', contentType: 'html',
                xhrFields: { withCredentials: true },
                crossDomain: true,
                /*data: ("_ViewPlayer=" + source),*/
                success: function (response) {
                    // console.log('setArtistSongNameAsync: Ajax returned key count: ' + response);
                    console.log('setArtistSongNameAsync: Ajax returned key count: ' + Object.keys(response).length);
                    const artistSong = response.trim(); // remove leading/trailing whitespaces
                    const artistSongHtml = createArtistLink(artistSong);
                    $(".track-artist-song-name").html('');
                    $(".track-artist-song-name").append(`<div class="track-artist-song-name">${artistSongHtml}</div>`);
                    document.title = artistSong;
                },
                error: function (error_) {
                    console.log("Ajax error: " + error_);
                }
            });
        }
    } catch (err) {
        console.log('setArtistSongNameAsync error.')
    }
}

export function createArtistLink(artistSong) {
    const [artist, track] = artistSong.split(' – '); // assuming "–" is the separator
    if (!artist || !track) {
        return artistSong;
    }
    const params = new URLSearchParams(window.location.search);
    const artistParam = params.get("artist");
    const artistUrl = artistParam ? window.location.href : `${window.location.href}?artist=${encodeURIComponent(artist)}`;

    let api = new MusicApi();

    const artistLink = `<a href="${artistUrl}">${artist}</a>`;
    return `${artistLink} – ${track}`;
}

export function fireOnInputValueChange(element)
{
    var event = new Event('change');
    // Dispatch it.
    element.dispatchEvent(event);
}