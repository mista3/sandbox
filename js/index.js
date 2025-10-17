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
for (let i = 0; i < 1; i++) {
    balls.push(new Ball(100, 100, 5));
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
        ball.draw();
    }
    
    setTimeout(loop, 16.6);
}
loop();


window.addEventListener('click', (ev) => {
    balls[0].pos.x += (ev.x - balls[0].pos.x) / 10;
    balls[0].pos.y += (ev.y - balls[0].pos.y) / 10;
})