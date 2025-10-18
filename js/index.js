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
const rope = [];

for (let i = 0; i < 20; i++) {
    const ball = new Ball(10 + 10 * i, 100, 2);
    balls.push(ball);
    rope.push(ball);
}

balls.push(new Ball(300, 100, 8));

const springs = [];
for (let i = 1; i < rope.length; i++) {
    springs.push(new Spring(rope[i - 1], rope[i], 10));
}

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
    
    for (let spring of springs) {
        spring.solve();
    }
    
    for (let ball of balls) {
        ball.draw();
    }
    
    ctx.beginPath();
    ctx.moveTo(rope[0].pos.x, rope[0].pos.y);
    
    for (let i = 1; i < rope.length; i++) {
        const ball = rope[i];
        const prevBall = rope[i - 1];
        ctx.bezierCurveTo(
        				prevBall.pos.x, 
        				prevBall.pos.y, 
        				ball.pos.x, 
        				ball.pos.y, 
        				ball.pos.x + (prevBall.pos.x - ball.pos.x) * .5, 
        				ball.pos.y + (prevBall.pos.y - ball.pos.y) * .5,
        );
    }
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    setTimeout(loop, 16.6);
}
loop();



balls[0].fix();

const lastBall = rope.at(-1);

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