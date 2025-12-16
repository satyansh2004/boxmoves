import { init, Sprite, GameLoop, initKeys, keyPressed } from 'kontra';

let { canvas } = init('game');
let scorecard = document.getElementById("yourscore");
let score = 24;
initKeys();

let player = Sprite({
    x: 50,
    y: 50,
    width: 10,
    height: 10,
    color: 'red',
    dx: 2,
    dy: 2,

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

        if (keyPressed('arrowleft')) {
            this.dx = -Math.abs(this.dx);

        }
        if (keyPressed('arrowright')) {
            this.dx = Math.abs(this.dx);
        }

        if (this.y <= 0) {
            this.y = 0;
            this.dy = Math.abs(this.dy);
        }
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.dy = -Math.abs(this.dy);
        }
        if (keyPressed('arrowup')) {
            this.y += this.dy;
            this.dy = -Math.abs(this.dy);
        }
        if (keyPressed('arrowdown')) {
            this.y += this.dy;
            this.dy = Math.abs(this.dy);
        }
    },

    render() {
        this.draw();
    }
});

let target = Sprite({
    x: Math.round(Math.random() * canvas.width),
    y: Math.round(Math.random() * canvas.height),
    height: 5,
    width: 5,
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

            if (player.dy < 0) {
                player.dy *= -1;
            }

            if (player.dx < 0) {
                player.dx *= -1;
            }

            if (score % 25 == 0) {
                player.dx += 1;
                player.dy += 1;
            }
            
        }
    },

    render() {
        this.draw()
    }
})

let bonusTarget = Sprite({
    x: Math.random() * canvas.width - player.width,
    y: Math.random() * canvas.height - player.height,
    height: 20,
    width: 20,
    radius: 5,
    color: 'blue',
    update() {
        if (
            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y
        ) {
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
            score += 3;
        }
    },

    render() {
        this.draw()
    }
});

GameLoop({
    update() {
        player.update();
        target.update();
        if (score % 10 === 0 && score !== 0) {
            bonusTarget.update();
        }
        scorecard.innerHTML = `Your Score: ${score}`;

    },
    render() {
        player.render();
        target.render();
        if (score % 10 === 0 && score !== 0) {
            bonusTarget.render();
        }
    }
}).start();
