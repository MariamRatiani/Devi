// import { ForestScene } from "./ForestScene.ts";
// import { PLATFORMS_VELOCITY } from "./constants.ts";
//
// export class ExplosionManager {
//     scene: ForestScene;
//     explosions: Phaser.Physics.Arcade.Sprite[] = [];
//
//     constructor(scene: ForestScene) {
//         this.scene = scene;
//     }
//
//     createAnimations() {
//         // Define the explosion animation
//         this.scene.anims.create({
//             key: 'explosionAnim',
//             frames: [
//                 { key: 'explosion_frame_1' },
//                 { key: 'explosion_frame_2' },
//                 { key: 'explosion_frame_3' },
//                 { key: 'explosion_frame_4' },
//                 { key: 'explosion_frame_5' },
//                 { key: 'explosion_frame_6' },
//                 { key: 'explosion_frame_7' },
//                 { key: 'explosion_frame_8' }
//             ],
//             frameRate: 10, // Adjust for speed of animation
//             repeat: 0 // Play once
//         });
//     }
//
//     createExplosion(x: number, y: number) {
//         const explosionSprite = this.scene.physics.add.sprite(x, y, 'explosion_frame_1');
//         // explosionSprite.setVisible(false); // Hide until triggered
//         explosionSprite.body?.setAllowGravity(false);
//         explosionSprite.body?.setImmovable(true);
//
//         const explosionScale = 0.5
//         explosionSprite.setScale(explosionScale, explosionScale)
//
//         const width = explosionSprite.width * explosionScale;
//         const height = explosionSprite.height * explosionScale;
//         explosionSprite.body.setSize(width, height)
//
//         explosionSprite.setData('triggered', false); // Flag to check if triggered
//         this.explosions.push(explosionSprite);
//
//         // Add collision detection
//         this.scene.physics.add.overlap(this.scene.character, explosionSprite, this.handleOverlap, null, this);
//     }
//
//     handleOverlap(character: Phaser.Physics.Arcade.Sprite, explosionSprite: Phaser.Physics.Arcade.Sprite) {
//         // Check if the explosion has already been triggered
//         if (!explosionSprite.getData('triggered')) {
//             this.triggerExplosion(explosionSprite);
//             explosionSprite.setData('triggered', true); // Set as triggered
//         }
//     }
//
//     triggerExplosion(explosionSprite: Phaser.Physics.Arcade.Sprite) {
//         explosionSprite.setVisible(true);
//         explosionSprite.play('explosionAnim');
//         explosionSprite.on('animationcomplete', () => {
//             explosionSprite.setVisible(false); // Hide after animation completes
//             explosionSprite.body.enable = false; // Disable physics body to prevent further triggers
//             // Optionally, destroy the sprite if it should only explode once
//             // explosionSprite.destroy();
//         });
//
//         // Apply damage or other effects to the character
//         this.scene.handleCharacterDamage();
//     }
//
//     updateExplosionsPosition(delta: number) {
//         if (this.scene.characterIsMoving) {
//             const moveAmount = PLATFORMS_VELOCITY / delta;
//             this.explosions.forEach(explosion => {
//                 explosion.x -= moveAmount;
//             });
//         }
//     }
//
//     public createExplosions() {
//         this.createExplosion(890, this.scene.cameras.main.height - 160); // Add an explosion on the ground
//         // You can add more explosions if needed
//     }
// }

import { ForestScene } from "./ForestScene.ts";
import { PLATFORMS_VELOCITY } from "./constants.ts";
import {ExplosionItem} from "./platforms/ExplosionItem.ts";
import {PlatformManager} from "./platforms/PlatformManager.ts";


export class ExplosionManager {
    private scene: ForestScene;
    private explosions: ExplosionItem[] = [];

    constructor(scene: ForestScene) {
        this.scene = scene;
        this.createAnimations();
    }

    private createAnimations() {
        console.log('Creating explosion animation'); // Debug log

        // Define the explosion animation using specific frame keys
        if (!this.scene.anims.get('explosionAnim')) {
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
    }


    public createExplosion(x: number, y: number) {
        const explosion = new ExplosionItem(this.scene, x, y);
        this.explosions.push(explosion);

        // Add collision detection for each explosion item
        this.scene.physics.add.overlap(this.scene.character, explosion.getSprite(), () => {
            explosion.handleCollision(this.scene.character);
        });
    }

    public updateExplosionsPosition(delta: number) {
        if (this.scene.characterIsMoving) {
            const moveAmount = PLATFORMS_VELOCITY / delta;
            this.explosions.forEach(explosion => {
                explosion.updatePosition(-moveAmount);
            });
        }
    }

    // creates explosions on the ground
    public createExplosions() {
        const indices: number[] = [1, 6];

        for (const index of indices) {
            const x: number = PlatformManager.getPlatformX(index)
            this.createExplosion(x, this.scene.cameras.main.height - 160); 
        }
    }
}

