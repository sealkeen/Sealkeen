var g_apiPath = "/";
var g_payload = "";
var g_audioSelector = null;
var g_titleSelector = "";

export function useNowPlayingManager() {
    setTimeout(addNowPlayingManager, 750);
}

export function addElementSelectorThenPathThenTitleAndPayLoad(audioSelector, apipath, titleSelector, payload) {
    g_audioSelector = audioSelector;
    g_apiPath = apipath;
    g_titleSelector = titleSelector;
    g_payload = payload;
}

function addNowPlayingManager()
{
    let nowPlayingManager = new NowPlayingManager();
    window.nowPlayingManager = nowPlayingManager;
}

class NowPlayingManager {
    constructor() {
        this.isPlaying = false;
        this.currentTrack = '';
        this.updateInterval = null;
        this.audioElement = document.querySelector(g_audioSelector);
        
        this.init();
    }

    init() {
        // Set up audio element event listeners
        if (this.audioElement) {
            this.audioElement.addEventListener('play', () => {
                this.isPlaying = true;
                this.updateMediaSession();
            });

            this.audioElement.addEventListener('pause', () => {
                this.isPlaying = false;
                this.clearMediaSession();
            });

            this.audioElement.addEventListener('ended', () => {
                this.isPlaying = false;
                this.clearMediaSession();
            });
        }

        // Start polling for now-playing information
        this.startPolling();
    }

    async fetchNowPlaying() {
        try {
            const response = await this.sendAjax({ Input: g_payload });
            return response.statusText;
        } catch (error) {
            console.error('Error fetching now playing:', error);
            return null;
        }
    }

    sendAjax(jsonCommand) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: g_apiPath,
                type: 'POST',
                data: JSON.stringify(jsonCommand),
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    }

    updateWindowTitle(trackInfo) {
        if (trackInfo) {
            document.title = trackInfo;
            let title = document.querySelector(g_titleSelector);
            if (title) title.textContent = '🎵 ' + trackInfo;
        }
    }

    updateMediaSession(trackInfo) {
        // Check if Media Session API is supported
        if ('mediaSession' in navigator && trackInfo) {
            // Parse the track info - adjust this based on your actual format
            // Assuming format is "Artist – Title" or similar
            const parts = trackInfo.split(' – ');
            const title = parts.length > 1 ? parts[1] : trackInfo;
            const artist = parts.length > 1 ? parts[0] : 'Unknown';

            navigator.mediaSession.metadata = new MediaMetadata({
                title: title,
                artist: artist,
                // TODO: Add more metadata if available
                // album: 'Album Name',
                // artwork: [
                //     { src: 'https://example.com/album-cover.jpg', sizes: '96x96', type: 'image/jpeg' }
                // ]
            });

            // Set playback state
            navigator.mediaSession.playbackState = this.isPlaying ? 'playing' : 'paused';
        }
    }

    clearMediaSession() {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = null;
            navigator.mediaSession.playbackState = 'none';
        }
    }

    async updateNowPlaying() {
        const trackInfo = await this.fetchNowPlaying();
        
        if (trackInfo) {
            // Update window title regardless of playback state
            this.updateWindowTitle(trackInfo);
            
            // Update media session only if audio is playing
            if (this.isPlaying) {
                this.updateMediaSession(trackInfo);
            } else {
                this.clearMediaSession();
            }
        }
    }

    startPolling() {
        // Initial update
        this.updateNowPlaying();
        
        // Set up interval for polling
        this.updateInterval = setInterval(() => {
            this.updateNowPlaying();
        }, 5000); // 5 seconds
    }

    stopPolling() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        this.clearMediaSession();
    }

    // Method to manually trigger an update
    forceUpdate() {
        this.updateNowPlaying();
    }
}