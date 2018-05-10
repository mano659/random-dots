var canvas = document.getElementById('main-canvas');
var c = canvas.getContext('2d');

var width = window.innerWidth - 10;
var height = window.innerHeight - 10;

canvas.width = width;
canvas.height = height;

var mouse = {
    x: undefined,
    y: undefined
};

var colorArray = [
    '#FF6B35',
    '#F7C59F',
    '#004E89',
    '#F3FFBD',
    '#FF1654'
];

window.addEventListener('mousemove', function (event) {
    "use strict";
    mouse.x = event.x;
    mouse.y = event.y;
});

function Circle(x, y, dx, dy, radius) {
    "use strict";
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = 50;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        // c.clearRect(0, 0, width, height);
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    };

    this.update = function () {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.dx = -(this.dx);
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.dy = -(this.dy);
        }
        this.x += this.dx;
        this.y += this.dy;

        //Interaction
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < this.maxRadius) {
                this.radius = this.radius + 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius = this.radius - 1;
        }

        this.draw();
    };
}

var circleArray = [];

function createCircles(count) {
    "use strict";
    var x, y, dx, dy, radius = 60, i;
    for (i = 0; i < count; i++) {
        x = (Math.random() * (width - (2 * radius))) + radius;
        y = (Math.random() * (height - (2 * radius))) + radius;
        dx = Math.random() - 0.5;
        dy = Math.random() - 0.5;
        radius = Math.random() * 5 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

createCircles(900);

function animate() {
    "use strict";
    var j;
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);
    for (j = 0; j < circleArray.length; j++) {
        circleArray[j].update();
    }
}

animate();
