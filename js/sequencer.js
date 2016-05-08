
'use strict';


// the sequencer hooks up to a synthesizer and light array,
// and can play a set sequence of notes in order

class Sequencer {
    constructor(synth, lights) {
        this.synth = synth;
        this.lights = lights;
    }
    load(squares) {
        this.squares = squares;
    }
    play(nsquaresToPlay, duration, gap) {
        this.duration = duration || 250; // msec
        this.gap = gap || 100; // msec
        this.nsquaresToPlay = nsquaresToPlay || this.squares.length; // ie play all
        this.nsquare = 0;
        //. this is where we need to schedule things - start,stop start,stop, etc.
        // but re-use timers - don't create 40 of them - chain them
        this._playNext();
    }
    _playNext() {
        if (this.nsquare < this.nsquaresToPlay) {
            var square = this.squares[this.nsquare];
            this.lights.start(square);
            this.synth.start(square);
            setTimeout(this._pause.bind(this), this.duration);
        }
    }
    _pause() {
        var square = this.squares[this.nsquare];
        this.lights.stop(square);
        this.synth.stop(square);
        this.nsquare++;
        setTimeout(this._playNext.bind(this), this.gap);
    }
}


module.exports = Sequencer;
