canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

let loopTimeout;
let lastFrameTime = Date.now();

const fabricWidth = Math.ceil(width * .033);
const fabric = new Fabric(
    fabricWidth * 10, 
    fabricWidth * 10, 
    fabricWidth, 
    fabricWidth, 
    balls, 
    10, 
    1, 
    true,
);
fabric.balls[0].fix();
fabric.balls[fabricWidth - 1].fix();

fabrics.push(fabric);

const loop = () => {
    const now = Date.now();
    const delta = (now - lastFrameTime) * .001;
    lastFrameTime = now;
    
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, width, height);
    
    for (let anim of anims) anim.step(delta);
    
    for (let ball of balls) {
        ball.applyForce(gravity);
        ball.update(delta);
    }
    
    for (let fabric of fabrics) {
        for (let i = 0; i < 4; i++) fabric.solve();
        fabric.draw();
    }
    
    for (let ball of balls) ball.draw();
    
    loopTimeout = setTimeout(loop, 16.6);
}

loop();

//for (const anim of curtainAnims) anim.play();

window.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState == "visible") {
        lastFrameTime = Date.now();
        if (loopTimeout) clearTimeout(loopTimeout);
        loop();
    } else {
        if (loopTimeout) clearTimeout(loopTimeout);
    }
});
