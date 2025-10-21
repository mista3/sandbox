class Ball {
    constructor(x, y, radius, mass = 1, bounciness = .6, fixed = false, invisible = false) {
        this.pos = new Vec(x, y);
        this.lastPos = new Vec(x, y);
        this.radius = radius;
        this.mass = mass;
        this.bounciness = bounciness;
        this.force = new Vec();
        this.fixed = fixed;
        this.invisible = invisible;
    }
    
    applyForce(vec) {
        if (this.fixed) return;
        this.force.add(vec);
    }
    
    update(delta) {
        if (this.fixed) return;
        let velX = this.pos.x - this.lastPos.x;
        let velY = this.pos.y - this.lastPos.y;
        
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
        
        let accX = this.force.x / this.mass;
        let accY = this.force.y / this.mass;
        
        if (width > 0) {
            if (this.pos.x - this.radius < 0) {
                this.pos.x = this.radius;
                velX *= this.bounciness;
            } else if (this.pos.x + this.radius > canvas.width) {
                this.pos.x = canvas.width - this.radius;
                velX *= this.bounciness;
            }
        }
        if (height > 0) {
            if (this.pos.y - this.radius < 0) {
                this.pos.y = this.radius;
                velY *= this.bounciness;
            } else if (this.pos.y + this.radius > canvas.height) {
                this.pos.y = canvas.height - this.radius;
                velY *= this.bounciness;
            }
        }
        
        this.pos.x += velX + accX * delta;
        this.pos.y += velY + accY * delta;
        
        this.force.x = 0;
        this.force.y = 0;
    }
    
    draw() {
        if (this.invisible) return;
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, TWO_PI);
        ctx.fill();
    }
    
    fix() {
        this.fixed = true;
    }
    
    unfix() {
        this.fixed = false;
    }
}