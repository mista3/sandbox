canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
})

const gravity = new Vec(0, 9.8);

const button = document.querySelector('button');

const balls = [];
const fabrics = [];
const anims = [];
const curtainAnims = [];

balls.push(new Ball(200, 100, 8));

const rope = new Fabric(10, 310, 1, 20, balls, 10, 4, true);
const fabricRight = new Fabric(210, 100, 20, 20, balls, 10, 1, true, '#421725');
const fabricLeft = new Fabric(10, 100, 20, 20, balls, 10, 1, true, '#421725');
const basket = new Fabric(100, 400, 6, 8, balls, 20, 1, true);

rope.balls[0].fix();
fabrics.push(rope, fabricRight, fabricLeft, basket);

for (let i = 5; i > 0; i--) {
    const index = Math.max(i * 4 - 1, 0);
    const ball = fabricLeft.balls[index];
    ball.fix();
    const anim = new Anim(ball.pos, 'x', -200 + 50 - (5 - i) * 10 + (19 - index) * 10, 2);
    anims.push(anim);
    curtainAnims.push(anim);
}
fabricLeft.balls[0].fix();

for (let i = 0; i < 5; i++) {
    const index = Math.max(i * 4 - 1, 0);
    const ball = fabricRight.balls[index];
    ball.fix();
    const anim = new Anim(ball.pos, 'x', 200 - index * 10 - 50 + i * 10, 2);
    anims.push(anim);
    curtainAnims.push(anim);
}
fabricRight.balls[19].fix();

basket.balls[0].fix();
basket.balls[5].fix();

let loopTimeout;
let lastFrameTime = Date.now();

const loop = () => {
    const now = Date.now();
    const delta = (now - lastFrameTime) * .001;
    lastFrameTime = now;
    
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, width, height);
    
    for (let anim of anims) {
    				anim.step(delta);
    }
    
    for (let ball of balls) {
        ball.applyForce(gravity);
        ball.update(delta);
    }
    
    for (let i = 0; i < 4; i++) {
        for (let fabric of fabrics) {
            fabric.solve();
        }
    }
    
    for (let ball of balls) {
        ball.draw();
    }
    
    for (let fabric of fabrics) {
        fabric.draw();
    }
    
    loopTimeout = setTimeout(loop, 16.6);
}

loop();

let heldBall = null;
let keepFixed = false;

const grabStart = (x, y) => {
    let minDist = 50;
    let closest = null;
    for (let ball of balls) {
        const dist = Math.abs(ball.pos.x - x) + Math.abs(ball.pos.y - y);
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
}

const grabMove = (x, y) => {
    if (!heldBall) return;
    
    heldBall.lastPos.x = heldBall.pos.x;
    heldBall.lastPos.y = heldBall.pos.y;
    
    heldBall.pos.x = x;
    heldBall.pos.y = y;
}

const grabEnd = () => {
    if (!heldBall) return;
    if (keepFixed) keepFixed = false;
    else heldBall.unfix();
    heldBall = null;
}

button.onclick = () => {
    for(let anim of curtainAnims) {
        anim.play();
    }
    button.onclick = () => null;
}

window.addEventListener('touchstart', (ev) => {
    if (heldBall) {
        keepFixed = !keepFixed;
        return;
    }
    const touch = ev.touches[0];
    grabStart(touch.pageX, touch.pageY);
})

window.addEventListener('touchmove', (ev) => {
    const touch = ev.touches[0];
    grabMove(touch.pageX, touch.pageY);
})

window.addEventListener('touchend', grabEnd);

window.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) grabStart(ev.x, ev.y);
    else if (heldBall && ev.button === 2) {
        keepFixed = !keepFixed;
    }
})

window.addEventListener('mousemove', (ev) => {
    grabMove(ev.x, ev.y);
})

window.addEventListener('mouseup', grabEnd);

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
