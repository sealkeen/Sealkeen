import { setArtistSongNameAsync, setTitleByArtistAndTitle } from './Page/event-handlers.js'
import { newQueue, _trackQueue, peekObjectsArtistsAndTitles } from './Utils/Queue.js';
import urls from './api.js'

const loc = urls.getLocation();

export function isEmpty (val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

export function containsClasses (node, ...classes) {
    return classes.some(cls => node?.classList?.contains(cls));
}

export function getIdFromElementData(el) {
    let id = el.target;
    //console.log('%j', el);
    //console.log('%j', el.target);
    if (!event.target.classList.contains('card-body')) {
        console.log('contains card-body. el.children[0].value');
        console.log('%j', el.target.parentNode);//.querySelector('data'));
        console.log('%j', el.target.parentNode.querySelector('data').value);
        id = el.target.parentNode.querySelector('data').value;
        console.log('not contains card-body. el.currentTarget.parentNode.children[0].value');
    }
    else {
        console.log('contains card-body. el.children[0].value');
        console.log('%j', el.target.querySelector('data'));
        console.log('%j', el.target.querySelector('data').value);
        id = el.target.querySelector('data').value;
        //id = el.target.children[0].value;
    }
    return id;
}

export function getWebEntityObject(el) {
    let id = el.target;
    let artist = el.target;
    let title = el.target;
    //console.log('%j', el);
    //console.log('%j', el.target);
    if (!event.target.classList.contains('card-body')) {
        console.log('contains card-body. el.children[0].value');
        console.log('%j', el.target.parentNode);//.querySelector('data'));
        console.log('%j', el.target.parentNode.querySelector('data').value);
        id = el.target.parentNode.querySelector('data').value;
        artist = el.target.parentNode.querySelector('.card-title').innerHTML;
        title = el.target.parentNode.querySelector('.card-text').innerHTML;
        console.log('not contains card-body. el.currentTarget.parentNode.children[0].value');
    }
    else {
        console.log('contains card-body. el.children[0].value');
        console.log('%j', el.target.querySelector('data'));
        console.log('%j', el.target.querySelector('data').value);
        id = el.target.querySelector('data').value;
        artist = el.target.querySelector('.card-title').innerHTML;
        title = el.target.querySelector('.card-text').innerHTML;
        //id = el.target.children[0].value;
    }
    return { id, artist, title };
}

export function displayQueuedTracks(_trackQueue) {
    console.log('displayQueuedTracks %j', _trackQueue);
    let queue = $('#footer-track-query')[0];
    if (queue === undefined) {
        queue = document.createElement("div");
        queue.id = "footer-track-query";
        queue.className = "footer-track-query";
        queue.innerHTML = peekObjectsArtistsAndTitles();
        let footer = $('.footer');
        footer[0].insertBefore(queue, footer[0].firstChild);
    } else {
        queue.innerHTML = peekObjectsArtistsAndTitles();
    }
}

export function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function safePlay()
{
    console.log('safePlay()')
    try {
        var playPromise = document.querySelector("#player-audio-element")?.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                // We can now safely pause video...
                console.log('safePlay ok()');
            })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                (async () => { await sleep(500); safePlay()})();
                console.log('safePlay err: player returned error on play, autoplay prevented.');
            });
        }
    } catch(error) {
        console.log('safePlay err: Player returned exception on try load or play %j', error);
    }
}

export function safeSwitchTrack()
{
    console.log('safeSwitchTrack()')
    displayQueuedTracks();
    try {
        var playPromise = document.querySelector("#player-audio-element")?.load();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log('safeLoadOK: safePlaying...');

                (async () => { await sleep(500); safePlay()})();
            })  
            .catch(error => {
                // Auto-play was prevented
                (async () => { await sleep(500); safePlay()})();
                console.log('safeSwitchTrack() err: player returned error on LOAD, autoplay prevented.');
            });
        }
    } catch(error) {
        console.log('safeSwitchTrack() err: Player returned exception on try LOAD or PLAY %j', error);
    }
}

export function GetCurrentCompositionsId() { 
    try {
        let audioSrc = $("#player-audio-element").get(0).children[0];
        if (audioSrc.src == null)
            return '';
        else 
            audioSrc = audioSrc.src;

        if(audioSrc.includes('/GetAudio?Id='))
            audioSrc = audioSrc.substring(audioSrc.indexOf('/GetAudio?Id=') + '/GetAudio?Id='.length);
        // if(audioSrc.includes(location.host) && audioSrc.includes(location.protocol)){
        //     audioSrc = audioSrc.replace(`${location.protocol}//${location.host}`, '');
        //     audioSrc = audioSrc.replace('/', '');
        // }
        if(audioSrc.includes(':'))
            audioSrc = audioSrc.substring(audioSrc.indexOf(':'));
        console.log('GetCurrentCompId = ' + audioSrc);
        return audioSrc;
    } catch (e) {
        console.log(e);
    } 
}