'use strict';

// the synthesizer plays sounds using the web audio api built into the browser
// see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API


// define pitches
// see https://en.wikipedia.org/wiki/Piano_key_frequencies
var F=349.228, G=391.995, A=440.000, C=523.251, C3=180.813, C6=1046.50;

var m_pitches = [F,G,A,C];
var m_pitchLose = C3;
var m_pitchWin = C6;


class Synth {
    
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // start synth oscillator
    start(note=1) {
        if (this.oscillator) {
            console.log('error - oscillator exists');
            return;
        }
        var frequency = m_pitches[note-1];
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = frequency; // Hz
        // oscillator.connect(this.audioCtx.destination);
        this.gainNode = this.audioCtx.createGain();
        this.oscillator.connect(this.gainNode);
        // gainNode.connect(this.audioCtx.destination);
        // gainNode.gain.setValueAtTime(startVolume, this.audioCtx.currentTime);
        // gainNode.gain.exponentialRampToValueAtTime(endVolume, this.audioCtx.currentTime + duration/1000); // secs
        // oscillator.start(startTime);
        this.oscillator.start();
        this.soundStarted = true;
    }
    
    // stop synth oscillator
    stop(square) {
        if (this.soundStarted && this.oscillator) {
            // this.oscillator.stop();
            //.. ramp down
            const startVolume = 0.2;
            const endVolume = 0.001;
            const rampDuration = 50;
            var currentTime = this.audioCtx.currentTime; // secs
            var stopTime = currentTime + (rampDuration/1000); // secs
            this.gainNode.gain.setValueAtTime(startVolume, currentTime);
            this.gainNode.gain.exponentialRampToValueAtTime(endVolume, stopTime);
            this.oscillator.stop(stopTime);
            this.oscillator = null;
            this.soundStarted = false;
        }
    }
    
}


