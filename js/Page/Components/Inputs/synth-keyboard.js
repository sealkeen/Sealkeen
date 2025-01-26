// Create an audio context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Frequency mapping for 7 white keys (Z-M keys) and 5 black keys (S-J keys)
const keyToFrequency = {
    KeyZ: 261.63, // C4
    KeyS: 277.18, // C#4
    KeyX: 293.66, // D4
    KeyD: 311.13, // D#4
    KeyC: 329.63, // E4
    KeyV: 349.23, // F4
    KeyG: 369.99, // F#4
    KeyB: 392.00, // G4
    KeyH: 415.30, // G#4
    KeyN: 440.00, // A4
    KeyJ: 466.16, // A#4
    KeyM: 493.88, // B4
};

export function useSynthKeyboard()
{
    // Event listeners for key press
    document.addEventListener("keydown", (event) => {
        const keyElement = document.querySelector(`.key[data-code="${event.code}"]`);
        if (keyToFrequency[event.code] && keyElement) {
            playTone(keyToFrequency[event.code]);
            highlightKey(keyElement);
        }
    });
    
    // Create piano keys in the DOM
    const synthPiano = document.createElement("div");
    synthPiano.className = "synth-piano";

    // Create white keys
    ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM"].forEach((key) => {
        const whiteKey = document.createElement("div");
        whiteKey.className = "key white";
        whiteKey.dataset.code = key;
        whiteKey.innerHTML = key.substring(3);
        synthPiano.appendChild(whiteKey);
    });

    // Create black keys
    ["KeyS", "KeyD", "KeyG", "KeyH", "KeyJ"].forEach((key, index) => {
        const blackKey = document.createElement("div");
        blackKey.className = "key black";
        blackKey.dataset.code = key;
        blackKey.innerHTML = key.substring(3);

        // Position black keys between the white keys
        const whiteKeyIndex = [0, 1, 3, 4, 5][index];
        const whiteKey = synthPiano.children[whiteKeyIndex];
        whiteKey.appendChild(blackKey);
    });
    
    let contentCenter = document.querySelector("#content-center");
    if (contentCenter) {
        contentCenter.appendChild(synthPiano);
    } else {
        let pageContainer = document.querySelector("#page-body-container");
        if (pageContainer) {
            if (pageContainer != null) {
                pageContainer.innerHTML = '';
            }
            pageContainer.appendChild(synthPiano);
        } else {
            console.error("No container elements found.");
        }
    }
    
    // Event listener for mouse clicks on piano keys
    synthPiano.addEventListener("click", (event) => {
        const keyElement = event.target.closest(".key");
        if (keyElement && keyToFrequency[keyElement.dataset.code]) {
            playTone(keyToFrequency[keyElement.dataset.code]);
            highlightKey(keyElement);
        }
    });
    
    synthPiano.insertAdjacentHTML( 'beforebegin', `
        <style>
        .synth-piano { width: 640px; height: 320px; min-width: 80%; position: relative; justify-self: center; top: 0; left: 0; background: black; opacity: 0.77; border-radius: 14px; display: flex }
        .key.white { background: white; flex-grow: 1; border: 1px solid black;}
        .key.black { font-color: white; background: black; height: 50%; width: 50%; justify-self: flex-end; }
        .key.active { background: grey; }
        .key { border-radius: 10px; }
        <style/>`
    );
}

// Create and play a tone
function playTone(frequency) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine"; // Type of wave: sine, square, triangle, sawtooth
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Set frequency

    // Connect oscillator to gain node, then to output
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Set gain envelope
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime); // Volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1); // Fade out

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1); // Stop after 1 second
}

// Function to highlight the pressed key
function highlightKey(keyElement) {
    keyElement.classList.add("active");
    setTimeout(() => keyElement.classList.remove("active"), 200);
}

