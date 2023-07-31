
// Define the function that appends the volume control element
export function appendHorizontalVolumeControl() {
    // Get the player-audio-div element by its ID
    const playerAudioDiv = document.getElementById("player-audio-div");

    // Check if an element with the ID 'horizontal-volume-control' already exists
    if (document.getElementById("horizontal-volume-control")) {
      console.log("[WRN] An element with the ID 'horizontal-volume-control' already exists");
      return;
    }

    // Create a new input element
    const volumeControl = document.createElement("input");

    // Set the type, ID, and class attributes of the input element
    volumeControl.setAttribute("type", "range");
    volumeControl.setAttribute("id", "horizontal-volume-control");
    volumeControl.setAttribute("class", "footer-volume-control");

    // Append the input element to the player-audio-div element
    playerAudioDiv.appendChild(volumeControl);

    setSidebarInputVolumeOnChange();
}

export function setSidebarInputVolumeOnChange(plr) {
    const audio = plr || document.getElementById('player-audio-element');
    if (!audio) { return; }

    const vVolume = document.querySelector('#vertical-volume-control');
    const hVolume = document.querySelector('#horizontal-volume-control');

    if (vVolume) {
        vVolume.addEventListener('change', handleVolumeChange);
        audio.volume = vVolume.value / 100;
    } else { console.log('No verVolume found') }
    
    if (hVolume) {
        hVolume.addEventListener('change', handleVolumeChange);
        audio.volume = hVolume.value / 100;
    } else { console.log('No horVolume found') }

    function handleVolumeChange(e) {
        const newVolume = e.currentTarget.value / 100;
        audio.volume = newVolume;
        hVolume.value = e.currentTarget.value;
        vVolume.value = e.currentTarget.value;
    }
}
