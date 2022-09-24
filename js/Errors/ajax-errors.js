
export function onAjaxLoadError(source, error_, safePlay)
{
    console.log("Ajax error: " + error_);
    console.log('{')
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
    console.log('}')
}

export function onAjaxSwitchPageError(source, error_, safeSwitchPage)
{
    console.log("Ajax error: " + error_);
    console.log('{')
    if (source.includes('http')) {
        //<source id="player-source-element" src="null" type="audio/mp3"></source>
        let src = document.createElement('source');
        src.setAttribute('id', "player-source-element");
        src.setAttribute('src', source);
        src.setAttribute('type', 'audio/mp3');
        $("#player-audio-element").html('');
        $("#player-audio-element").append(src);
        safeSwitchPage();
    }
    console.log('}')
}