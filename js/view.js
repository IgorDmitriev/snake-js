const Board = require('./board.js');
const Hammer = require('./hammer.min.js');

class View {
  constructor(renderEl) {
    this.dirs = {
      "37": "W",
      "38": "N",
      "39": "E",
      "40": "S"
    };

    this.swipes = {
      "2": "W",
      "4": "E",
      "8": "N",
      "16": "S"
    };

    this.board = new Board(10);
    this.snake = this.board.snake;
    this.$el = renderEl;

    const hammertime = new Hammer($(window)[0]);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    // mobile swipes
    hammertime.on('swipe', (ev) => {
      console.log(ev.direction);
      const dir = this.swipes[ev.direction];
      if (dir) this.snake.turn(dir);
    });

    // keyboard arrows
    $(window).keydown((key) => {
      const dir = this.dirs[key.keyCode];
      if (dir) this.snake.turn(dir);
      console.log(this.snake.direction);
    });
    const snakeMove = window.setInterval(this.snake.move.bind(this.snake), 200);
    const renderInterval = window.setInterval(this.render.bind(this, this.$el), 200);
    this.board.applePosition();

    const checkInterval = window.setInterval(() => {
      if (this.snake.gameOver) {
        clearInterval(snakeMove);
        clearInterval(renderInterval);
        clearInterval(checkInterval);
        this.$el.prepend('<h1>Game Over</h1>');
      }
    }, 500);
  }

  render($el) {
    $('ul').remove();
    for (let row = 0; row < this.board.size; row++) {
      let $ul = $('<ul></ul>');
      $ul.attr('data-idx', row);
      for (let col = 0; col < this.board.size; col++) {
        let $li = $('<li></li>');
        $li.attr('data-idx', col);
        $ul.append($li);
      }
      $el.append($ul);
    }
    const snakePositions = this.snake.renderPositions();
    const [headRow, headCol] = snakePositions[0];
    $($($('ul')[headRow].childNodes)[headCol]).addClass(`head-${this.snake.direction}`);

    snakePositions.slice(1).forEach(pos => {
      const [row, col] = pos;
      $($($('ul')[row].childNodes)[col]).addClass('snake');
    });

    if (this.board.applePos){
      const [row_a, col_a] = this.board.applePos;
      $($($('ul')[row_a].childNodes)[col_a]).addClass('apple');
    }

  }



}

module.exports = View;
