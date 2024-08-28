
import { ForestScene } from './ForestScene.ts';
import {PlatformWithComb} from "./PlatformWithComb.ts";

const heights: number[] = [0, 1, 2, 2, 1, 0, 1, 1, 2, 0];

const combWidth = 2
const combHeight = 2

export class PlatformManager {
    private scene: ForestScene;
    private platformsWithCombs: PlatformWithComb[] = [];
    private startingCoordinateOfPlatform = 320;
    private distanceBetweenPlatforms = 270;
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
        const platformKey = 'tile3'
            // = index % 2 === 0 ? 'tile1' : 'tile3';

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
