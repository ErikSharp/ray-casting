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
        this.p.colorMode(this.p.HSB);

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
                const colorStartDist = this.p.width * 0.4;
                let maxHueDist = this.p.constrain(
                    minDistance,
                    10,
                    colorStartDist
                );
                let hue = this.p.map(maxHueDist, 10, colorStartDist, 0, 230);

                this.p.push();
                this.p.fill(hue, 255, 255);
                this.p.noStroke();
                let ellipseSize = this.p.min((1 / minDistance) * 400, 7);
                this.p.ellipse(closest.x, closest.y, ellipseSize);
                this.p.pop();

                this.p.stroke(hue, 255, 255);
                this.p.line(this.pos.x, this.pos.y, closest.x, closest.y);
            } else {
                ray.draw();
            }
        });
    }
}
