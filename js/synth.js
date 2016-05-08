
// the synthesizer plays sounds using the web audio api built into modern browsers

'use strict';


// define pitches
// see https://en.wikipedia.org/wiki/Piano_key_frequencies
var G=391.995, A=440.000, C=523.251, F=349.228, C3=180.813, C6=1046.50;

var m_pitches = [G,A,C,F];
var m_pitchLose = C3;
var m_pitchWin = C6;


class Synth {
    
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // this.oscillator = null;
        // this.onStop = null;
        // this.soundStarted = false;
    }
    
    // start synth
    start(note=1) {
        if (this.oscillator) {
            console.log('error - oscillator exists');
            return;
        }
        var frequency = m_pitches[note-1];
        console.log('startsound',note,frequency);
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
        // oscillator.start(startTime);
        oscillator.start();
        this.soundStarted = true;
        this.oscillator = oscillator;
    }
    
    // stop synth
    stop(square) {
        console.log('stopsound',square);
        if (this.soundStarted && this.oscillator) {
            //.. ramp down
            this.oscillator.stop();
            this.oscillator = null;
            this.soundStarted = false;
        }
    }
    
}


