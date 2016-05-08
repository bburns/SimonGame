
// main app





// // play the given square (1-4) for duration msecs
// // if duration is null, will just start the square - call stopSound to stop it
// function playSquare(square=1, duration=250, startTime=0) {
//     lightSquare(square);
//     // var pitch = m_pitches[square-1];
//     // synth.play(pitch, duration, startTime, unlightSquare.bind(null, square));
//     synth.play(square, duration, startTime, unlightSquare.bind(null, square));
// }


class Ui {
    constructor(sequencer) {
        this.sequencer = sequencer;
    }
    playSquares(squares, ntoplay) {
        this.sequencer.load(squares);
        this.sequencer.play(ntoplay);
    }
    // playSquare(square) {
        // console.log('square',square);
    // }
}


// mock
var lights = {};
lights.start = function(square) {
    console.log('lights start', square);
    $square[square].addClass('lit');
};
lights.stop = function(square) {
    console.log('lights stop', square);
    $square[square].removeClass('lit');
};


var synth = new Synth();
// var lights = new Lights();
var sequencer = new Sequencer(synth, lights);
var ui = new Ui(sequencer);
var simon = new Simon(ui);


var $square = [];




var m_squareStarted = false;

function startSquare(square) {
    // returns true if ok for user to play a sound now
    // if (simon.hitSquare(square)) { 
        m_squareStarted = true;
        lights.start(square);
        synth.start(square);
    // }
}

function stopSquare(square) {
    if (m_squareStarted) { // need guard otherwise mouseout would trigger it a lot
        m_squareStarted = false;
        lights.stop(square);
        synth.stop(square);
        simon.hitSquare(square);
    }
}


$(document).ready(function() {

    // hook up ui events
    
    $('#start').on('click', function() {simon.start();});
    $('#strict').on('click', function() {simon.toggleStrict();});
    
    for (var i = 1; i<=4; i++) {
        var idname = '#color'+i;
        $square[i] = $(idname);
        $square[i].on('mousedown', startSquare.bind(null, i));
        $square[i].on('mouseup', stopSquare.bind(null, i));
        $square[i].on('mouseout', stopSquare.bind(null, i));
    }
    
});


