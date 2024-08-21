// import { ForestScene } from './ForestScene.ts';
// import {PLATFORMS_VELOCITY} from "./constants.ts";
//
// const heights: number[] = [0, 1, 2, 2, 1, 0, 1, 1, 2, 0];
//
// const combWidth = 2
// const combHeight = 2
//
// export class PlatformManager {
//     private scene: ForestScene;
//     private platforms: Phaser.Physics.Arcade.Group;
//     // private tempPlatforms: Phaser.Physics.Arcade.Group;
//     private startingCoordinateOfPlatform = 330
//     private distanceBetweenPlatforms = 500
//     groundTop: number
//     groundHeight : number
//    
//     private combDistanceFromPlatform = 50
//
//     constructor(scene: ForestScene) {
//         scene.endX = this.startingCoordinateOfPlatform + 10*this.distanceBetweenPlatforms
//         this.scene = scene;
//         this.groundTop = this.scene.camera.height - this.scene.ground.height
//         this.groundHeight = this.scene.ground.height
//     }
//    
//     private putCombOnThePlatform(platformX: integer, platformY: integer) {
//         const x = platformX
//         const y = platformY + this.combDistanceFromPlatform
//         //
//         const comb = this.scene.rewards.create(x, y, 'comb')
//         // comb.body.setSize(combWidth, combHeight);
//         comb.setScale(0.04)
//         comb.body.setAllowGravity(false);
//         comb.body.setImmovable(true);
//
//     }
//    
//    
//     private ImplCreatePlatform(index: integer, platformKey: string) {
//         const xCoordinate = this.startingCoordinateOfPlatform + index*this.distanceBetweenPlatforms
//         // const height = this.scene.textures.get(platformKey).getSourceImage().height;
//         const characterHeight = this.scene.character.displayHeight
//         // const y = this.groundTop - 0.5 *
//         //     (this.scene.camera.height - this.scene.character.displayHeight - this.groundHeight - height);
//         const y = this.groundTop - characterHeight - 150*heights[index] 
//         const tilePlatform = this.scene.platforms.create(xCoordinate, y, platformKey);
//         tilePlatform.body.setAllowGravity(false);
//         tilePlatform.body.setImmovable(true);
//         tilePlatform.body.setSize(tilePlatform.width, tilePlatform.height);
//
//         this.putCombOnThePlatform(xCoordinate, y)
//         if(index === 9) {
//             this.scene.lastTile = tilePlatform
//         }
//     }
//    
//     private createPlatform(index: integer) {
//         if (index%2 === 0) {
//             this.ImplCreatePlatform(index, 'tile1')
//         }else {
//             this.ImplCreatePlatform(index, 'tile3')
//         }
//     }
//
//     createPlatforms(scene: ForestScene) {
//
//         for(let i = 0; i < 10; i++) {
//             this.createPlatform(i)
//         }
//         // this.firstPlatform()
//         // const numIterations: number = 6;
//         // const xCoordinate: number = 500;
//         // for (let i = 0; i < numIterations; i++) {
//         //     const randomNumber: number = Math.random();
//         //     const height = scene.textures.get('tile1').getSourceImage().height;
//         //     const y = this.groundTop - randomNumber * (scene.camera.height - scene.character.displayHeight - this.groundHeight - height);
//         //     const tilePlatform = this.scene.platforms.create(300 + i * xCoordinate, y, 'tile1');
//         //     tilePlatform.body.setAllowGravity(false);
//         //     tilePlatform.body.setImmovable(true);
//         //     tilePlatform.body.setCollideWorldBounds(true);
//         //     tilePlatform.body.checkCollision.right = true;
//         //     tilePlatform.body.checkCollision.left = true;
//         //     tilePlatform.setCollideWorldBounds(true);
//         //     tilePlatform.body.setSize(tilePlatform.width, tilePlatform.height);
//         // }
//     }
//
//
//     public updatePlatformsPosition(delta: number) {
//         if (this.scene.characterIsMoving) {
//             const moveAmount = PLATFORMS_VELOCITY / delta;
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             // @ts-expect-error
//             this.scene.platforms.children.each((platform: Phaser.Physics.Arcade.Sprite) => {
//                 platform.x -= moveAmount;
//                 if (platform.x + platform.width < 0) {
//                     platform.x = this.scene.endX;
//                 }
//             });
//         }
//     }
//     public updatePlatformsPositionOld(delta: number) {
//         // Update the platforms position here
//         const updatePosition = (platform: Phaser.Physics.Arcade.Sprite) => {
//             // const moveAmount = this.scene.cursors.left.isDown ? -this.scene.platformsSpeed / delta : this.scene.cursors.right.isDown ? this.scene.platformsSpeed / delta : 0;
//
//             const moveAmount = PLATFORMS_VELOCITY 
//
//             if (this.scene.cursors.left.isDown) {
//                 platform.setVelocityX(moveAmount)
//                 // platform.body?.setVelocityX(moveAmount)
//                 // platform.body.x += moveAmount
//                 // platform.x += moveAmount
//
//             } else if (this.scene.cursors.right.isDown) {
//                 // platform.body?.setVelocityX(-moveAmount)
//                 platform.setVelocityX(-moveAmount)
//                 // platform.body.x -= moveAmount
//                 // platform.x -= moveAmount
//             }else {
//                 platform.setVelocityX(0); // Stop the platform when no key is pressed
//             }
//         };
//
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-expect-error
//         this.scene.platforms.children.each(platform => {
//             updatePosition(platform as Phaser.Physics.Arcade.Sprite);
//         });
//     }
//
//     public setColliderToPlatforms() {
//         this.scene.physics.add.collider(this.scene.character, this.scene.platforms, () => {
//         });
//     }
// }


