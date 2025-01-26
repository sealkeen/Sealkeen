export function useTempoTapper()
{
    const tempoLabel = document.createElement("div");
    tempoLabel.style.position = "fixed";
    tempoLabel.style.top = "20px";
    tempoLabel.style.right = "20px";
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

    function updateTempoLabel() {
        if (tempo > 0) {
        tempoLabel.textContent = `${tempo.toFixed(3)} BPM`;
        tempoLabel.style.display = "block";
        } else {
        tempoLabel.style.display = "none";
        }
    }

    function resetTempo()
    {
        tempo = 0;
        lastTapTime = null;
        intervals = [];
        updateTempoLabel();
    }

    function updateTempoInterval()
    {
        // Clear any existing timeout to reset the tempo
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            resetTempo();
        }, 6000);
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
    
        updateTempoInterval();
    }
    
    document.addEventListener("keydown", (event) => {
        if (event.code === "Pause") 
            handleTap();
        if (event.code === "Escape")
            resetTempo();
    });

    return { handleTap };
}