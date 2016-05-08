

var m_pitches = [400,450,526,350];
var m_pitchLose = 300;
var m_pitchWin = 550;

var m_audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var m_oscillator = null;


function playSound(frequency=1000, duration=250, startTime=0, onEnd) {
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
    if (duration)
        m_oscillator.stop(m_audioCtx.currentTime + duration/1000); // needs seconds, not msecs
    m_oscillator.onend = onEnd;
}

function stopSound() {
    if (m_oscillator) {
        m_oscillator.stop();
        m_oscillator = null;
    }
}

function playNote(nnote, duration) {
    var pitch = m_pitches[nnote-1];
    playSound(pitch, duration);
}


// initialize the game - just registers callbacks
var m_game = new Game(playNote);


$(document).ready(function() {

    var $square = [];
    for (var i = 1; i<=4; i++) {
        var idname = '#color'+i;
        $square[i] = $(idname);
        $square[i].on('mousedown', playNote.bind(null, i));
        $square[i].on('mouseup', stopSound);
        $square[i].on('mouseout', stopSound);
    }
    
    $('#start').on('click', function() {m_game.start();});
    $('#strict').on('click', function() {m_game.toggleStrict();});
    
    
});


