
export function onAjaxLoadError(source, error_, safePlay)
{
    if (source.includes('http')) {
        //<source id="player-source-element" src="null" type="audio/mp3"></source>
        let src = document.createElement('source');
        src.setAttribute('id', "player-source-element");
        src.setAttribute('src', source);
        src.setAttribute('type', 'audio/mp3');
        $("#player-audio-element").html('');
        $("#player-audio-element").append(src);
        safePlay();
    }
}

export function onAjaxSwitchPageError(source, error_, safeSwitch)
{
    if (source.includes('http')) {
        //<source id="player-source-element" src="null" type="audio/mp3"></source>
        let src = document.createElement('source');
        src.setAttribute('id', "player-source-element");
        src.setAttribute('src', source);
        src.setAttribute('type', 'audio/mp3');
        $("#player-audio-element").html('');
        $("#player-audio-element").append(src);
        safeSwitch();
    }
}