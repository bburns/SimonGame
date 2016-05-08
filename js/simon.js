

// const maxnotes = 20; // win game if reach this many notes
const maxNotes = 4; // win game if reach this many notes
// var userNotes = []; // user-input sequence

// game states
// const stateOff = 0;
const stateOn = 1;
const stateStart = 2;
const statePlayNotes = 3;
const stateGetInput = 4;
const statePlayNote = 5;
const statePlayError = 6;
const statePlayWin = 7;

var m_state = stateOn;


function lightSquare(square) {
}

function unlightSquare(square) {
}

function playNote(note, noteLength, startTime) {
    // highlight the square
    lightSquare();
    // play the sound
    // playSound();
}

function playNotes(notes, nnotes, noteLength, pauseLength) {
    for (var i=0; i < nnotes; i++) {
        playNote(notes[i], noteLength, i * noteLength);
    }
}

// generate a random sequence
function generateNotes(nnotes) {
    var notes = [];
    for (var i=0; i < nnotes; i++) {
        notes[i] = Math.floor(Math.random() * 4) + 1;
    }
    return notes;
}

function playGame() {
    var notes = generateNotes(maxNotes);
    var userNotes = []; // clear user sequence
    var nnotes = 1; // current number of notes to play
    var speed = 1.0;
    var noteLength = 250 / speed; // msec
    var pauseLength = 50 / speed; // msec
    var won = true;
    for (nnotes = 1; nnotes <= maxNotes; nnotes++) {
        // play a round
        playNotes(notes, nnotes, noteLength, pauseLength);
        var currentNote = notes[nnotes-1];
        // wait for input
        if (getInput(currentNote)) {
            // increase speed
            speed *= 1.1;
        } else {
            won=false;
            break;
        }
    }
    if (won) {
        alert('you won!');
        // play the sequence really fast a few times
    }
}


function getInput() {

}

// onclick add note to userNotes




