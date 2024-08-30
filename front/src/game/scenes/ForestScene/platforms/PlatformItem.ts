// PlatformItem.ts
import {PLATFORMS_VELOCITY} from "../constants.ts";
import {ForestScene} from "../ForestScene";

export abstract class PlatformItem {
    protected scene: ForestScene ; 
    protected sprite: Phaser.Physics.Arcade.Sprite;
    protected forestScene: ForestScene

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        this.scene = scene as ForestScene;
        this.sprite = this.scene.physics.add.sprite(x, y, texture);
        this.sprite.body?.setAllowGravity(false);
        this.sprite.body?.setImmovable(true);
    }

    abstract handleCollision(player: Phaser.Physics.Arcade.Sprite): void;

    update(delta: number): void {
        const moveAmount = PLATFORMS_VELOCITY / delta;
        if(this.scene.characterIsMovingForward){
            this.sprite.x -= moveAmount;
        }else if(this.scene.characterIsMovingBackward) {
            this.sprite.x += moveAmount;
        }
        
    }

    getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite;
    }

    destroy(): void {
        this.sprite.destroy();
    }
}
