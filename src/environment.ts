import p5, { Color } from "p5";
import { Updatable } from "./updatable";

export class Environment implements Updatable {
    constructor(private p: p5) {}
    color1 = this.p.color("red");
    color2 = this.p.color("blue");
    from: Color = this.p.color("red");
    to: Color = this.p.color("blue");

    xoffset = 0;

    update(): void {
        this.xoffset += 0.01;

        this.color1 = this.p.lerpColor(
            this.from,
            this.to,
            this.p.noise(this.xoffset)
        );

        this.color2 = this.p.lerpColor(
            this.from,
            this.to,
            this.p.noise(this.xoffset + 5000)
        );
    }
}
