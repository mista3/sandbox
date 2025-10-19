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

fabric.balls[0].fix();
fabric.balls[9].fix();

let heldBall = null;
let keepFixed = false;

window.addEventListener('touchstart', (ev) => {
    if (heldBall) {
        heldBall.fixed = !keepFixed;
        keepFixed = !keepFixed;
        return;
    }
    const touch = ev.touches[0];
    let minDist = 50;
    let closest = null;
    for (let ball of balls) {
        const dist = Math.abs(ball.pos.x - touch.pageX) + Math.abs(ball.pos.y - touch.pageY);
        if (dist < minDist) {
            minDist = dist;
            closest = ball;
        }
    }
    if (closest) {
        heldBall = closest;
        if (heldBall.fixed) keepFixed = true;
        else heldBall.fix();
    }
})

window.addEventListener('touchmove', (ev) => {
    if (!heldBall) return;
    const touch = ev.touches[0];
    
    heldBall.lastPos.x = heldBall.pos.x;
    heldBall.lastPos.y = heldBall.pos.y;
    
    heldBall.pos.x = touch.pageX;
    heldBall.pos.y = touch.pageY;
})

window.addEventListener('touchend', (ev) => {
    if (!heldBall) return;
    if (keepFixed) keepFixed = false;
    else heldBall.unfix();
    heldBall = null
})