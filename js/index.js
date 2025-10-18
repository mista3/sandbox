canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
})

const gravity = new Vec(0, 9.8);

const balls = [];
const rope = new Rope();

for (let i = 0; i < 20; i++) {
    const ball = new Ball(10 + 10 * i, 100, 2);
    balls.push(ball);
    rope.addBall(ball);
}

balls.push(new Ball(300, 100, 8));

let lastFrameTime = Date.now();
const loop = () => {
    const now = Date.now();
    const delta = (now - lastFrameTime) * .001;
    lastFrameTime = now;
    
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, width, height);
    
    for (let ball of balls) {
        ball.applyForce(gravity);
        ball.update(delta);
    }
    
    rope.solve();
    
    for (let ball of balls) {
        ball.draw();
    }
    
    rope.draw();
    
    setTimeout(loop, 16.6);
}
loop();



balls[0].fix();

const lastBall = rope.balls.at(-1);

window.addEventListener('touchstart', (ev) => {
    lastBall.fix();
})

window.addEventListener('touchmove', (ev) => {
    const touch = ev.touches[0];
    
    lastBall.lastPos.x = lastBall.pos.x;
    lastBall.lastPos.y = lastBall.pos.y;
    
    lastBall.pos.x = touch.pageX;
    lastBall.pos.y = touch.pageY;
})

window.addEventListener('touchend', (ev) => {
    lastBall.unfix();
})