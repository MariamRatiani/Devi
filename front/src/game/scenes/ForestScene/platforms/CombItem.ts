// CombItem.ts
import { PlatformItem } from "./PlatformItem.ts";

export class CombItem extends PlatformItem {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'comb');
        this.sprite.setScale(0.04);
    }

    handleCollision(player: Phaser.Physics.Arcade.Sprite): void {
        // Handle comb collection
        this.sprite.setVisible(false);
        this.sprite.body.enable = false;
        this.scene.events.emit('combCollected');
    }
}
