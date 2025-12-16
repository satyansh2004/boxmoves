import { init, Sprite, GameLoop, initKeys, keyPressed } from 'kontra';

let { canvas } = init('game');
let scorecard = document.getElementById("yourscore");
let score = 0;
initKeys();

let player = Sprite({
    x: 50,
    y: 50,
    width: 10,
    height: 10,
    color: 'red',
    dx: 6,
    dy: 6,
    
    update() {
        this.x += this.dx;

        if (this.x <= 0) {
            this.x = 0;
            this.dx = Math.abs(this.dx);
        }
        if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width;
            this.dx = -Math.abs(this.dx);
        }

        if (keyPressed ('arrowleft')) {
            this.dx = -Math.abs(this.dx);
            
        } 
        if (keyPressed ('arrowright')) {
            this.dx = Math.abs(this.dx);
        }
        if (keyPressed ('arrowup')) {
            this.y -= this.dy;
            if (this.y <= 0 || this.y + this.height >= canvas.height) {
                this.y = canvas.height - this.height;
            }
        } else if (keyPressed('arrowdown')) {
            this.y += this.dy;
            if (this.y <= 0 || this.y + this.height >= canvas.height) {
                this.y = this.height;
            }
        }
    },

    render() {
        this.draw();
    }
});

let target = Sprite({ 
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    height: 3,
    width: 3,
    radius: 5,
    color: 'black',

    update() {
        if (
            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y
        ) {
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
            score++;
        }
    },

    render() {
        this.draw()
    }
})

GameLoop({
    update() {
        player.update();
        target.update()
        scorecard.innerHTML = `Your Score: ${score}`;

    },
    render() {
        player.render();
        target.render();
    }
}).start();
