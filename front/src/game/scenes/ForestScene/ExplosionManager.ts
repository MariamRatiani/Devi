import { ForestScene } from "./ForestScene.ts";
import { PLATFORMS_VELOCITY } from "./constants.ts";

export class ExplosionManager {
    scene: ForestScene;
    explosions: Phaser.Physics.Arcade.Sprite[] = [];

    constructor(scene: ForestScene) {
        this.scene = scene;
    }

    createAnimations() {
        // Define the explosion animation
        this.scene.anims.create({
            key: 'explosionAnim',
            frames: [
                { key: 'explosion_frame_1' },
                { key: 'explosion_frame_2' },
                { key: 'explosion_frame_3' },
                { key: 'explosion_frame_4' },
                { key: 'explosion_frame_5' },
                { key: 'explosion_frame_6' },
                { key: 'explosion_frame_7' },
                { key: 'explosion_frame_8' }
            ],
            frameRate: 10, // Adjust for speed of animation
            repeat: 0 // Play once
        });
    }

    createExplosion(x: number, y: number) {
        const explosionSprite = this.scene.physics.add.staticSprite(x, y, 'explosion_frame_1');
        explosionSprite.setVisible(false); // Hide until triggered
        this.explosions.push(explosionSprite);

        // Add collision detection
        this.scene.physics.add.overlap(this.scene.character, explosionSprite, () => {
            this.triggerExplosion(explosionSprite);
        });
    }

    triggerExplosion(explosionSprite: Phaser.Physics.Arcade.Sprite) {
        explosionSprite.setVisible(true);
        explosionSprite.play('explosionAnim');
        explosionSprite.on('animationcomplete', () => {
            explosionSprite.setVisible(false); // Hide after animation completes
            // Optionally, destroy the sprite if it should only explode once
            // explosionSprite.destroy();
        });

        // Apply damage or other effects to the character
        this.scene.handleCharacterDamage();
    }

    updateExplosionsPosition(delta: number) {
        if (this.scene.characterIsMoving) {
            const moveAmount = PLATFORMS_VELOCITY / delta;
            this.explosions.forEach(explosion => {
                explosion.x -= moveAmount;
            });
        }
    }

    public createExplosions() {
        this.createExplosion(490, this.scene.cameras.main.height - 130); // Add an explosion on the ground at (490, 130)
        // You can add more explosions if needed
    }
}
