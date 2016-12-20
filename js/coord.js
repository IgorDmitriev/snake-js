class Coord {
  constructor(pos) {
    this.pos = pos;
    this.dirs = {
      'N': [-1, 0],
      'E': [0, 1],
      'S': [1, 0],
      'W': [0, -1]
    };
  }

  plus (dir) {
    let [row, col] = this.pos;
    const [dr, dc] = this.dirs[dir];

    return new Coord([row + dr, col + dc]);
  }

  equals (coord2) {
    // if (this.coord == coord2)
  }

  isOpposite (curDir, newDir) {
    if((curDir === 'W' && newDir === 'E') ||
       (curDir === 'E' && newDir === 'W') ||
       (curDir === 'N' && newDir === 'S') ||
       (curDir === 'S' && newDir === 'N')) {
      return true;
    }
    else {
      return false;
    }
  }

}

module.exports = Coord;
