class Monitor {
    constructor(pos, width, height) {
        this.pos = new Vec(pos.x, pos.y);
        this.width = width;
        this.height = height;
        this.on = false;
    }
    
    turnOn() {
        this.on = true;
    }
    
    turnOff() {
        this.on = false;
    }
}