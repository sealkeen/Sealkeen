
export function setSidebarInputVolumeOnChange(plr) {
    try {
        let audio = plr ?? document.getElementById('player-audio-element');
        if(audio != null) {
            let volume = document.querySelector("#volume-control");
            if(volume != null) {
                volume?.addEventListener("change", function(e) {
                    audio.volume = e.currentTarget.value / 100;
                });
                audio.volume = volume.value / 100;
            }            
            let volumeCtrlAbs = document.querySelector("#volume-control-absolute");
            if(volumeCtrlAbs != null) {
                volumeCtrlAbs?.addEventListener("change", function(e) {
                    audio.volume = e.currentTarget.value / 100;
                });
                audio.volume = volumeCtrlAbs.value / 100;
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export async function loadDirect(source)
{
    if(source.includes(':')) {
        console.log('loadDirect: $("#player-audio-element")[0] is %j', $("#player-audio-element")[0]);
        //$("#player-audio-element")[0].pause();
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