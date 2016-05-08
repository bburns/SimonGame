
'use strict';


var Sequencer = require('../js/sequencer');


// mock objects

var synth = {};
synth.start = function(square) {console.log('synth start', square);};
synth.stop = function(square) {console.log('synth stop', square);};

var lights = {};
lights.start = function(square) {console.log('lights start', square);};
lights.stop = function(square) {console.log('lights stop', square);};


var sequencer = new Sequencer(synth, lights);

sequencer.load([1,2,3,4]);
sequencer.play();




