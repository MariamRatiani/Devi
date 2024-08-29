// PlatformManager.ts
import { Platform } from './Platform.ts';
import { PlatformItemFactory } from './PlatformItemFactory.ts';
import {ForestScene} from "../ForestScene.ts";

const heights: number[] = [0, 1, 0, 1, 2, 0, 2, 1, 2, 0];

export class PlatformManager {
    private scene: ForestScene;
    private platforms: Platform[] = [];
    private startingCoordinateOfPlatform = 320;
    private distanceBetweenPlatforms = 270;
    groundTop: number;
    groundHeight: number;
    // private combDistanceFromPlatform = 50;
    private platformKey = 'tile3';
    
    constructor(scene: ForestScene) {
        
        this.scene = scene;
        this.groundTop = this.scene.camera.height - this.scene.ground.height;
        this.groundHeight = this.scene.ground.height;
        scene.endX = this.startingCoordinateOfPlatform + 10 * this.distanceBetweenPlatforms;
    }
    
    private getX(index: number) {
        return this.startingCoordinateOfPlatform + index * this.distanceBetweenPlatforms;
    }
    
    private getY(index: number) {
        const characterHeight = this.scene.character.displayHeight;
        return this.groundTop - characterHeight - 150 * heights[index];
    }

    private createPlatformWithComb(index: number) {
        const x = this.getX(index)
        const y = this.getY(index)
        
        const item = PlatformItemFactory.createItem('comb', this.scene, x, y)
        const platform = new Platform(this.scene, x, y, this.platformKey, item)
         this.platforms.push(platform);

        if (index === 9) {
            this.scene.lastTile = platform.platform;
        }
    }
    
    private createPlatformWithExplosion(index: number) {
        const x = this.getX(index)
        const y = this.getY(index)

        const item = PlatformItemFactory.createItem('explosion', this.scene, x, y)
        const platform = new Platform(this.scene, x, y, this.platformKey, item)
        this.platforms.push(platform);

        if (index === 9) {
            this.scene.lastTile = platform.platform;
        }
    }

    createPlatforms() {
        this.createPlatformWithExplosion(0)

        for (let i = 1; i <= 5; i++) {
            this.createPlatformWithComb(i);
        }
        
        this.createPlatformWithExplosion(6)
        this.createPlatformWithExplosion(7)
        
        this.createPlatformWithComb(8);
        this.createPlatformWithComb(9);
    }

    public updatePlatformsPosition(delta: number) {
        if (this.scene.characterIsMoving) {
            this.platforms.forEach(platform => platform.update(delta));
        }
    }


    public setColliderToPlatforms() {
        this.platforms.forEach(platform => {
            this.scene.physics.add.collider(this.scene.character, platform.platform);
        });
    }
}
