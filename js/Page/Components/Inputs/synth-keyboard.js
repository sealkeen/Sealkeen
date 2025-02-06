import { createInfoMessage } from "../../../Errors/fetch-errors.js";
import { serviceProvider } from "../../../Services/di-container.js";

let audioCtx;

function initializeAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}

document.addEventListener("click", initializeAudioContext, { once: true });
// 0 = default octave (C4), -1 = lower octave, +1 = higher octave
let currentOctave = 0; 

// Frequency mapping for 7 white keys (Z-M keys) and 5 black keys (S-J keys)
const baseFrequencies = {
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

// Adjust frequency by the current octave
function getFrequencyForKey(key) {
  const baseFrequency = baseFrequencies[key];
  return baseFrequency ? baseFrequency * Math.pow(2, currentOctave) : null;
}

// Cache for oscillators and gain nodes
const activeNotes = {};

function getOctaveDiv() {
    const octaveDiv = document.createElement("div");
    const octaveDown = document.createElement("button");
    const octaveUp = document.createElement("button");
    const octaveDisplay = document.createElement("span");
    octaveDisplay.className = "shadow-box";
    octaveDiv.id = "octave-div";
    octaveUp.id = "octave-up"; octaveUp.innerText = "Octave +";
    octaveDown.id = "octave-down"; octaveDown.innerText = "Octave -";
    octaveDisplay.id = "octave-display"; octaveDown.innerText = "Octave: 0";
    
    // octave buttons
    octaveUp.addEventListener("click", () => {
        if (currentOctave < 2) currentOctave++;
            updateOctaveDisplay();
    });
    octaveDown.addEventListener("click", () => {
        if (currentOctave > -2) currentOctave--;
            updateOctaveDisplay();
    });
    
    for (const oct of [octaveDown, octaveUp, octaveDisplay])
        octaveDiv.appendChild(oct);

    return octaveDiv;
};

export function useSynthKeyboard()
{
    if (document.querySelector("#synth-piano") != null || (document.querySelector('.synth-piano') ?? []) [0] != null) {
        return;
    }
    initializeAudioContext();
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
    let pageContainer = document.querySelector("#page-body-container");
    let octEltsDiv = getOctaveDiv();
    if (contentCenter) {
        //if (contentCenter != null)
        //    contentCenter.innerHTML = '';

        contentCenter.insertAdjacentElement('afterend', octEltsDiv);

        contentCenter.appendChild(synthPiano);
    } else {
        if (pageContainer) {
            //if (pageContainer != null)
            //    pageContainer.innerHTML = '';

            pageContainer.insertAdjacentElement('afterend', octEltsDiv);
            pageContainer.appendChild(synthPiano);
        } else {
            console.error("No container elements found.");
        }
    }

    // key press and release
    document.addEventListener("keydown", (event) => {
        const frequency = getFrequencyForKey(event.code);
        if (frequency) {
            startTone(frequency, event.code);
            highlightKey(document.querySelector(`.key[data-code="${event.code}"]`));
        }
    });
    document.addEventListener("keyup", (event) => {
        const keyElement = document.querySelector(`.key[data-code="${event.code}"]`);
        if (baseFrequencies[event.code] && keyElement) {
            stopTone(event.code);
            unhighlightKey(keyElement);
        }
    });
    // Mouse down and up event listeners on the piano keys
    synthPiano.addEventListener("mousedown", (event) => {
        const keyElement = event.target.closest(".key"); // Find the closest key element
        if (keyElement && keyElement.dataset.code) { // Check if it's a valid key
            const frequency = getFrequencyForKey(keyElement.dataset.code); // Get frequency from data-code
            if (frequency) {
                startTone(frequency, keyElement.dataset.code); // Start the tone
                highlightKey(keyElement); // Highlight the key
            }
        }
    });
    
    synthPiano.addEventListener("mouseup", (event) => {
        const keyElement = event.target.closest(".key"); // Find the closest key element
        if (keyElement && keyElement.dataset.code) { // Check if it's a valid key
            stopTone(keyElement.dataset.code); // Stop the tone
            unhighlightKey(keyElement); // Unhighlight the key
        }
    });
    
    synthPiano.insertAdjacentHTML( 'beforebegin', `
        <style>
        .synth-piano { width: 640px; height: 320px; min-width: 80%; max-width: 100%; position: relative; justify-self: center; top: 0; left: 0; background: black; opacity: 0.77; border-radius: 14px; display: flex }
        .key.white { background: white; flex-grow: 1; border: 1px solid black;}
        .key.black { font-color: white; background: black; height: 50%; width: 50%; justify-self: flex-end; }
        .key.active { background: grey; }
        .key { border-radius: 10px; }
        #octave-down { height: 30px; flex-grow: 1; }
        #octave-up { height: 30px; flex-grow: 1; }
        #octave-display { height: 30px; flex-grow: 1; color: white; font-size: 1.45rem; text-align: center; }
        #octave-div { display: flex; flex-direction: row; justify-self: center; min-width: 80%; max-width: 100%;}
        <style/>`
    );
    if (window.isMobileOrTablet) {
        synthPiano.insertAdjacentHTML( 'beforebegin', `
            <style>
            .key.black { min-width: 75%; }
            <style/>`
        );
    };

    // TODO: убрать костыль, разобраться почему не добавляется ранее или удаляется.
    let devBody = document.getElementById("development-body");
    if (!devBody) {
        const newsData = serviceProvider.resolve('newsData');
        if (newsData.setDevelopmentMessages) {
            newsData.setDevelopmentMessages();
        }
    }
}

function updateOctaveDisplay() {
    document.querySelector("#octave-display").innerText = `Octave: ${4 + currentOctave}`;
}

// Create and start a tone
function startTone(frequency, key) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
  
    oscillator.type = "sine"; // Type of wave: sine, square, triangle, sawtooth
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Set frequency
  
    // Connect oscillator to gain node, then to output
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
  
    // Start the oscillator
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime); // Set volume
    oscillator.start();
  
    activeNotes[key] = { oscillator, gainNode };
}

// Stop a tone
function stopTone(key) {
    const note = activeNotes[key];
    if (note) {
        const { oscillator, gainNode } = note;
        const fadeTimeout = 0.5;
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + fadeTimeout);
        oscillator.stop(audioCtx.currentTime + fadeTimeout);
        delete activeNotes[key];
    }
}

function highlightKey(keyElement) {
    keyElement.classList.add("active");
}
  
function unhighlightKey(keyElement) {
    keyElement.classList.remove("active");
}
