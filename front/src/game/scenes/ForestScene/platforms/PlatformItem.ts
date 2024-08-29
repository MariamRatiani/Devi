// PlatformItem.ts
import {PLATFORMS_VELOCITY} from "../constants.ts";

export abstract class PlatformItem {
    protected scene: Phaser.Scene;
    protected sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, texture);
        this.sprite.body?.setAllowGravity(false);
        this.sprite.body?.setImmovable(true);
    }

    abstract handleCollision(player: Phaser.Physics.Arcade.Sprite): void;

    update(delta: number): void {
        const moveAmount = PLATFORMS_VELOCITY / delta;
        this.sprite.x -= moveAmount;
    }

    getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite;
    }

    destroy(): void {
        this.sprite.destroy();
    }
}
