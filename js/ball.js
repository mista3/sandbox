class Ball {
    constructor(x, y, radius, mass = 1, bounciness = .8) {
        this.pos = new Vec(x, y);
        this.lastPos = new Vec(x, y);
        this.radius = radius;
        this.mass = mass;
        this.bounciness = bounciness;
        this.force = new Vec();
    }
    
    applyForce(vec) {
        this.force.add(vec);
    }
    
    update(delta) {
        let velX = this.pos.x - this.lastPos.x;
        let velY = this.pos.y - this.lastPos.y;
        
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
        
        let accX = this.force.x / this.mass;
        let accY = this.force.y / this.mass;
        
        if (this.pos.x - this.radius < 0) {
            this.pos.x = this.radius;
            velX *= this.bounciness;
        } else if (this.pos.x + this.radius > width) {
            this.pos.x = width - this.radius;
            velX *= this.bounciness;
        }
        if (this.pos.y - this.radius < 0) {
            this.pos.y = this.radius;
            velY *= this.bounciness;
        } else if (this.pos.y + this.radius > height) {
            this.pos.y = height - this.radius;
            velY *= this.bounciness;
        }
        
        this.pos.x = this.pos.x + velX + accX * delta;
        this.pos.y = this.pos.y + velY + accY * delta;
        
        this.force.x = 0;
        this.force.y = 0;
    }
    
    draw() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, TWO_PI);
        ctx.fill();
    }
}
