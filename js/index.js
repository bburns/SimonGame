

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var m_oscillator = null;

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

    // $color1 = $('#color1');
    // $color2 = $('#color2');
    // $color3 = $('#color3');
    // $color4 = $('#color4');

    // $color1.on('mousedown', function() {playSound(400);});
    // $color2.on('mousedown', function() {playSound(450);});
    // $color3.on('mousedown', function() {playSound(525);});
    // $color4.on('mousedown', function() {playSound(350);});
    
    // $color1.on('mouseup', function() {stopSound();});
    // $color2.on('mouseup', function() {stopSound();});
    // $color3.on('mouseup', function() {stopSound();});
    // $color4.on('mouseup', function() {stopSound();});
    
    // $color1.on('mouseout', function() {stopSound();});
    // $color2.on('mouseout', function() {stopSound();});
    // $color3.on('mouseout', function() {stopSound();});
    // $color4.on('mouseout', function() {stopSound();});

});
