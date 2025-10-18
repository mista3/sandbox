class Fabric {
				constructor(x, y, width, height, globalBalls, restDist = 10) {
								this.balls = [];
								this.springs = [];
								for (let j = 0; j < height; j++) {
												for (let i = 0; i < width; i++) {	
																const ball = new Ball(x + restDist * i, y + restDist, 2);
																this.balls.push(ball);
																globalBalls.push(ball);
																if (i > 0) {
																				const leftIndex = getIndexFromCoords(i - 1, j, width);
																				this.springs.push(new Spring(this.balls[leftIndex], ball, restDist));
																}
																if (j > 0) {
																				const upIndex = getIndexFromCoords(i, j - 1, width);
																				this.springs.push(new Spring(this.balls[upIndex], ball, restDist));
																}
												}
								}
								this.width = width;
								this.height = height;
				}
				
				solve() {
								for (let spring of this.springs) {
												spring.solve();
								}
				}
				
				draw() {
								for (let i = 0; i < this.width; i++) {
												ctx.beginPath();
												const startIndex = getIndexFromCoords(i, 0, this.width);
												let prevBall = this.balls[startIndex];
												ctx.moveTo(prevBall.pos.x, prevBall.pos.y);
												for (let j = 1; j < this.height; j++) {	
																const index = getIndexFromCoords(i, j, this.width);
																const ball = this.balls[index];
								
																ctx.bezierCurveTo(
																				prevBall.pos.x,
																				prevBall.pos.y,
																				ball.pos.x,
																				ball.pos.y,
																				ball.pos.x + (prevBall.pos.x - ball.pos.x) * .5,
																				ball.pos.y + (prevBall.pos.y - ball.pos.y) * .5,
																);
																prevBall = ball;
												}
												ctx.strokeStyle = 'black';
												ctx.lineWidth = 4;
												ctx.stroke();
								}
								for (let j = 0; j < this.height; j++) {
												ctx.beginPath();
												const startIndex = getIndexFromCoords(0, j, this.width);
												let prevBall = this.balls[startIndex];
												ctx.moveTo(prevBall.pos.x, prevBall.pos.y);
												for (let i = 1; i < this.width; i++) {	
																const index = getIndexFromCoords(i, j, this.width);
																const ball = this.balls[index];
								
																ctx.bezierCurveTo(
																				prevBall.pos.x,
																				prevBall.pos.y,
																				ball.pos.x,
																				ball.pos.y,
																				ball.pos.x + (prevBall.pos.x - ball.pos.x) * .5,
																				ball.pos.y + (prevBall.pos.y - ball.pos.y) * .5,
																);
																prevBall = ball;
												}
												ctx.strokeStyle = 'black';
												ctx.lineWidth = 4;
												ctx.stroke();
								}
				}
}