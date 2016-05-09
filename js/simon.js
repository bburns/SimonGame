'use strict';

// constants
const maxSquares = 10; // win game if reach this many squares
const pauseBetweenRounds = 500; // msec between rounds
const noteLength = 250; // initial note length, msec
const gapLength = 50; // initial gap between notes, msec
const speedIncrease = 1.1; // speed multiplier between rounds
const errorSequence = [4,3,2,1,4,3,2,1,4,3,2,1];
const winSequence = [1,2,3,4,1,2,3,4,1,2,3,4];


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

    on() {
        this.state = stateOn;
        this.ui.setScore('--');
        // wait for user to hit start
    }
    
    // public
    start() {
        this.state = stateStart;
        this.squares = this._generateSquares(maxSquares);
        console.log(this.squares);
        this.pause = pauseBetweenRounds; // msec between rounds
        this.speed = 1.0;
        this.speedIncrease = speedIncrease; // speed multiplier
        this.noteLength = noteLength; // msec
        this.gapLength = gapLength; // msec
        // this.decayLength = 50; // msec
        this.nsquaresToPlay = 1; // current number of squares to play
        setTimeout(this._playSquares.bind(this), this.pause); // next state
    }
    
    // public
    // this is called from the ui when user hits a square
    hitSquare(square) {
        // if in getinput state, add to usersquares and return true, else return false
        // console.log('user hit square', square);
        if (this.state !== stateGetInput) return false;
        
        // console.log('nsquare,squares.length,toplay', this.nsquare, this.squares.length, this.nsquaresToPlay);
        var squareShouldBe = this.squares[this.nsquare];
        // console.log('should be', squareShouldBe);
        if (square===squareShouldBe) {
            this.nsquare++;
            if (this.nsquare>=this.squares.length) { // won game
                setTimeout(this._playWin.bind(this), this.pause);
            } else if (this.nsquare===this.nsquaresToPlay) { // finished sequence
                // console.log('done with sequence - increase speed and ntoplay');
                // this.speed *= 1.1; // increase speed
                this.speed *= this.speedIncrease; // increase speed
                this.nsquaresToPlay++;
                setTimeout(this._playSquares.bind(this), this.pause);
            } else {
                // just wait for next input
            }
        } else { // error
            setTimeout(this._playError.bind(this), this.pause);
        }
        return true;
    }
    
    // public
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
        this.ui.setScore(this.nsquaresToPlay + '/' + maxSquares);
        var length = this.noteLength / this.speed;
        var gap = this.gapLength / this.speed;
        this.ui.playSquares(this.squares, this.nsquaresToPlay, length, gap, function() {
            this.nsquare = 0;
            this.state = stateGetInput; // next state - wait for user input
        }.bind(this));
    }
    
    _playError() {
        this.state = statePlayError;
        // this.ui.playSquares([4,3,2,1,4,3,2,1,4,3,2,1], null, 50, 0, function() {
        this.ui.playSquares(this.errorSequence, null, 50, 0, function() {
            if (this.strict) {
                setTimeout(this.on.bind(this), this.pause);
            } else {
                setTimeout(this._playSquares.bind(this), this.pause);
            }
        }.bind(this));
    }
    
    _playWin() {
        this.state = statePlayWin;
        this.ui.playSquares(this.winSequence, null, 50, 0, function() {
            setTimeout(this.on.bind(this), this.pause);
        }.bind(this));
    }
    
}


// for testing
if (module) 
    module.exports = Simon;
