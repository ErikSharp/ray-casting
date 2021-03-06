import p5, { Vector } from "p5";
import { Boundary } from "./boundary";

export class Ray {
    pos: p5.Vector;
    dir: p5.Vector;

    constructor(private p: p5, pos: Vector, angle: number) {
        this.pos = pos;
        this.dir = Vector.fromAngle(angle);
    }

    cast(wall: Boundary) {
        //the wall coords
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        //the ray coords
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        let theyAreParallel = denominator === 0;

        if (theyAreParallel) {
            return;
        }

        const tNumerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);

        const t = tNumerator / denominator;

        const uNumerator = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3));

        const u = uNumerator / denominator;

        if (t > 0 && t < 1 && u > 0) {
            const pt = this.p.createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            return;
        }
    }

    lookAt(x: number, y: number) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    draw() {
        this.p.stroke(20);
        this.p.push();
        this.p.translate(this.pos.x, this.pos.y);
        this.p.line(0, 0, this.dir.x * 10000, this.dir.y * 10000);
        this.p.pop();
    }
}
