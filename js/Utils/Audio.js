
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
        }
    } catch (err) {
        console.log(err);
    }
}