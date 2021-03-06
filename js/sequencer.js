'use strict';

// the sequencer hooks up to a synthesizer and light array,
// and can play a set sequence of notes in order, with a gap between them.

class Sequencer {
    
    constructor(synth, lights) {
        this.synth = synth;
        this.lights = lights;
    }

    // load a sequence into the sequencer
    load(squares) {
        this.squares = squares;
    }
    
    // play the sequence with each note having duration, and a gap between the notes.
    // can chain to another function afterwards with next.
    // note: for no gap pass 1 msec
    play(nsquaresToPlay, duration, gap, next) {
        // this is where we need to schedule things - start,stop start,stop, etc.
        // but re-use timers - don't create 40 of them - chain them
        this.nsquaresToPlay = nsquaresToPlay || this.squares.length; // ie play all
        this.duration = duration || 250; // msec
        this.gap = gap || 250; // msec
        this.nsquare = 0;
        this.next = next;
        this._playNext();
    }
    
    // play the next note in the sequence.
    // when done with all the notes, call the next function, if supplied.
    _playNext() {
        if (this.nsquare < this.nsquaresToPlay) {
            var square = this.squares[this.nsquare];
            this.lights.start(square);
            this.synth.start(square);
            setTimeout(this._pause.bind(this), this.duration);
        } else {
            if (this.next)
                this.next();
        }
    }
    
    // pause between notes.
    _pause() {
        var square = this.squares[this.nsquare];
        this.lights.stop(square);
        this.synth.stop(square);
        this.nsquare++;
        setTimeout(this._playNext.bind(this), this.gap);
    }
}


// for testing
if (module) 
    module.exports = Sequencer;
