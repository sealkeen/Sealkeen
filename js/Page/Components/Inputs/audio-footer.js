import Exception from "../../../Extensions/cs-exception.js";

export function useAudioFooter()
{
    const playPauseButton = document.querySelector('.vista-player__play-pause');
    const audioElement = document.querySelector('#player-audio-element');
    
    if (!audioElement) {
        Exception.Throw('Audio footer elements not found : footer: ' + audioElement + ' play/pause: ' + playPauseButton);
        return;
    }
    
    const playIcon = playPauseButton?.querySelector('.vista-player__play-icon');
    const pauseIcon = playPauseButton?.querySelector('.vista-player__pause-icon');
    
    function togglePlayPause() {
        if (audioElement.paused) {
            audioElement.play().then(() => {
                playIcon?.classList.add('m__hidden');
                pauseIcon?.classList.remove('m__hidden');
            }).catch(error => {
                Exception.Throw('Error playing audio:', error);
            });
        } else {
            audioElement.pause();
            playIcon?.classList.remove('m__hidden');
            pauseIcon?.classList.add('m__hidden');
        }
    }
    
    playPauseButton?.addEventListener('click', togglePlayPause);
    
    audioElement.addEventListener('ended', () => {
        playIcon?.classList.remove('m__hidden');
        pauseIcon?.classList.add('m__hidden');
    });
    
    audioElement.addEventListener('pause', () => {
        if (audioElement.paused) {
            playIcon?.classList.remove('m__hidden');
            pauseIcon?.classList.add('m__hidden');
        }
    });
    
    audioElement.addEventListener('play', () => {
        if (!audioElement.paused) {
            playIcon?.classList.add('m__hidden');
            pauseIcon?.classList.remove('m__hidden');
        }
    });
    
    audioElement.addEventListener('error', () => {
        playIcon?.classList.remove('m__hidden');
        pauseIcon?.classList.add('m__hidden');
    });
    
    if (audioElement.paused) {
        playIcon?.classList.remove('m__hidden');
        pauseIcon?.classList.add('m__hidden');
    } else {
        playIcon?.classList.add('m__hidden');
        pauseIcon?.classList.remove('m__hidden');
    }
    
    function play() {
        playIcon?.classList.add('m__hidden');
        pauseIcon?.classList.remove('m__hidden');
        return audioElement.play()
            .then(() => { return true; })
            .catch(error => {
                pauseIcon?.classList.add('m__hidden');
                playIcon?.classList.remove('m__hidden');
                return false;
            });
    }
    function pause() {
        let promise = audioElement.pause();
        playIcon?.classList.remove('m__hidden');
        pauseIcon?.classList.add('m__hidden');
        return promise;
    }
    function load() { return audioElement.load(); }

    return {
        play: play,
        pause: pause,
        load: load,
        loadAndPlay: () => {
            load();
            return play();
        },
        toggle: togglePlayPause,
        audioElement: audioElement
    };
}