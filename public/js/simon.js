'use strict';

// constants
const maxSquares = 10; // win game if reach this many squares
const pauseBetweenRounds = 500; // msec between rounds
const noteLength = 250; // initial note length, msec
const gapLength = 50; // initial gap between notes, msec
const speedIncrease = 1.1; // speed multiplier between rounds
const errorSequence = [1];
const errorLength = 1000; // note length for error sequence
const winSequence = [1,2,3,4,1,2,3,4,1,2,3,4];
const winLength = 100; // note length for win sequence


// game states
const stateOff = 0;
const stateOn = 1;
const stateStart = 2;
const statePlaySquares = 3;
const stateGetInput = 4;
const statePlayError = 5;
const statePlayWin = 6;


class Simon {
    
    constructor(ui) {
        this.ui = ui;
        this.strict = false;
        this.state = stateOn;
        this.ui.setScore('--');
    }

    // initial state
    on() {
        this.state = stateOn;
        this.ui.setScore('--');
        // wait for user to hit start
    }
    
    // game has started
    // called from ui
    start() {
        this.state = stateStart;
        this.squares = this._generateSquares(maxSquares);
        this.speed = 1.0;
        // this.decayLength = 50; // msec
        this.nsquaresToPlay = 1; // current number of squares to play
        setTimeout(this._playSquares.bind(this), pauseBetweenRounds); // next state
    }
    
    // user hit a square
    // called from ui
    hitSquare(square) {
        // if not in getinput state return false
        if (this.state !== stateGetInput) return false;
        
        // see if hit right square
        var squareShouldBe = this.squares[this.nsquare];
        if (square===squareShouldBe) {
            this.nsquare++;
            if (this.nsquare>=this.squares.length) { // won game
                setTimeout(this._playWin.bind(this), pauseBetweenRounds);
            } else if (this.nsquare===this.nsquaresToPlay) { // finished the sequence
                this.ui.setScore(this.nsquaresToPlay + '/' + maxSquares);
                this.speed *= speedIncrease; // increase speed
                this.nsquaresToPlay++; // increase sequence length
                setTimeout(this._playSquares.bind(this), pauseBetweenRounds);
            } else {
                // just wait for next input
            }
        } else { // error - play the error sequence
            setTimeout(this._playError.bind(this), pauseBetweenRounds);
        }
        return true;
    }
    
    // toggle strict mode
    // called from ui
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
    
    // play the sequence of squares
    _playSquares() {
        this.state = statePlaySquares;
        this.ui.setScore(this.nsquaresToPlay-1 + '/' + maxSquares);
        var length = noteLength / this.speed;
        var gap = gapLength / this.speed;
        this.ui.playSquares(this.squares, this.nsquaresToPlay, length, gap, function() {
            this.nsquare = 0;
            this.state = stateGetInput; // next state - wait for user input
        }.bind(this));
    }
    
    // play the error sequence
    _playError() {
        this.state = statePlayError;
        this.ui.playSquares(errorSequence, null, errorLength, 1, function() {
            if (this.strict) {
                // start a new game if in strict mode
                setTimeout(this.start.bind(this), pauseBetweenRounds);
            } else {
                // play sequence again if not strict
                setTimeout(this._playSquares.bind(this), pauseBetweenRounds);
            }
        }.bind(this));
    }
    
    // play the win sequence
    _playWin() {
        this.state = statePlayWin;
        this.ui.setScore(maxSquares + '/' + maxSquares);
        this.ui.playSquares(winSequence, null, winLength, 1, function() {
            setTimeout(this.on.bind(this), pauseBetweenRounds);
        }.bind(this));
    }
    
}


// for testing
if (module) 
    module.exports = Simon;
