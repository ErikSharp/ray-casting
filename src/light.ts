import p5, { Vector } from "p5";
import { Drawable } from "./drawable";
import { Updatable } from "./updatable";
import { Ray } from "./ray";
import { Boundary } from "./boundary";

export class Light implements Updatable, Drawable {
    pos: Vector;
    rays: Ray[];

    constructor(private p: p5, private walls: Boundary[]) {
        this.pos = p.createVector(p.width / 2, p.height / 2);
        this.rays = [];

        for (let i = 0; i < 360; i += 2) {
            this.rays.push(new Ray(p, this.pos, p.radians(i)));
        }
    }

    update() {
        this.pos.set(this.p.mouseX, this.p.mouseY);
    }

    draw() {
        this.p.fill(255);
        this.p.ellipse(this.pos.x, this.pos.y, 16);

        this.rays.forEach((ray) => {
            let closest: Vector = null;
            let minDistance = Infinity;
            this.walls.forEach((wall) => {
                let pt = ray.cast(wall);
                if (pt) {
                    let dist = Vector.dist(this.pos, pt);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closest = pt;
                    }
                }
            });

            if (closest) {
                this.p.fill(255);
                this.p.stroke(200);
                this.p.line(this.pos.x, this.pos.y, closest.x, closest.y);
                this.p.ellipse(closest.x, closest.y, 4);
            } else {
                ray.draw();
            }
        });
    }
}
