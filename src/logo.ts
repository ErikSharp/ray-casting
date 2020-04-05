import p5 from "p5";
import { Drawable } from "./drawable";
import { Environment } from "./environment";

export class Logo implements Drawable {
    constructor(private p: p5, private env: Environment) {}

    draw() {
        this.p.push();
        this.p.scale(5);
        this.p.stroke(this.env.color1);
        this.p.strokeWeight(3);
        this.p.fill(this.env.color2);
        this.p.beginShape();
        this.p.vertex(10, 5);
        this.p.vertex(15, 10);
        this.p.vertex(10, 15);
        this.p.vertex(5, 10);
        this.p.endShape(this.p.CLOSE);
        this.p.pop();
    }
}
