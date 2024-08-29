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

