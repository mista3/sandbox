class Spring {
				constructor(a, b, restDist, tearDist) {
								this.a = a;
								this.b = b;
								this.restDist = restDist;
								this.tearDist = tearDist;
								this.destroyed = false;
				}
				
				solve() {
								if (this.a.fixed && this.b.fixed) return;
								const diffX = this.a.pos.x - this.b.pos.x;
								const diffY = this.a.pos.y - this.b.pos.y;
								
								const dist = Math.sqrt(diffX * diffX + diffY * diffY);
								
								if (dist > this.tearDist) {
												return true;
								}
								
								const stretch = (this.restDist - dist) / dist;
								
								let translateX = diffX * stretch;
								let translateY = diffY * stretch;
												
								if (this.a.fixed) {
												this.b.pos.x -= translateX;
												this.b.pos.y -= translateY;
								} else if (this.b.fixed) {
												this.a.pos.x += translateX;
												this.a.pos.y += translateY;
								} else {
												translateX *= .5;
												translateY *= .5;
								
												this.a.pos.x += translateX;
												this.a.pos.y += translateY;
								
												this.b.pos.x -= translateX;
												this.b.pos.y -= translateY;
								}
				}
}