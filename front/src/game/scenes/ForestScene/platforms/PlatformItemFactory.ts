// PlatformItemFactory.ts
import { PlatformItem } from "./PlatformItem.ts";
import { CombItem } from "./CombItem.ts";
import { ExplosionItem } from "./ExplosionItem.ts";

export class PlatformItemFactory {
    private static combDistanceFromPlatform: number = 90;
    private static explosionDistanceFromPlatform: number = 80;

    static createItem(type: string, scene: Phaser.Scene, x: number, y: number): PlatformItem {
        switch (type) {
            case 'comb':
                return new CombItem(scene, x , y - PlatformItemFactory.combDistanceFromPlatform);
            case 'explosion':
                return new ExplosionItem(scene, x, y - PlatformItemFactory.explosionDistanceFromPlatform);
            // Add cases for additional item types as needed
            default:
                throw new Error(`Unknown platform item type: ${type}`);
        }
    }
}
