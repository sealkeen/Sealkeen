import { isEmpty, GetCurrentCompositionsId } from './../utilities.js'
import urls from './../api.js'
import MusicApi from './../Page/url-decoding.js'
import { fetchContentCrossOrigin } from "../Router/shared.js";

const loc = urls.getLocation();

export function setTitleByArtistAndTitle(el) {
    try {
        let artist = el; let song = el; let songInfo = el;
        if(el.target == null) {
            console.log('[Err] NRE setTitleByArtistAndTitle(): %j', el.target );
            return;
        }
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
            $.ajax({
                url: ctrl, type: 'GET', contentType: 'html', xhrFields: { withCredentials: true },
                crossDomain: true,
                success: function (response) {
                    const artistSong = response.trim(); // remove leading/trailing whitespaces
                    const artistSongHtml = createArtistLink(artistSong);
                    $(".track-artist-song-name").html('');
                    $(".track-artist-song-name").append(`<div class="track-artist-song-name">${artistSongHtml}</div>`);
                    document.title = artistSong;
                    preventDefaultOnArtistNameAHref();
                },
                error: function (error_) { console.log("[ERR] event-handlers.js/setArtistSongNameAsync() Ajax error: " + error_); }
            });
        }
    } catch (err) {
        console.log('[ERR] setArtistSongNameAsync error.')
    }
}

export function createArtistLink(artistSong) {
    const [artist, track] = artistSong.split(' – '); // assuming "–" is the separator
    if (!artist || !track) {
        return artistSong;
    }

    replaceArtistParamInUrl(artist);
    
    const artistUrl = `${urls.getLocation()}GetPartialCompositionPageByArtistName?artistName=${encodeURIComponent(artist)}`;

    const artistLink = `<a id="artist-name-hrefable" href="${artistUrl}">${artist}</a>`;
    return `${artistLink} – ${track}`;
}

function replaceArtistParamInUrl(artist) {
    if (!urls.isGithub() && !urls.isNodeJSHost()) {
      return;
    }
  
    const params = new URLSearchParams(window.location.search);
  
    if (!params.has('artist')) {
      // No artist parameter, so add it
      params.append('artist', artist);
    } else {
      // Artist parameter exists, so modify it
      params.set('artist', artist);
    }
  
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, null, newUrl);
  }

export function fireOnInputValueChange(element)
{
    var event = new Event('change');
    // Dispatch it.
    element.dispatchEvent(event);
}

export function preventDefaultOnArtistNameAHref()
{
    // Override the click event of the #artist-name-hrefable link element
    const artistLinkElement = document.getElementById("artist-name-hrefable");
    if (artistLinkElement) {
        artistLinkElement.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent the default behavior of the link
            const artistUrl = artistLinkElement.href;
            fetchContentCrossOrigin(artistUrl);
        });
    }
}