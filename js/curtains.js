const curtainRest = 30;
const curtainWidth = Math.ceil((width * .5 + 100) / curtainRest);
const curtainHeight = Math.ceil((height + 100) / curtainRest);

const fabricLeft = new Fabric(
    -50, 
    -50, 
    curtainWidth, 
    curtainHeight, 
    balls, 
    curtainRest, 
    1, 
    false, 
    '#421725',
);
const fabricRight = new Fabric(
    width * .5 - 50, 
    -50, 
    curtainWidth, 
    curtainHeight, 
    balls, 
    curtainRest, 
    1, 
    false, 
    '#421725',
);

fabrics.push(fabricRight, fabricLeft);

for (let i = 1; i < curtainWidth; i++) {
    if (i % 3 === 0 || i === curtainWidth - 1) {
        const ball = fabricLeft.balls[i];
        ball.fix();
        const anim = new Anim(ball.pos, 'x', (ball.pos.x - fabricLeft.pos.x) * -.7, 2);
        anims.push(anim);
        curtainAnims.push(anim);
    }
}
fabricLeft.balls[0].fix();

for (let i = 0; i < curtainWidth - 1; i++) {
    if (i % 3 === 0) {
        const ball = fabricRight.balls[i];
        ball.fix();
        const anim = new Anim(ball.pos, 'x', (ball.pos.x - fabricRight.pos.x - curtainWidth * curtainRest) * -.7, 2);
        anims.push(anim);
        curtainAnims.push(anim);
    }
}
fabricRight.balls[curtainWidth - 1].fix();