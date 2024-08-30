// AudioManager.ts

export class AudioManager {
    private scene: Phaser.Scene;
    private sounds: { [key: string]: Phaser.Sound.BaseSound } = {};
    volume: number = 0.5
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    // Load an audio file
    public loadAudio(key: string, path: string) {
        this.scene.load.audio(key, path);
    }

    // Initialize sounds after loading in the preload method
    public initializeSounds() {
        this.sounds['backgroundMusic'] = this.scene.sound.add('backgroundMusic')
        this.sounds['explosionAudio'] = this.scene.sound.add('explosionAudio')
        this.sounds['combTaking'] = this.scene.sound.add('combTaking')
    }

    // Play a sound by its key
    public playSound(key: string, config?: Phaser.Types.Sound.SoundConfig) {
        config = { loop: true, volume: this.volume}
        const sound = this.sounds[key];
        if (sound) {
            sound.play(config);
        } else {
            console.warn(`Sound with key ${key} not found!`);
        }
    }

    public playExplosion() {
        this.sounds['explosionAudio'].play({volume: 0.3})
    }
    // Stop a sound by its key
    public stopSound(key: string) {
        const sound = this.sounds[key];
        if (sound && sound.isPlaying) {
            sound.stop();
        }
    }
    
    public takeCombSound() {
        this.sounds['combTaking'].play({volume: 0.5})
    }
}
