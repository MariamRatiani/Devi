import { ForestScene } from "./ForestScene.ts";

export class LivesManager {
    scene: ForestScene;
    lives: number; // Variable to keep track of lives
    heartImages: Phaser.GameObjects.Image[] = []; // Array to store heart images
    heartScale: number = 0.055
    
    constructor(scene: ForestScene, initialLives: number = 3) {
        this.scene = scene;
        this.lives = initialLives; // Initialize with the provided number of lives

        // Load heart icons and position them
        this.createHeartIcons();
    }

    createHeartIcons() {
        const heartSpacing = 60; // Spacing between hearts
        const startX = this.scene.cameras.main.width - heartSpacing * this.lives - 40; // Calculate starting X position

        for (let i = this.lives; i > 0; i--) {
            const heart = this.scene.add.image(startX + i * heartSpacing, 40, 'heart').setScrollFactor(0);
            heart.setScale(this.heartScale, this.heartScale)
            this.heartImages.push(heart);
        }
    }

    reduceLife() {
        if (this.lives > 0) {
            this.lives -= 1; // Reduce lives by one
            this.heartImages[this.lives].setVisible(false); // Hide one heart

            if (this.lives <= 0) {
                this.scene.finishGame(); // End the game if no lives are left
            }
        }
    }

    getLivesCount(): number {
        return this.lives
    }
    // Method to reset lives (useful for restarting the game)
    resetLives(newLives: number = 3) {
        this.lives = newLives;
        for (let i = 0; i < this.heartImages.length; i++) {
            this.heartImages[i].setVisible(i < newLives); // Show or hide hearts based on new lives count
        }
    }
}
