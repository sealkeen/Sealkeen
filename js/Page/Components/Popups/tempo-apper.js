
export function useTempoTapper()
{
    // Create a floating label in the upper-right corner to display the tempo
    const tempoLabel = document.createElement("div");
    tempoLabel.style.position = "fixed";
    tempoLabel.style.top = "10px";
    tempoLabel.style.right = "10px";
    tempoLabel.style.fontSize = "24px";
    tempoLabel.style.fontFamily = "Arial, sans-serif";
    tempoLabel.style.color = "yellow";
    tempoLabel.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    tempoLabel.style.padding = "5px 10px";
    tempoLabel.style.borderRadius = "5px";
    tempoLabel.style.display = "none"; // Initially hidden
    tempoLabel.style.zIndex = "100";
    document.body.appendChild(tempoLabel);

    let lastTapTime = null;
    let tempo = 0;
    let timeoutId = null;
    let intervals = []; // Array to store intervals between taps

    // Function to update the label and show the tempo
    function updateTempoLabel() {
        if (tempo > 0) {
        tempoLabel.textContent = `${tempo.toFixed(3)} BPM`;
        tempoLabel.style.display = "block";
        } else {
        tempoLabel.style.display = "none";
        }
    }
    
    // Function to handle tap events
    function handleTap() {
        const currentTime = Date.now();
    
        if (lastTapTime !== null) {
        const interval = (currentTime - lastTapTime) / 1000; // Time in seconds
        intervals.push(interval); // Store the interval
    
        if (intervals.length > 1) {
            const averageInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
            tempo = 60 / averageInterval; // Calculate average BPM
        }
        }
    
        lastTapTime = currentTime;
        updateTempoLabel();
    
        // Clear any existing timeout to reset the tempo
        clearTimeout(timeoutId);
    
        // Set a timeout to zero the tempo after 6 seconds of inactivity
        timeoutId = setTimeout(() => {
        tempo = 0;
        lastTapTime = null;
        intervals = []; // Clear stored intervals
        updateTempoLabel();
        }, 6000);
    }
    
    // Listen for the "Pause/Break" key press
    document.addEventListener("keydown", (event) => {
        if (event.code === "Pause") {
        handleTap();
        }
    });
}