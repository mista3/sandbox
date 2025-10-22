class Fabric {
				constructor(x, y, width, height, globalBalls, restDist = 10, thickness = 2, outlined = true, color = 'black', tearDist = 100) {
								this.balls = [];
								this.springs = [];
								this.width = width;
								this.height = height;
								this.thickness = thickness;
								this.outlined = outlined;
								this.color = color;
								
								const ballRadius = thickness * .5;
								
								this.springQuadMap = new Map();
								
								let ballIndex = 0;
								
								for (let j = 0; j < height; j++) {
												for (let i = 0; i < width; i++) {	
																const ball = new Ball(x + restDist * i, y + restDist * j, ballRadius, 1, .6, false);
																this.balls.push(ball);
																globalBalls.push(ball);
																if (i > 0) {
																				const leftBall = this.balls[getIndexFromCoords(i - 1, j, width)];
																				const spring = new Spring(leftBall, ball, restDist, tearDist);
																				this.springs.push(spring);
																				const quads = [];
																				if (j > 0) quads.push(ballIndex);
																				if (j < height - 1) quads.push(ballIndex + width);
																				this.springQuadMap.set(spring, quads);
																}
																if (j > 0) {
																				const upBall = this.balls[getIndexFromCoords(i, j - 1, width)];
																				const spring = new Spring(upBall, ball, restDist, tearDist);
																				this.springs.push(spring);
																				const quads = [];
																				if (i > 0) quads.push(ballIndex);
																				if (i < width - 1) quads.push(ballIndex + 1);
																				this.springQuadMap.set(spring, quads);
																}
																
																ballIndex++;
												}
								}
								
								this.quadMap = new Map();
								
								for (let i = 1; i < width; i++) {
												for (let j = 1; j < height; j++) {
																const quadIndex = getIndexFromCoords(i, j, this.width);
																const br = this.balls[quadIndex];
																const bl = this.balls[getIndexFromCoords(i - 1, j, this.width)];
																const tl = this.balls[getIndexFromCoords(i - 1, j - 1, this.width)];
																const tr = this.balls[getIndexFromCoords(i, j - 1, this.width)];
																
																this.quadMap.set(quadIndex, { tl, tr, br, bl });
												}
								}
				}
				
				solve() {
								for (let i = 0; i < this.springs.length; i++) {
												const spring = this.springs[i];
												if (spring) {
																const torn = spring.solve();
																if (torn) {
																				for (const quad of this.springQuadMap.get(spring)) {
																							this.quadMap.delete(quad);
																				};
																				this.springQuadMap.delete(spring);
																				
																				this.springs[i] = null;
																}
												}
								}
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
								for (const entry of this.quadMap) {
												const quad = entry[1];
												ctx.beginPath();
												ctx.moveTo(quad.tl.pos.x, quad.tl.pos.y);
												ctx.lineTo(quad.tr.pos.x, quad.tr.pos.y);
												ctx.lineTo(quad.br.pos.x, quad.br.pos.y);
												ctx.lineTo(quad.bl.pos.x, quad.bl.pos.y);
												ctx.strokeStyle = this.color;
												ctx.lineWidth = 1;
												ctx.fillStyle = this.color;
												ctx.closePath();
																
												ctx.fill();
												ctx.stroke();
								}
				}
}