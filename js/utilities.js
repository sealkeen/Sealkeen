﻿import { _trackQueue, peekObjectsArtistsAndTitles } from './Shared/Queue.js';
import Debug from './Extensions/cs-debug.js';
import Trace from './Extensions/cs-trace.js';
import Exception from './Extensions/cs-exception.js';
import { createInfoMessage } from './Errors/fetch-errors.js';
import { getAudioNode } from './Shared/Audio.js';

var cachedSongElement = null; /// Current playing song

export function addPlayingElementStyle(clickedElement)
{
    let closestCard = clickedElement?.closest('.card');
    addPlayingCardStyle(closestCard);
}

export function addPlayingCardStyle(closestCard)
{
    if (closestCard) {
        cachedSongElement?.classList?.remove('card-song-playing');
        cachedSongElement = closestCard;
        closestCard?.classList?.add('card-song-playing');
    }
}

export function isEmpty (val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

export function hasAnyClass (node, ...classes) {
    return classes.some(cls => node?.classList?.contains(cls));
}

export function getIdFromElementData(el) {
    let id = el.target;
    if (!event.target.classList.contains('card-body')) {
        Trace.WriteLine('contains card-body. el.children[0].value');
        Trace.WriteLine('%j', el.target.parentNode);
        Trace.WriteLine('%j', el.target.parentNode.querySelector('data').value);
        id = el.target.parentNode.querySelector('data').value;
        Trace.WriteLine('not contains card-body. el.currentTarget.parentNode.children[0].value');
    }
    else {
        Trace.WriteLine('contains card-body. el.children[0].value');
        Trace.WriteLine('%j', el.target.querySelector('data'));
        Trace.WriteLine('%j', el.target.querySelector('data').value);
        id = el.target.querySelector('data').value;
    }
    return id;
}

export function fromJSObject(el) {
    createInfoMessage('[INF] el.target' + Object.keys(el.target))
    let id = el.target;
    let artist = el.target;
    let title = el.target;
    if(el.target == null) { Exception.Throw("el.target: " + el.target) }
    if(el.target.classList == null) { Exception.Throw("el.target.classList: " + el.target.classList) }
    if (!el.target.classList.contains('card-body')) {

        createInfoMessage("el.target.parentNode.querySelector('data'): " + el.target.parentNode.querySelector('data'))
        createInfoMessage("el.target.parentNode.querySelector('data').value: " + el.target.parentNode.querySelector('data')?.value)
        id = el.target.parentNode.querySelector('data')?.value;
        artist = el.target.parentNode.querySelector('.card-title').innerHTML;
        title = el.target.parentNode.querySelector('.card-text').innerHTML;
    }
    else {
        id = el.target.querySelector('data').value;
        artist = el.target.querySelector('.card-title').innerHTML;
        title = el.target.querySelector('.card-text').innerHTML;
    }
    return { id, artist, title };
}

export function fromJQueryObject(el) {
    createInfoMessage('[INF] ' + Object.keys(el))
    let id = el.target;
    let artist = el.target;
    let title = el.target;
    createInfoMessage(el.target)
    if (!el.target.classList.contains('card-body')) {
        id = el.target.parentNode.querySelector('data').value;
        artist = el.target.parentNode.querySelector('.card-title').innerHTML;
        title = el.target.parentNode.querySelector('.card-text').innerHTML;
    }
    else {
        id = el.target.querySelector('data').value;
        artist = el.target.querySelector('.card-title').innerHTML;
        title = el.target.querySelector('.card-text').innerHTML;
    }
    return { id, artist, title };
}

export function fromDOMObject(el) {
    Debug.WriteLine('utilities.js/fromDOMObject() : el: ' + el);
    let id = el;
    let artist = el;
    let title = el;
    if (!el.classList.contains('card-body')) {
        id = el.parentNode.querySelector('data').value;
        artist = el.parentNode.querySelector('.card-title').innerHTML;
        title = el.parentNode.querySelector('.card-text').innerHTML;
    }
    else {
        id = el.querySelector('data').value;
        artist = el.querySelector('.card-title').innerHTML;
        title = el.querySelector('.card-text').innerHTML;
    }
    return { id, artist, title };
}

export function displayQueuedTracks(_trackQueue) {
    let queue = $('#footer-track-query')[0];
    if (queue == null) {
        queue = document.createElement("div");
        queue.id = "footer-track-query";
        queue.className = "footer-track-query";
        queue.innerHTML = peekObjectsArtistsAndTitles();
        let footer = $('.footer');
        footer[0].insertBefore(queue, footer[0].firstChild);
    } else {
        queue.innerHTML = peekObjectsArtistsAndTitles();
    }
    createCardsFromQuery(_trackQueue);
}

export function createCardsFromQuery(_trackQueue)
{
    try {
        let cardcolumns = document.querySelector('.card-query-columns');
        cardcolumns.innerHTML = '';
        
        Debug.WriteLine('utilities.js/createCardsFromQuery() Elts length: ', _trackQueue?.elts.length);
        _trackQueue?.elts.forEach(element => {
            let card = document.createElement("div")
            let comp = document.createElement("div")
            let data = document.createElement("data")
            let h6 = document.createElement("h6")
            let h7 = document.createElement("h7")

            card.className = 'card small-card';
            comp.className = 'card-body card-body-composition';
            card.setAttribute('draggable', 'true');
            data.setAttribute("value", element.id);
            h6.innerHTML = element.artist;
            h7.innerHTML = element.title;
            h6.className = 'card-title';
            h7.className = 'card-text';

            comp.appendChild(data);
            comp.appendChild(h6);
            comp.appendChild(h7);
            card.appendChild(comp);
            cardcolumns.appendChild(card);
        });
    } catch (err) {
        Exception.Throw(err);
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
    Debug.WriteLine('utilities.js/safePlay() { -> ... } ')
    try {
        var playPromise = getAudioNode().play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                // We can now safely pause video...
                Debug.WriteLine('utilities.js/safePlay() { } -> ...');
            })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                (async () => { await sleep(500); safePlay()})();
                Exception.Throw('[ERR] utilities.js/safePlay err: player returned error on play, autoplay prevented.');
            });
        }
    } catch(error) {
        Exception.Throw('[ERR] utilities.js/safePlay err: Player returned exception on try load or play %j', error);
    }
}

