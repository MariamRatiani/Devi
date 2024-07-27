import {Scene} from "phaser";
import Sprite = Phaser.GameObjects.Sprite;
import {EventBus} from "../../EventBus.ts";
import TileSprite = Phaser.GameObjects.TileSprite;
import {PlatformManager} from "./platformManager.ts";
import {BackgroundManager} from "./BackgroundManager.ts";
import {CharacterManager} from "./CharacterManager.ts";
import {calculateScale, setupCamera} from "./utils.ts";
import {AssetManager} from "./AssetManager.ts";



export class ForestScene extends Scene {
    background1: TileSprite;
    background2: TileSprite;
    background3: TileSprite;
    background4: TileSprite;
    character: Phaser.Physics.Arcade.Sprite;
    ground: Sprite;

    lastTile: TileSprite
    camera: Phaser.Cameras.Scene2D.Camera;
    staticPlatforms: Phaser.Physics.Arcade.StaticGroup;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    platforms: Phaser.Physics.Arcade.Group;

    backgroun1speed: number = 25;
    backgroun2speed: number = 50;
    backgroun3speed: number = 80;
    backgroun4speed: number = 100;
    platformsSpeed: number = 120

    platformManager: PlatformManager
    backgroundManager: BackgroundManager
    characterManager: CharacterManager
    assetManager: AssetManager
    
    endX: number;

    characterIsMoving: boolean

    constructor ()
    {
        super('ForestScene');
        this.characterIsMoving = false
    }
    
    init() {
        console.log('inited')
    }

    preload() {
        this.assetManager = new AssetManager(this)
        this.assetManager.preloadAssets()
    }

    private createGround() {
        this.ground = this.staticPlatforms.create(0, this.cameras.main.height - 30, 'ground');

        const [xScale, yScale] = calculateScale(this.ground, this.cameras);
        this.ground.setScale(xScale*2, yScale/9);

        // Manually update the physics body to match the sprite's visual bounds
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.ground.body?.updateFromGameObject();

        // Set the origin and scroll factor
        this.ground.setOrigin(0, 0).setScrollFactor(0);
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create(_data: never) {
        this.camera = setupCamera(this, 0x35ff00)

        this.staticPlatforms = this.physics.add.staticGroup()
        this.platforms = this.physics.add.group()

        this.backgroundManager = new BackgroundManager(this)
        this.backgroundManager.createBackgrounds()
        
        this.createGround()
        this.characterManager = new CharacterManager(this)
        this.characterManager.createCharacter()
        this.platformManager = new PlatformManager(this)
        // this.createPlatforms()
        this.platformManager.createPlatforms(this)

        //dont know if we need these 2 lines
        // this.physics.add.existing(this.character);
        // this.camera.startFollow(this.character, true, 0.1, 0.0);

        this.platformManager.setColliderToPlatforms()
        this.physics.add.collider(this.character, this.staticPlatforms);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.cursors = this.input.keyboard.createCursorKeys();

        EventBus.emit('current-scene-ready', this);
    }
    
    update(_time: never, delta: number) {

        if (this.lastTile.x < 100) {
            this.finishGame();
            return;
        }

        // update movements
        this.characterManager.updateCharacterMovement()
        this.backgroundManager.updateBackgroundMovement(delta)
        this.platformManager.updatePlatformsPosition(delta)
    }

    private finishGame() {
        this.input.keyboard?.shutdown()
        this.character.body?.setVelocityX(0);
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', { fontSize: '40px', color: '#FFFFFF' }).setOrigin(0.5);
    }

    changeScene() {

    }
}