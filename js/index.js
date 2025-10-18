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

balls.push(new Ball(200, 100, 8));

const fabric = new Fabric(300, 100, 10, 10, balls);

fabric.balls[0].fix();
fabric.balls[9].fix();

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
    fabric.solve();
    
    for (let ball of balls) {
        ball.draw();
    }
    
    rope.draw();
    fabric.draw();
    
    setTimeout(loop, 16.6);
}
loop();



rope.balls[0].fix();

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