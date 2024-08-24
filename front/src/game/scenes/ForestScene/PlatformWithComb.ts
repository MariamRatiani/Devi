import {ForestScene} from "./ForestScene.ts";
import {PLATFORMS_VELOCITY} from "./constants.ts";

export class PlatformWithComb {
    platform: Phaser.Physics.Arcade.Sprite;
    comb: Phaser.Physics.Arcade.Sprite;
    private scene: ForestScene;

    constructor(scene: ForestScene, x: number, y: number, platformKey: string, combKey: string, combOffsetY: number) {
        this.scene = scene
        this.platform = scene.physics.add.sprite(x, y, platformKey);
        this.platform.body.setAllowGravity(false);
        this.platform.body.setImmovable(true);
        this.platform.body.setSize(this.platform.width, this.platform.height);

        const combX = x;
        const combY = y - 50 - combOffsetY;
        this.comb = scene.physics.add.sprite(combX, combY, combKey);
        this.comb.setScale(0.04);
        this.comb.body.setAllowGravity(false);
        this.comb.body.setImmovable(true);

        scene.add.existing(this.platform);
        scene.add.existing(this.comb);

        this.scene.physics.add.overlap(this.scene.character, this.comb, this.collectComb, null, this);
    }

    public move(x: number) {
        this.platform.x += x;
        this.comb.x += x;
    }

    public setVelocityX(velocityX: number) {
        this.platform.body.setVelocityX(velocityX);
        this.comb.body.setVelocityX(velocityX);
    }

    private collectComb(character: Phaser.Physics.Arcade.Sprite, comb: Phaser.Physics.Arcade.Sprite) {
        comb.setVisible(false); // Make the comb invisible
        comb.body.enable = false; // Disable the comb's physics body
        // this.scene.rewardCount += 1;
        this.scene.rewardText.incrementRewardCount();

    }

    public update(delta: number) {
        const moveAmount = PLATFORMS_VELOCITY / delta;
        this.move(-moveAmount);
    }
}
