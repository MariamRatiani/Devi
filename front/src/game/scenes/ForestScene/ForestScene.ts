import { Scene } from "phaser";
import Sprite = Phaser.GameObjects.Sprite;
import { EventBus } from "../../EventBus.ts";
import TileSprite = Phaser.GameObjects.TileSprite;
import { PlatformManager } from "./platformManager.ts";
import { BackgroundManager } from "./BackgroundManager.ts";
import { CharacterManager } from "./CharacterManager.ts";
import { calculateScale, setupCamera } from "./utils.ts";
import { AssetManager } from "./AssetManager.ts";
import {JUMP_HEIGHT} from "./constants.ts";

export class ForestScene extends Scene implements SceneInteractable {
    background1: TileSprite;
    background2: TileSprite;
    background3: TileSprite;
    background4: TileSprite;
    character: Phaser.Physics.Arcade.Sprite;
    ground: Sprite;
    spaceKey: Phaser.Input.Keyboard.Key;

    lastTile: TileSprite;
    camera: Phaser.Cameras.Scene2D.Camera;
    staticPlatforms: Phaser.Physics.Arcade.StaticGroup;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    platforms: Phaser.Physics.Arcade.Group;

    backgroun1speed: number = 25;
    backgroun2speed: number = 50;
    backgroun3speed: number = 80;
    backgroun4speed: number = 100;
    platformsSpeed: number = 120;

    platformManager: PlatformManager;
    backgroundManager: BackgroundManager;
    characterManager: CharacterManager;
    assetManager: AssetManager;

    endX: number;

    characterIsMoving: boolean;

    constructor() {
        super('ForestScene');
        this.characterIsMoving = false;
    }

    init() {
        console.log('inited');
    }

    preload() {
        this.assetManager = new AssetManager(this);
        this.assetManager.preloadAssets();
    }

    private createGround() {
        this.ground = this.staticPlatforms.create(0, this.cameras.main.height - 30, 'ground');

        const [xScale, yScale] = calculateScale(this.ground, this.cameras);
        this.ground.setScale(xScale * 2, yScale / 9);

        // Manually update the physics body to match the sprite's visual bounds
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.ground.body?.updateFromGameObject();

        // Set the origin and scroll factor
        this.ground.setOrigin(0, 0).setScrollFactor(0);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create(_data: never) {
        this.input.keyboard?.addCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard?.on('keydown', function (event: { preventDefault: () => void; }) {
            console.log('Key pressed in Phaser!');
        });
        this.camera = setupCamera(this, 0x35ff00);

        this.staticPlatforms = this.physics.add.staticGroup();
        this.platforms = this.physics.add.group();

        this.backgroundManager = new BackgroundManager(this);
        this.backgroundManager.createBackgrounds();

        this.createGround();
        this.characterManager = new CharacterManager(this);
        this.characterManager.createCharacter();
        this.platformManager = new PlatformManager(this);
        // this.createPlatforms()
        this.platformManager.createPlatforms(this);

        //dont know if we need these 2 lines
        // this.physics.add.existing(this.character);
        // this.camera.startFollow(this.character, true, 0.1, 0.0);

        this.platformManager.setColliderToPlatforms();
        this.physics.add.collider(this.character, this.staticPlatforms);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.cursors = this.input.keyboard.createCursorKeys();

        EventBus.emit('current-scene-ready', this);
        this.testDeviGame()

    }

    update(_time: never, delta: number) {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            EventBus.emit('space-key-pressed');
        }
    
        if (this.lastTile.x < 100) {
            this.finishGame();
            return;
        }

        // update movements
        // this.characterManager.updateCharacterMovement();

        this.backgroundManager.updateBackgroundMovement(delta);
        this.platformManager.updatePlatformsPosition(delta);
    }
    
    private testDeviGame() {
        this.jumpMainPlayer()
        // this.move()
    }

    private finishGame() {
        this.input.keyboard?.shutdown();
        this.character.body?.setVelocityX(0);
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', { fontSize: '40px', color: '#FFFFFF' }).setOrigin(0.5);
    }


    jumpMainPlayer(): Promise<boolean> {
        return new Promise((resolve) => {
            if (this.characterIsMoving) {
                resolve(false);
                return;
            }
    
            this.characterIsMoving = true;
            this.character.setVelocityY(JUMP_HEIGHT);
    
            this.time.delayedCall(1500, () => {
                this.characterIsMoving = false;
                resolve(true);
            }, [], this);
        });
    }
    
    moveForwardMainPlayer(): Promise<boolean> {
        return new Promise((resolve) => {
            if (this.characterIsMoving) {
                console.log('----player already moves-----', this.characterIsMoving)
                resolve(false);
                return;
            }
            console.log('character starts moving', this.characterIsMoving)
            this.characterIsMoving = true;
            
            this.tweens.add({
                targets: this.character,
                x: this.character.x + 100,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.characterIsMoving = false;
                    resolve(true);
                }
            });
        });
    }    
}
