
export function setSidebarInputVolumeOnChange(plr) {
    const audio = plr || document.getElementById('player-audio-element');
    if (!audio) {
        return;
    }
    const volume = document.querySelector('#volume-control');
    const volumeCtrlAbs = document.querySelector('#volume-control-absolute');
    if (volume) {
        volume.addEventListener('change', handleVolumeChange);
        audio.volume = volume.value / 100;
    }
    if (volumeCtrlAbs) {
        volumeCtrlAbs.addEventListener('change', handleVolumeChange);
        audio.volume = volumeCtrlAbs.value / 100;
    }
    function handleVolumeChange(e) {
        const newVolume = e.currentTarget.value / 100;
        audio.volume = newVolume;
        volumeCtrlAbs.value = e.currentTarget.value;
        volume.value = e.currentTarget.value;
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