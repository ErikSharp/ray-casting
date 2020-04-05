import p5 from "p5";
import { Drawable } from "./drawable";
import { Updatable } from "./updatable";
import { BouncyBox } from "./bouncyBox";
import { Logo } from "./logo";
import { Environment } from "./environment";

export class Sketch implements Drawable, Updatable {
    updatables: Updatable[] = [];
    drawables: Drawable[] = [];

    constructor(private p: p5) {
        p.createCanvas(innerWidth * 0.8, innerHeight * 0.8);

        let env = new Environment(p);
        //the environment only updates
        this.updatables.push(env);

        //the logo only draws
        //the order of the drawables is their z-index
        this.drawables.push(new Logo(p, env));

        for (let index = 0; index < 10; index++) {
            let box = new BouncyBox(p);
            //a BouncyBox should update and draw
            this.updatables.push(box);
            this.drawables.push(box);
        }
    }

    update() {
        this.updatables.forEach((u) => u.update());
    }

    draw() {
        this.p.background(0);
        this.drawables.forEach((d) => d.draw());
    }
}
