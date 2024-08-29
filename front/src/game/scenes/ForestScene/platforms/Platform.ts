// Platform.ts
import { PlatformItem } from "./PlatformItem.ts";
import {ForestScene} from "../ForestScene.ts";
import {PLATFORMS_VELOCITY} from "../constants.ts";

export class Platform {
    private scene: ForestScene;
    public platform: Phaser.Physics.Arcade.Sprite;
    item: PlatformItem | null;

    constructor(scene: ForestScene, x: number, y: number, platformKey: string, item: PlatformItem) {
        this.scene = scene;
        this.platform = scene.physics.add.sprite(x, y, platformKey);
        this.platform.body?.setAllowGravity(false);
        this.platform.body?.setImmovable(true);

        scene.physics.add.existing(this.platform);
        // scene.physics.add.collider(scene.character, this.platform);

        this.item = item;
        scene.physics.add.overlap(scene.character, item.getSprite(), () => {
            console.log("in Platform overlap")
            item.handleCollision(scene.character);
        });
    }

    removeItem() {
        if (this.item) {
            this.item.destroy();
            this.item = null;
        }
    }

    private move(x: number) {
        this.platform.x += x;
    }
    update(delta: number): void {
        // Update the platform position if needed
        const moveAmount = PLATFORMS_VELOCITY / delta;
        this.move(-moveAmount);
        //
        this.item?.update(delta);
    }
}
