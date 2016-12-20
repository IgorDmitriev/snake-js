const Board = require('./board.js');

class View {
  constructor(renderEl) {
    this.dirs = {
      "37": "W",
      "38": "N",
      "39": "E",
      "40": "S"
    };

    this.board = new Board(10);
    this.snake = this.board.snake;
    this.$el = renderEl;
    $(window).keydown((key) => {
      this.snake.turn(this.dirs[key.keyCode]);
      console.log(this.snake.direction);
    });
    const snakeMove = window.setInterval(this.snake.move.bind(this.snake), 200);
    const appleInterval = window.setInterval(this.board.applePosition.bind(this.board), 200);
    const renderInterval = window.setInterval(this.render.bind(this, this.$el), 200);
    // this.board.applePosition();
    const checkInterval = window.setInterval(() => {
      if (this.snake.gameOver) {
        clearInterval(snakeMove);
        clearInterval(renderInterval);
        clearInterval(appleInterval);
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

    this.snake.renderPositions().forEach(pos => {
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
