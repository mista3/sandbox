class Anim {
				constructor(obj, prop, goal, duration) {
								this.obj = obj;
								this.prop = prop;
								this.goal = goal;
								this.progress = 0;
								this.duration = duration;
								this.finished = true;
				}
				
				play() {
								this.finished = false;
								this.progress = 0;
				}
				
				step(delta) {
								if (this.finished) return;
								const change = this.goal * delta / this.duration;
								this.obj[this.prop] += change;
								this.progress += change;
								const diff = this.goal - this.progress;
								if (this.goal > 0 && diff <= 0 || this.goal < 0 && diff >= 0) {
												this.obj[this.prop] += diff;
												this.stop();
								}
				}
				
				stop() {
								this.finished = true;
				}
}

