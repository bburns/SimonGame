

var m_pitches = [400,450,526,350];
var m_pitchLose = 300;
var m_pitchWin = 550;

var m_audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var m_oscillator = null;



// function startSound(frequency=1000, duration=250, startTime=0) {
function startSound(frequency=1000) {
    m_oscillator = m_audioCtx.createOscillator();
    m_oscillator.type = 'sine';
    m_oscillator.frequency.value = frequency; // Hz
    m_oscillator.connect(m_audioCtx.destination);
    // var gainNode = m_audioCtx.createGain();
    // oscillator.connect(gainNode);
    // gainNode.connect(m_audioCtx.destination);
    // const startVolume = 0.2;
    // const endVolume = 0.001;
    // gainNode.gain.setValueAtTime(startVolume, m_audioCtx.currentTime);
    // gainNode.gain.exponentialRampToValueAtTime(endVolume, m_audioCtx.currentTime + duration/1000); // secs
    m_oscillator.start();
    // if (onEnd) {
        // m_oscillator.onend = onEnd;
    // }
}

function stopSound() {
    console.log('stopsound');
    if (m_oscillator) {
        //. ramp down
        m_oscillator.stop();
        if (m_oscillator.onend)
            m_oscillator.onend();
        m_oscillator = null;
    }
}

// start and stop a sound
// function playSound(frequency=1000, duration=250, startTime=0, onEnd) {
function playSound(frequency=1000, duration=250, onEnd) {
// function playSound(frequency=1000, duration=250) {
    // startSound(frequency, duration, startTime, onEnd);
    // startSound(frequency, duration, onEnd);
console.log('playsound');    
    startSound(frequency);
    var stopTime = m_audioCtx.currentTime + (duration / 1000); // needs seconds, not msecs
    m_oscillator.stop(stopTime);
    if (onEnd) {
        m_oscillator.onend = onEnd;
    }
}


function lightNote(note) {
    console.log('light note',note);
    $square[note].addClass('lit');
}
function unlightNote(note) {
    console.log('unlight note',note);
    $square[note].removeClass('lit');
}


// play the given note for duration msecs
// if duration is null, will just start the note - call stopSound to stop it
function playNote(note, duration) {
    // returns true if ok for user to play a sound now
    if (m_game.userHitNote(note)) { 
        lightNote(note);
        var pitch = m_pitches[note-1];
        playSound(pitch, duration, unlightNote.bind(null, note));
        // playSound(pitch, duration);
    }
}


// initialize the game - just registers callbacks
var m_game = new Game(playNote);

var $square = [];

$(document).ready(function() {

    for (var i = 1; i<=4; i++) {
        var idname = '#color'+i;
        $square[i] = $(idname);
        $square[i].on('mousedown', playNote.bind(null, i, null));
        $square[i].on('mouseup', stopSound);
        $square[i].on('mouseout', stopSound);
    }
    
    $('#start').on('click', function() {m_game.start();});
    $('#strict').on('click', function() {m_game.toggleStrict();});
    
});