export function safeSwitchTrack()
{
    Debug.WriteLine('utilities.js/safeSwitchTrack() { -> ... }')
    displayQueuedTracks();
    try {
        var loadPromise = getAudioNode()?.load();
        if (loadPromise !== undefined) {
            loadPromise.then(_ => {
                Debug.WriteLine('utilities.js/safeLoadOK: safePlaying...');

                (async () => { await sleep(50); safePlay()})();
            })
            .catch(error => {
                // Auto-play was prevented
                (async () => { await sleep(50); safePlay()})();
                Exception.Throw(error);
                console.log('[ERR] safeSwitchTrack() err: player returned error on LOAD, autoplay prevented.');
            });
        }
    } catch(error) {
        console.log('[ERR] utilities.js/safeSwitchTrack() err: Player returned exception on try LOAD or PLAY %j', error);
    }
}

export function GetCurrentCompositionsId() { 
    try {
        let audioSrc = getAudioNode().children[0];
        if (audioSrc.src == null) {
            Debug.WriteLine('utilities.js/GetCurrentCompositionsId() error. audioSrc = null.');
            return '';
        }
        else 
            audioSrc = audioSrc.src;

        if(audioSrc.includes('/GetAudio?Id='))
            audioSrc = audioSrc.substring(audioSrc.indexOf('?Id=') + '?Id='.length);
        if(audioSrc.includes('?url='))
            audioSrc = audioSrc.substring(audioSrc.indexOf('?url=') + '?url='.length);
            
        Debug.WriteLine('utilities.js/GetCurrentCompId = ' + audioSrc);
        return audioSrc;
    } catch (e) {
        Exception.Throw('GetCurrentCompositionsId(): ' + e);
    } 
}