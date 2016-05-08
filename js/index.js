

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var m_oscillator = null;

var m_strict = false;



function playSound(frequency=1000, duration=500, startTime=0, onEnd) {
    // var oscillator = audioCtx.createOscillator();
    m_oscillator = audioCtx.createOscillator();
    m_oscillator.type = 'sine';
    m_oscillator.frequency.value = frequency; // Hz
    m_oscillator.connect(audioCtx.destination);
    
    // var gainNode = audioCtx.createGain();
    // oscillator.connect(gainNode);
    // gainNode.connect(audioCtx.destination);
    // const startVolume = 0.2;
    // const endVolume = 0.001;
    // gainNode.gain.setValueAtTime(startVolume, audioCtx.currentTime);
    // gainNode.gain.exponentialRampToValueAtTime(endVolume, audioCtx.currentTime + duration/1000); // secs
    
    m_oscillator.start();
    // oscillator.stop(duration/1000); // secs
    // return oscillator;
    m_oscillator.onend = onEnd;
}

function stopSound() {
    m_oscillator.stop();
}

var m_pitches = [400,450,526,350];
var m_pitchLose = 300;
var m_pitchWin = 550;

$(document).ready(function() {

    var $square = [];
    for (var i = 1; i<=4; i++) {
        var idname = '#color'+i;
        var pitch = m_pitches[i-1];
        $square[i] = $(idname);
        $square[i].on('mousedown', playSound.bind(null, pitch));
        $square[i].on('mouseup', stopSound);
        $square[i].on('mouseout', stopSound);
    }

    
    // $('#strict').on('click', function() {alert('pokpok');});
    $('#strict').on('click', function() {m_strict = !m_strict;});

    
});
