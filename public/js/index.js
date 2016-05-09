
// main app


// the user interface needs only one method, to play a sequence of squares
class Ui {
    constructor(sequencer) {
        this.sequencer = sequencer;
    }
    playSquares(squares, ntoplay, duration, gap, next) {
        this.sequencer.load(squares);
        this.sequencer.play(ntoplay, duration, gap, next);
    }
    setScore(score) {
        $('#score').text(score);
    }
}


// lights interface
var $square = [];
var lights = {};
lights.start = function(square) {
    // console.log('lights start', square);
    $square[square].addClass('lit');
};
lights.stop = function(square) {
    // console.log('lights stop', square);
    $square[square].removeClass('lit');
};


// mousedown and up handlers
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


var synth = new Synth();
var sequencer = new Sequencer(synth, lights);
var ui = new Ui(sequencer);
var simon = new Simon(ui);


// hook up ui events
$(document).ready(function() {

    $('#start').on('click', function() {simon.start();});
    $('#strict').on('click', function() {simon.toggleStrict();});
    $('#strict').prop('checked', false);
    
    for (var i = 1; i<=4; i++) {
        var idname = '#color'+i;
        $square[i] = $(idname);
        $square[i].on('mousedown', startSquare.bind(null, i));
        $square[i].on('mouseup', stopSquare.bind(null, i));
        $square[i].on('mouseout', stopSquare.bind(null, i));
    }
    
});


