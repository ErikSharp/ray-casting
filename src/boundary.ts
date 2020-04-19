import p5, { Vector } from "p5";
import { Drawable } from "./drawable";

export class Boundary implements Drawable {
    a: Vector;
    b: Vector;

    constructor(private p: p5, x1: number, y1: number, x2: number, y2: number) {
        this.a = p.createVector(x1, y1);
        this.b = p.createVector(x2, y2);
    }

    draw() {
        this.p.stroke(255);
        this.p.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}
