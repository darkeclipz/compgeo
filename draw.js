class Draw {

    flip = false;

    style = {
        pointSize: 5,
        pointColor: 'black',
        pointFill: true,
        backgroundColor: 'white'
    }

    constructor(canvasId, fullScreen = true, width = 400, height = 300) {
        this.canvasId = canvasId;
        this.fullScreen = fullScreen;
        this.width = width;
        this.height = height;
        this.init();
    }

    init() {
        this.canvas = document.getElementById(this.canvasId);

        if(this.fullScreen) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        else {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
        
        this.ctx = this.canvas.getContext('2d');
    }

    drawPoint(p) {
        if(this.style.pointFill) {
            this.ctx.fillStyle = this.style.pointColor;
        }
        this.ctx.beginPath();
        if(this.flip) {
            this.ctx.arc(p.x, this.canvas.height - p.y, this.style.pointSize, 0, 2*Math.PI);
        }
        else {
            this.ctx.arc(p.x, p.y, this.style.pointSize, 0, 2*Math.PI);
        }
        this.ctx.stroke();
        if(this.style.pointFill) {
            this.ctx.fill();
        }
    }

    drawLine(p1, p2) {
        this.ctx.beginPath();
        if(this.flip) {
            this.ctx.moveTo(p1.x, this.canvas.height - p1.y);
            this.ctx.lineTo(p2.x, this.canvas.height - p2.y);
        }
        else {
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
        }
        
        this.ctx.stroke();
    }

    drawLineSegment(seg)  {
        this.drawLine(seg.p1, seg.p2);
        this.drawPoint(seg.p1);
        this.drawPoint(seg.p2);
    }

    drawText(text, p) {
        this.ctx.textAlign = "center";
        this.ctx.font = "10px Roboto";
        if(this.flip) {
            this.ctx.fillText(text, p.x, this.canvas.height - p.y);
        }
        else {
            this.ctx.fillText(text, p.x, p.y);
        }
    }

    clear() {
        this.ctx.fillStyle = this.style.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}