

export async function loadDirect(source)
{
    if(source.includes(':')) {
        console.log('loadDirect: $("#player-audio-element")[0] is %j', $("#player-audio-element")[0]);
        $("#player-source-element")[0].setAttribute('src', source);
        let loadPromise = await $("#player-audio-element")[0].load();
        if (loadPromise !== undefined) {
            loadPromise.then(() => {
                $("#player-audio-element")[0].play()
                return true;
            }).catch((error) => {
                if (error.name === "NotAllowedError") {
                    console.log('Load audio promise failure. NotAllowed Error.');
                } else {
                    console.log('Load or playback error. ' + error);
                }
            });
        }
    }
    return false;
}