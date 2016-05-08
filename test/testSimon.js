
// run with node to test simon backend

'use strict';


var Simon = require('../js/simon');


class Ui {
    playSquare(square) {
        console.log('square',square);
    }
    playSquares(squares, ntoplay) {
        if (!ntoplay) ntoplay = squares.length;
        // for (var square of squares) {
            // this.playSquare(square);
        // }
        for (var i=0; i<ntoplay; i++) {
            var square = squares[i];
            this.playSquare(square);
        }
    }
}



var ui = new Ui();
var simon = new Simon(ui);

simon.start(); // will make random sequence, call playSquares

simon.hitSquare(1); // will add to user sequence, check if ok, error, or won, transition state, play next sequence, error, or won

simon.hitSquare(1);
simon.hitSquare(2);

simon.hitSquare(1);
simon.hitSquare(2);
simon.hitSquare(4); // wrong - so should show error sequence



