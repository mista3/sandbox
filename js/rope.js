class Rope {
				constructor() {
								this.balls = [];
								this.springs = [];
				}
				
				addBall(ball) {
								if (this.balls.length > 0) {
												this.springs.push(new Spring(this.balls.at(-1), ball, 10))
								}
								this.balls.push(ball);
				}
				
				solve() {
								for (let spring of this.springs) {
												spring.solve();
								}
				}
				
				draw() {
								ctx.beginPath();
								ctx.moveTo(this.balls[0].pos.x, this.balls[0].pos.y);
								
								for (let i = 1; i < this.balls.length; i++) {
												const ball = this.balls[i];
												const prevBall = this.balls[i - 1];
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
				}
}

