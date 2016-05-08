


var m_noteStarted = false;

function lightNote(note) {
    console.log('light note',note);
    $square[note].addClass('lit');
}
function unlightNote(note) {
    console.log('unlight note',note);
    $square[note].removeClass('lit');
}

function startNote(note) {
    // returns true if ok for user to play a sound now
    if (m_game.userHitNote(note)) { 
        m_noteStarted = true;
        lightNote(note);
        // var pitch = m_pitches[note-1];
        // m_synth.start(pitch);
        m_synth.start(note);
    }
}

function stopNote(note) {
    if (m_noteStarted) {
        m_noteStarted = false;
        unlightNote(note);
        m_synth.stop();
    }
}

// play the given note (1-4) for duration msecs
// if duration is null, will just start the note - call stopSound to stop it
function playNote(note=1, duration=250, startTime=0) {
    lightNote(note);
    // var pitch = m_pitches[note-1];
    // m_synth.play(pitch, duration, startTime, unlightNote.bind(null, note));
    m_synth.play(note, duration, startTime, unlightNote.bind(null, note));
}


// initialize the game, register callbacks
var m_game = new Game(playNote);
var m_synth = new Synth();

var $square = [];

$(document).ready(function() {

    for (var i = 1; i<=4; i++) {
        var idname = '#color'+i;
        $square[i] = $(idname);
        $square[i].on('mousedown', startNote.bind(null, i));
        $square[i].on('mouseup', stopNote.bind(null, i));
        $square[i].on('mouseout', stopNote.bind(null, i));
    }
    
    $('#start').on('click', function() {m_game.start();});
    $('#strict').on('click', function() {m_game.toggleStrict();});
    
});


