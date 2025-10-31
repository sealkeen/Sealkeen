import Debug from "../../Extensions/cs-debug.js";
import Exception from "../../Extensions/cs-exception.js";
import { updateMediaSession } from "../../Services/MediaSession/media-session-service.js";
import { _trackQueue } from "../../Shared/Queue.js";
import { fromJQueryObject, hasAnyClass } from "../../utilities.js";

// public: 
export function onCompositionRightMouseDown(e) {
    try {
        let menu = document.createElement("div")
        menu.onfocusout = () => menu.outerHTML = '';
        menu.onmouseleave = () => menu.outerHTML = ''
        menu.className = "ctxmenu"
        appendPushListItem(e, menu)
        appendQueueListItem(e, menu)
        appendDownloadItem(e, menu);
        appendStreamItem(e, menu);
        
        Debug.WriteLine("event.target: " + e.target);
        let insertTarget = {};
        if (e.target.classList.contains('card-body'))
            insertTarget = e.target.parentElement;
        if (e.target.classList.contains('card'))
            insertTarget = e.target;
        if (hasAnyClass(e.target, 'card-text', 'card-title'))
            insertTarget = e.target.parentElement.parentElement;
        
        insertTarget.appendChild(menu);
    } catch (err) {
        Exception.Throw(err);
    }
}

// private:
function appendPushListItem(e, menu) { 
    let push = document.createElement("p");
    push.className = 'ctxmenu__button';
    push.innerHTML = "Add first";
    push.onclick = () => { _trackQueue.push_front(fromJQueryObject(e)); };
    menu.appendChild(push);
}
function appendQueueListItem(e, menu) { 
    let queue = document.createElement("p");
    queue.className = 'ctxmenu__button';
    queue.innerHTML = "Add last";
    queue.onclick = () => { _trackQueue.enqueue(fromJQueryObject(e)); };
    menu.appendChild(queue);
}
function getTrackId(e) { 
    const card = e.target.closest('.card');
    if (!card) return;
    const data = card.querySelector('data');
    if (!data || !data.value) return;
    return data.value;
}

// ===== Right Mouse Down ===== {
function appendDownloadItem(e, menu) {
    const trackId = getTrackId(e);
    if(!trackId) return;
    const downloadUrl = `${window.location.origin}/GetAudio?Id=${trackId}`; // todo: api urls
    const download = document.createElement("p");
    download.className = 'ctxmenu__button';
    download.innerHTML = "Download";
    download.onclick = () => {
        const a = document.createElement('a');
        a.href = downloadUrl;

        let fileName = '';
        if (downloadUrl.includes('GetAudio')) {
            const card = e.target.closest('.card');
            const cardTitle = card.querySelector('.card-title');
            const cardText = card.querySelector('.card-text');
            
            if (cardTitle && cardText) {
                const artist = cardTitle.textContent.trim();
                const title = cardText.textContent.trim();
                
                fileName = `${artist} – ${title}`
                    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
                    .replace(/\s+/g, ' ') // Collapse multiple spaces
                    .trim() + '.mp3';
            }
        }
        
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    menu.appendChild(download);
}
function appendStreamItem(e, menu) {
    const trackId = getTrackId(e);
    if (!trackId) return;
    const openUrl = `${window.location.origin}/Media`; // todo: api urls
    const ostream = document.createElement("p");
    ostream.className = 'ctxmenu__button';
    ostream.innerHTML = "Open Stream";
    ostream.onclick = () => {
        sendData(openUrl, trackId).then(() =>
        {
            // TODO: getAudioNode();
            let player = document.querySelector("#player-audio-element");
            if (player) player.src = '/api/AudioStreaming/mp3';
            const card = e.target.closest('.card');
            const cardTitle = card.querySelector('.card-title');
            const cardText = card.querySelector('.card-text');
            if (cardTitle && cardText) {
                const artist = cardTitle.textContent.trim();
                const title = cardText.textContent.trim();
                
                document.title = `${artist} – ${title}`
                    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
                    .replace(/\s+/g, ' ') // Collapse multiple spaces
                    .trim();
                updateMediaSession(document.title);
            }
            player.play();
        });
    };
    menu.appendChild(ostream);
}

// STREAM TRACK
async function sendData(url, id) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({Input: `media-command open ${id}`}),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
        }
        const result = await response.json();
        console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Fetch error:', error.message);
        throw error;
    }
}

// } ===== Right Mouse Down =====
