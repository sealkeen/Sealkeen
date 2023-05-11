
// Define the function that appends the volume control element
export function appendHorizontalVolumeControl() {
    // Get the player-audio-div element by its ID
    const playerAudioDiv = document.getElementById("player-audio-div");

    // Check if an element with the ID 'volume-control-absolute' already exists
    if (document.getElementById("horizontal-volume-control")) {
      console.log("An element with the ID 'horizontal-volume-control' already exists");
      return;
    }

    // Create a new input element
    const volumeControl = document.createElement("input");

    // Set the type, ID, and class attributes of the input element
    volumeControl.setAttribute("type", "range");
    volumeControl.setAttribute("id", "horizontal-volume-control");
    volumeControl.setAttribute("class", "footer-volume-control");

    // Append the input element to the track-artist-song-name div element
    const trackArtistSongNameDiv = playerAudioDiv.querySelector(".track-artist-song-name");
    trackArtistSongNameDiv.appendChild(volumeControl);

    setSidebarInputVolumeOnChange();
}

export function setSidebarInputVolumeOnChange(plr) {
    const audio = plr || document.getElementById('player-audio-element');
    if (!audio) { return; }

    const vVolume = document.querySelector('#vertical-volume-control');
    const volumeCtrlAbs = document.querySelector('#horizontal-volume-control');

    if (vVolume) {
        vVolume.addEventListener('change', handleVolumeChange);
        audio.volume = vVolume.value / 100;
    }
    if (volumeCtrlAbs) {
        volumeCtrlAbs.addEventListener('change', handleVolumeChange);
        audio.volume = volumeCtrlAbs.value / 100;
    }
    function handleVolumeChange(e) {
        const newVolume = e.currentTarget.value / 100;
        audio.volume = newVolume;
        volumeCtrlAbs.value = e.currentTarget.value;
        vVolume.value = e.currentTarget.value;
    }
}
