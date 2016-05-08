
'use strict';

// const maxSquares = 4; // win game if reach this many squares


// game states
const stateOff = 0;
const stateOn = 1;
const stateStart = 2;
const statePlaySquares = 3;
const stateGetInput = 4;
// const statePlaySquare = 5;
const statePlayError = 6;
const statePlayWin = 7;


// var synth = new Synth();


// // the sequencer hooks up to a synthesizer and light array,
// // and plays a set sequence of 
// class Sequencer {
//     constructor(synth, lights) {
//         this.synth = synth;
//         this.lights = lights;
//     }
//     load(notes) {
//         this.notes = notes;
//     }
//     play(nnotes) {
//         this.nnote = 0; // current note
//     }
//     _playNextNote() {
//         if (this.nnote < this.nnotesToPlay) {
//             var note = this.notes[this.nnote];
//             this.callbackPlayNote(note, this.duration);
//         } 
//     }
// }

// var sequencer = new Sequencer();


class Simon {
    
    constructor(ui) {
        this.ui = ui;
        this.strict = false;
        this.state = stateOn;
    }
    
    start() {
        this.state = stateStart;
        // var squares = this._generateSquares(maxSquares);
        this.squares = [1,2,3,4];
        this.speed = 1.0;
        // this.noteLength = 250 / this.speed; // msec
        // this.pauseLength = 100 / this.speed; // msec
        // this.decayLength = 50; // msec
        this.nsquaresToPlay = 1; // current number of squares to play
        //. pause then call _playSquares
        this._playSquares(); // next state
    }
    
    hitSquare(square) {
        // if in getinput state, add to usersquares and return true, else return false
        console.log('user hit square', square);
        if (this.state == stateGetInput) {
            
            console.log('nsquare,squares.length,toplay', this.nsquare, this.squares.length, this.nsquaresToPlay);
            var squareShouldBe = this.squares[this.nsquare];
            console.log('should be', squareShouldBe);
            if (square===squareShouldBe) {
                this.nsquare++;
                if (this.nsquare>=this.squares.length) {
                    this._playWin();
                } else if (this.nsquare===this.nsquaresToPlay) {
                    console.log('done with sequence - increase speed and ntoplay');
                    this.speed *= 1.1; // increase speed
                    this.nsquaresToPlay++;
                    this._playSquares();
                } else {
                    // wait for next input
                }
            } else { // error
                this._playError();
            }
            return true;
            
        } else { // not in getinput state
            return false;
        }
    }
    
    toggleStrict() {
        this.strict = !this.strict;
    }
    
    // private methods
    // ----------------------------------------
    
    // generate a random sequence
    _generateSquares(nsquares) {
        var squares = [];
        for (var i=0; i < nsquares; i++) {
            squares[i] = Math.floor(Math.random() * 4) + 1;
        }
        return squares;
    }
    
    _playSquares() {
        this.state = statePlaySquares;
        console.log('playsquares', this.nsquaresToPlay, 'squares');
        this.ui.playSquares(this.squares, this.nsquaresToPlay);
        this.nsquare = 0;
        this.state = stateGetInput; // next state - wait for user input
    }
    
    _playError() {
        this.state = statePlayError;
        this.ui.playSquares([4,3,2,1,4,3,2,1,4,3,2,1]);
        if (this.strict) {
            this.start();
        } else {
            this._playSquares();
        }
    }
    
    _playWin() {
        this.state = statePlayWin;
        this.ui.playSquares([1,2,3,4,1,2,3,4,1,2,3,4]);
        this.start();
    }
    
}



module.exports = Simon;
