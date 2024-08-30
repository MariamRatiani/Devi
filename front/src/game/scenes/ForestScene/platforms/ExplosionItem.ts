import { PlatformItem } from "./PlatformItem.ts";
import {ForestScene} from "../ForestScene.ts";

export class ExplosionItem extends PlatformItem {
    private forestScene: ForestScene;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'explosion_frame_1');
        this.sprite.setData('triggered', false);
        const explosionScale = 0.3;
        this.forestScene = scene as ForestScene
        this.sprite.setScale(explosionScale, explosionScale);
        this.sprite.body?.setAllowGravity(false);
        this.sprite.body?.setImmovable(true);

        this.sprite.setScale(explosionScale);
        this.sprite.body?.setSize(this.sprite.width * explosionScale, this.sprite.height * explosionScale);
    }

    handleCollision(player: Phaser.Physics.Arcade.Sprite): void {
        // This method should trigger the explosion animation
        if (!this.sprite.getData('triggered')) {
            this.forestScene.audioManager.playExplosion()

            this.sprite.setData('triggered', true);
            this.sprite.play('explosionAnim'); // Play explosion animation
            this.sprite.on('animationcomplete', () => {

                this.sprite.setVisible(false);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.sprite.body.enable = false;
            });

            this.forestScene.characterManager.makeCharacterTwinkle();
            this.forestScene.handleCharacterDamage()
            this.scene.events.emit('playerDamaged'); // Emit event for player damage
        }
    }

    updatePosition(moveAmount: number) {
        
        if(this.forestScene.characterIsMovingForward) {
            this.sprite.x += moveAmount;
        }else if(this.forestScene.characterIsMovingBackward){
            this.sprite.x -= moveAmount;

        }
    }

    getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite;
    }
}