import { ForestScene } from './ForestScene.ts';
import {PlatformWithComb} from "./PlatformWithComb.ts";

const heights: number[] = [0, 1, 2, 2, 1, 0, 1, 1, 2, 0];

const combWidth = 2
const combHeight = 2

export class PlatformManager {
    private scene: ForestScene;
    private platformsWithCombs: PlatformWithComb[] = [];
    private startingCoordinateOfPlatform = 330;
    private distanceBetweenPlatforms = 500;
    groundTop: number;
    groundHeight: number;
    private combDistanceFromPlatform = 50;

    constructor(scene: ForestScene) {
        scene.endX = this.startingCoordinateOfPlatform + 10 * this.distanceBetweenPlatforms;
        this.scene = scene;
        this.groundTop = this.scene.camera.height - this.scene.ground.height;
        this.groundHeight = this.scene.ground.height;
    }

    private createPlatformWithComb(index: integer) {
        const xCoordinate = this.startingCoordinateOfPlatform + index * this.distanceBetweenPlatforms;
        const characterHeight = this.scene.character.displayHeight;
        const y = this.groundTop - characterHeight - 150 * heights[index];
        const platformKey = index % 2 === 0 ? 'tile1' : 'tile3';

        const platformWithComb = new PlatformWithComb(this.scene, xCoordinate, y, platformKey, 'comb', this.combDistanceFromPlatform);
        this.platformsWithCombs.push(platformWithComb);

        if (index === 9) {
            this.scene.lastTile = platformWithComb.platform;
        }
    }

    createPlatforms() {
        for (let i = 0; i < 10; i++) {
            this.createPlatformWithComb(i);
        }
    }

    public updatePlatformsPosition(delta: number) {
        if (this.scene.characterIsMoving) {
            this.platformsWithCombs.forEach(platformWithComb => platformWithComb.update(delta));
        }
    }

    public setColliderToPlatforms() {
        this.platformsWithCombs.forEach(platformWithComb => {
            this.scene.physics.add.collider(this.scene.character, platformWithComb.platform);
        });
    }
}
