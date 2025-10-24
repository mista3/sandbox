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