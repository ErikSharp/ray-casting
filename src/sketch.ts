import p5 from "p5";
import { Drawable } from "./drawable";
import { Updatable } from "./updatable";
import { Boundary } from "./boundary";
import { Light } from "./light";

export class Sketch implements Drawable, Updatable {
    updatables: Updatable[] = [];
    drawables: Drawable[] = [];

    constructor(private p: p5) {
        p.createCanvas(innerWidth * 0.8, innerHeight * 0.8);

        let walls: Boundary[] = [];
        for (let i = 0; i < 5; i++) {
            let wall = new Boundary(
                p,
                p.random(p.width),
                p.random(p.height),
                p.random(p.width),
                p.random(p.height)
            );
            walls.push(wall);
            this.drawables.push(wall);
        }

        let light = new Light(p, walls);
        this.updatables.push(light);
        this.drawables.push(light);
    }

    update() {
        this.updatables.forEach((u) => u.update());
    }

    draw() {
        this.p.background(0);
        this.drawables.forEach((u) => u.draw());
    }
}
