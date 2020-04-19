import p5, { Vector } from "p5";
import { Updatable } from "./updatable";
import { Drawable } from "./drawable";

export class Boundary implements Updatable, Drawable {
    private static Offsets = 0;
    private xOffset = 0;
    private updateOffset = 0;
    a: Vector;
    b: Vector;

    constructor(private p: p5) {
        this.a = p.createVector();
        this.b = p.createVector();
        Boundary.Offsets += 20;
        this.xOffset = Boundary.Offsets;
        this.setPoints();
    }

    private setPoints() {
        this.a.set(
            this.spreadOutNoise(
                this.p.noise(this.xOffset + this.updateOffset + 100)
            ) * this.p.width,
            this.spreadOutNoise(
                this.p.noise(this.xOffset + this.updateOffset + 200)
            ) * this.p.height
        );

        this.b.set(
            this.spreadOutNoise(
                this.p.noise(this.xOffset + this.updateOffset + 300)
            ) * this.p.width,
            this.spreadOutNoise(
                this.p.noise(this.xOffset + this.updateOffset + 400)
            ) * this.p.height
        );
    }

    spreadOutNoise(input: number) {
        const amount = 0.3;
        const distFromCenter = this.p.abs(input - 0.5);
        const distNormalized = this.p.map(distFromCenter, 0, 0.5, 0, 1);
        const adjustment = amount * distNormalized;

        let result = 0;
        if (input > 0.5) {
            result = input + adjustment;
        } else {
            result = input - adjustment;
        }

        return result;
    }

    update() {
        this.updateOffset += 0.0005;
        this.setPoints();
    }

    draw() {
        this.p.stroke(255);
        this.p.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}
