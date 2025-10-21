class Fabric {
				constructor(x, y, width, height, globalBalls, restDist = 10, thickness = 2, outlined = false, color = 'black', tearDist = 100) {
								this.balls = [];
								this.springs = [];
								this.thickness = thickness;
								
								const ballRadius = thickness * .5;
								for (let j = 0; j < height; j++) {
												for (let i = 0; i < width; i++) {	
																const ball = new Ball(x + restDist * i, y + restDist * j, ballRadius, 1, .6, false);
																this.balls.push(ball);
																globalBalls.push(ball);
																if (i > 0) {
																				const leftIndex = getIndexFromCoords(i - 1, j, width);
																				this.springs.push(new Spring(this.balls[leftIndex], ball, restDist, tearDist));
																}
																if (j > 0) {
																				const upIndex = getIndexFromCoords(i, j - 1, width);
																				this.springs.push(new Spring(this.balls[upIndex], ball, restDist, tearDist));
																}
												}
								}
								this.width = width;
								this.height = height;
								this.color = color;
								this.outlined = outlined;
				}
				
				solve() {
								for (let i = 0; i < this.springs.length; i++) {
												const spring = this.springs[i];
												if (spring) {
																const torn = spring.solve();
																if (torn) {
																				this.springs[i] = null;
																}
												}
								}
				}
				
				drawSegment(i, j, prevBall) {
								const index = getIndexFromCoords(i, j, this.width);
								const ball = this.balls[index];
								ctx.lineTo(ball.pos.x, ball.pos.y);
								return ball;
				}
				
				draw() {
								if (this.outlined) this.stroke();
								else this.fill();
				}
				
				stroke() {
								for (let spring of this.springs) {
												if (spring) {
																ctx.beginPath();
																ctx.moveTo(spring.a.pos.x, spring.a.pos.y);
																ctx.lineTo(spring.b.pos.x, spring.b.pos.y);
																ctx.strokeStyle = this.color;
																ctx.lineWidth = this.thickness;
																ctx.stroke();
												}
								}
				}
				
				fill() {
								for (let i = 1; i < this.width; i++) {
												for (let j = 1; j < this.height; j++) {
																const ball = this.balls[getIndexFromCoords(i, j, this.width)];
																const leftBall = this.balls[getIndexFromCoords(i - 1, j, this.width)];
																const leftUpBall = this.balls[getIndexFromCoords(i - 1, j - 1, this.width)];
																const upBall = this.balls[getIndexFromCoords(i, j - 1, this.width)];
																
																ctx.beginPath();
																ctx.moveTo(ball.pos.x, ball.pos.y);
																ctx.lineTo(leftBall.pos.x, leftBall.pos.y);
																ctx.lineTo(leftUpBall.pos.x, leftUpBall.pos.y);
																ctx.lineTo(upBall.pos.x, upBall.pos.y);
																ctx.strokeStyle = this.color;
																ctx.lineWidth = 1;
																ctx.fillStyle = this.color;
																ctx.closePath();
																
																ctx.fill();
																ctx.stroke();
												}
								}
				}
}