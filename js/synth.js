
// the synthesizer plays sounds using the web audio api built into modern browsers


// see https://en.wikipedia.org/wiki/Piano_key_frequencies
// var m_pitches = [400,450,526,350];
var G=391.995, A=440.000, C=523.251, F=349.228, C3=180.813, C6=1046.50;
var m_pitches = [G,A,C,F];
var m_pitchLose = C3;
var m_pitchWin = C6;


class Synth {
    
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = null;
        this.onStop = null;
        this.soundStarted = false;
    }
    
    // start synth
    // start(frequency=1000, startTime=0, onEnd=null) {
    start(note=1, startTime=0, onEnd=null) {
        var frequency = m_pitches[note-1];
        console.log('startsound',note,frequency,startTime);
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
    // play(frequency=1000, duration=250, startTime=0, onEnd) {
    play(note=1, duration=250, startTime=0, onEnd) {
        console.log('play', note, duration, startTime);
        // this.start(frequency, startTime);
        var startAt = this.audioCtx.currentTime + (startTime/1000);
        var stopAt = startAt + (duration / 1000); // needs seconds, not msecs
        console.log('startat,stopat',startAt,stopAt);
        this.start(note, startAt);
        this.oscillator.stop(stopAt); // this is more precise than using the js timer
        if (onEnd) {
            console.log('set onended=', onEnd);
            this.oscillator.onended = onEnd;
        }
    }
    
}


