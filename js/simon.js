

// const maxnotes = 20; // win game if reach this many notes
const maxNotes = 4; // win game if reach this many notes
// var userNotes = []; // user-input sequence
var m_state = null;
var m_strict = false;

// game states
// const stateOff = 0;
const stateOn = 1;
const stateStart = 2;
const statePlayNotes = 3;
const stateGetInput = 4;
const statePlayNote = 5;
const statePlayError = 6;
const statePlayWin = 7;



var synth = new Synth();

class Sequencer {
    constructor(synth, lights, notes) {
    }
    play(nnotes) {
    }
    _playNextNote() {
    }
}

var sequencer = new Sequencer();



class Game {
    constructor(callbackPlayNote) {
        this.callbackPlayNote = callbackPlayNote;
        this.state = stateOn;
        this.strict = false;
        this.notes = null;
        this.inote = null;
        this.inotemax = null;
    }
    start() {
        //. pause then call playNotes
        this.state = stateStart;
        // var notes = this._generateNotes(maxNotes);
        this.notes = [1,2,3,4];
        this.inotemax = 2; // current number of notes to play
        this.inote = 0;
        this.playNotes();
        this.userNotes = []; // clear user sequence
        this.speed = 1.0;
        this.noteLength = 250 / speed; // msec
        this.pauseLength = 50 / speed; // msec
        // this.currentNote = notes[nnotes-1];
        // increase speed
        // this.speed *= 1.1;
    }
    // generate a random sequence
    _generateNotes(nnotes) {
        var notes = [];
        for (var i=0; i < nnotes; i++) {
            notes[i] = Math.floor(Math.random() * 4) + 1;
        }
        return notes;
    }
    playNotes() {
        m_state = statePlayNotes;
        this.inote = 0;
        this.playNextNote();
        m_state = stateGetInput;
    }
    playNextNote() {
        if (this.inote < this.inotemax) {
            var note = this.notes[this.inote];
            this.callbackPlayNote(note, this.duration);
        }
    }
    userHitNote(note) {
        // if in getinput state, add to usernotes and return true, else return false
        // if (m_state == stateGetInput) {
            console.log('user hit '+ note);
            return true;
        // } else {
            // return false;
        // }
    }
    toggleStrict() {
        this.strict = !this.strict;
    }
}


/* user input
------------------------------------------------------------- */

function hitStart() {
}

// onclick add note to userNotes
function playNote(note) {
    // highlight the square
    // lightSquare();
    // play the sound
    // playSound();
}

