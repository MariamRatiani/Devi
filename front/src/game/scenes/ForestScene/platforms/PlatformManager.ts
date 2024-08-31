// PlatformManager.ts
import { Platform } from './Platform.ts';
import { PlatformItemFactory } from './PlatformItemFactory.ts';
import {ForestScene} from "../ForestScene.ts";

const heights: number[] = [0, 1, 0, 1, 2, 0, 1, 2, 2, 0];

export class PlatformManager {
    
    private static startingCoordinateOfPlatform = 320;
    private static distanceBetweenPlatforms = 270;

    private scene: ForestScene;
    platforms: Platform[] = [];
    groundTop: number;
    groundHeight: number;
    private platformKey = 'tile3';
    
    constructor(scene: ForestScene) {
        
        this.scene = scene;
        this.groundTop = this.scene.camera.height - this.scene.ground.height;
        this.groundHeight = this.scene.ground.height;
        scene.endX = PlatformManager.startingCoordinateOfPlatform + 10 * PlatformManager.distanceBetweenPlatforms;
    }
    
    public static getPlatformX(index: number) {
        return this.startingCoordinateOfPlatform + index * PlatformManager.distanceBetweenPlatforms;
    }
    
    public getPlatformY(index: number) {
        const characterHeight = this.scene.character.displayHeight;
        return this.groundTop - characterHeight - 150 * heights[index];
    }

    private createPlatformWithComb(index: number) {
        const x = PlatformManager.getPlatformX(index)
        const y = this.getPlatformY(index)
        
        const item = PlatformItemFactory.createItem('comb', this.scene, x, y)
        const platform = new Platform(this.scene, x, y, this.platformKey, item)
         this.platforms.push(platform);

        if (index === 9) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.scene.lastTile = platform.platform;
        }
    }
    
    private createPlatformWithExplosion(index: number) {
        const x = PlatformManager.getPlatformX(index)
        const y = this.getPlatformY(index)

        const item = PlatformItemFactory.createItem('explosion', this.scene, x, y)
        const platform = new Platform(this.scene, x, y, this.platformKey, item)
        this.platforms.push(platform);

        if (index === 9) {
            this.scene.lastTile = platform.platform;
        }
    }

    createPlatforms() {
        this.createPlatformWithComb(0)
        this.createPlatformWithComb(1)
        this.createPlatformWithComb(2)
        this.createPlatformWithComb(3)
        this.createPlatformWithExplosion(4)
        this.createPlatformWithComb(5)

        this.createPlatformWithComb(6)
        this.createPlatformWithExplosion(7)
        
        // this.createPlatformWithComb(8);
        this.createPlatformWithComb(9);
    }

    public updatePlatformsPosition(delta: number) {
            this.platforms.forEach(platform => platform.update(delta));
    }


    public setColliderToPlatforms() {
        this.platforms.forEach(platform => {
            this.scene.physics.add.collider(this.scene.character, platform.platform);
        });
    }
}
