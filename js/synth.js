

// var m_audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// var m_oscillator = null;

class Synth {
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = null;
        this.onStop = null;
        this.soundStarted = false;
    }
    // start synth
    start(frequency=1000, startTime=0, onEnd=null) {
        console.log('startsound',frequency,startTime);
        var oscillator = this.audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency; // Hz
        oscillator.connect(this.audioCtx.destination);
        // var gainNode = this.audioCtx.createGain();
        // oscillator.connect(gainNode);
        // gainNode.connect(this.audioCtx.destination);
        // const startVolume = 0.2;
        // const endVolume = 0.001;
        // gainNode.gain.setValueAtTime(startVolume, this.audioCtx.currentTime);
        // gainNode.gain.exponentialRampToValueAtTime(endVolume, this.audioCtx.currentTime + duration/1000); // secs
        oscillator.start(startTime);
        // if (onEnd) {
        //     oscillator.onend = onEnd;
        // }
        this.soundStarted = true;
        this.oscillator = oscillator;
    }
    // stop synth
    stop() {
        console.log('stopsound');
        if (this.soundStarted && this.oscillator) {
            //. ramp down
            this.oscillator.stop();
            if (this.onStop)
                this.onStop();
            this.oscillator = null;
            this.soundStarted = false;
        }
    }
    // play sound for a specific duration of time
    play(frequency=1000, duration=250, startTime=0, onEnd) {
        console.log('play', frequency, duration, startTime);
        // this.start(frequency, startTime);
        var startAt = this.audioCtx.currentTime + (startTime/1000);
        var stopAt = startAt + (duration / 1000); // needs seconds, not msecs
        console.log('stopat',stopAt);
        this.start(frequency, startAt);
        // this.oscillator.stop(stopTime); // this is more precise than using the js timer
        this.oscillator.stop(stopAt); // this is more precise than using the js timer
        if (onEnd) {
            console.log('set onended=', onEnd);
            this.oscillator.onended = onEnd;
        }
    }
}


