class Point {
    x; 
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Point(this.x + v.x, this.y + v.y);
    }

    scale(a) {
        return new Point(a * this.x, a * this.y);
    }

    subtract(v) {
        return new Point(this.x - v.x, this.y - v.y);
    }
}