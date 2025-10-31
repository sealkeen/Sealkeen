
let g_isPlaying = false;
let g_audioElement = null;
let g_playbackStateInitialized = false;

export function initializePlaybackState(g_audioSelector) {
    if (g_playbackStateInitialized === true) return;

    g_audioElement = document.querySelector(g_audioSelector)
    // Set up audio element event listeners
    if (g_audioElement) {
        g_audioElement.addEventListener('pause', () => {
            g_isPlaying = false;
            clearMediaSession();
        });

        this.audioElement.addEventListener('ended', () => {
            g_isPlaying = false;
            clearMediaSession();
        });
    }
    g_playbackStateInitialized = true;
}
export function updateMediaSession(trackInfo) {
    // Check if Media Session API is supported
    if ('mediaSession' in navigator && trackInfo) {
        const parts = trackInfo.split(' – ');
        const title = parts.length > 1 ? parts[1] : trackInfo;
        const artist = parts.length > 1 ? parts[0] : 'Unknown';

        navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: artist,
        });

        navigator.mediaSession.playbackState = g_isPlaying ? 'playing' : 'paused';
    }
}
export function clearMediaSession() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.playbackState = 'none';
    }
}