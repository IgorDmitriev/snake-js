const Coord = require('./coord.js');

class Snake {
  constructor(board) {
    this.gameOver = false;
    this.length = 1;
    this.direction = 'N';
    this.board = board;
    this.segments = [new Coord([5,5])];
  }

  move(interval) {
    let head = this.segments[0];
    this.segments.unshift(head.plus(this.direction));
    if (this.segments.length > this.length) {
      this.segments.pop();
    }

    // if head collide with any other segments OR head outside the board
    const headPos = this.segments[0].pos;
    const snakeTail = this.segments.slice(1);

    if (snakeTail.some(coord => (coord.pos[0] === headPos[0] && coord.pos[1] === headPos[1])) ||
       (!this.board.isValidPos(headPos))) {
      this.gameOver = true;
      throw "Game Over!";
    }

    if (headPos[0] === this.board.applePos[0] &&
        headPos[1] === this.board.applePos[1]) {
      this.length += 2;
      this.board.applePos = null;
    }
    // console.log(this.renderPositions());
  }

  renderPositions() {
    return this.segments.map(coord => coord.pos);
    // snakePositions.each();
  }

  turn(dir) {
    if (Coord.prototype.isOpposite(this.direction, dir)) {
      return;
    }
    else {
      this.direction = dir;
    }
  }
}



Snake.directions = ['N', 'S', 'E', 'W'];

module.exports = Snake;
