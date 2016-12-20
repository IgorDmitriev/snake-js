const Snake = require('./snake.js');
const Coord = require('./coord.js');

class Board {
  constructor(size) {
    this.apple = null;
    this.snake = new Snake(this);
    this.size = size;
    this.grid = Array(size).fill().map(() => Array(size));
    this.applePos = null;
  }

  isValidPos(pos) {
    const [row, col] = pos;
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
      return false;
    }
    return true;
  }

  applePosition() {
    console.log(this.snake.renderPositions());
    if (this.applePos) return;

    let pos = [Math.round(Math.random()*this.size),
               Math.round(Math.random()*this.size)];
    if (this.snake.renderPositions().some(snakePos => {
      return (snakePos[0] === pos[0]) && (snakePos[1] === pos[1]);
      })) {
      this.applePosition();
    }
    else {
      this.applePos = pos;
    }
  }

}
module.exports = Board;
