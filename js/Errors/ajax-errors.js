import { getAudioNode } from "../Shared/Audio.js";

export function onAjaxLoadError(source, safePlay)
{
    if (source.includes('http')) {
        //<source id="player-source-element" src="null" type="audio/mp3"></source>
        let src = document.createElement('source');
        src.setAttribute('id', "player-source-element");
        src.setAttribute('src', source);
        src.setAttribute('type', 'audio/mp3');
        getAudioNode().innerHTML = '';
        getAudioNode().appendChild(src);
        safePlay();
    }
}

export function onAjaxSwitchPageError(source, safeSwitch)
{
    if (source.includes('http')) {
        //<source id="player-source-element" src="null" type="audio/mp3"></source>
        let src = document.createElement('source');
        src.setAttribute('id', "player-source-element");
        src.setAttribute('src', source);
        src.setAttribute('type', 'audio/mp3');
        getAudioNode().innerHTML = '';
        getAudioNode().appendChild(src);
        safeSwitch();
    }
}