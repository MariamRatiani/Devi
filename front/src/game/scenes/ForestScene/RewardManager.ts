export class RewardManager {
    private scene: Phaser.Scene;
    private rewardCount: number;
    private combsSpacing: number = 50;
    private combScale: number = 0.029;
    private combImages: Phaser.GameObjects.Image[] = [];

    constructor(scene: Phaser.Scene, initialCount: number = 0) {
        this.scene = scene;
        this.rewardCount = initialCount;

        // Initialize the comb images based on the initial count
        this.createCombsList();
    }

    private createCombsList() {
        // Clear existing comb images before creating the new list
        this.combImages.forEach(comb => comb.destroy());
        this.combImages = [];

        const startX = 40; // Starting X position for the first comb image

        // Create comb images based on the reward count
        for (let i = 0; i < this.rewardCount; i++) {
            const curComb = this.scene.add.image(startX + i * this.combsSpacing, 40, 'comb').setScrollFactor(0);
            curComb.setScale(this.combScale, this.combScale);
            this.combImages.push(curComb);
        }
    }

    public incrementRewardCount() {
        this.rewardCount += 1;
        this.addCombImage(); // Add a new comb image
    }

    private addCombImage() {
        const startX = 40 + this.combImages.length * this.combsSpacing; // Calculate X position for the new comb
        const newComb = this.scene.add.image(startX, 40, 'comb').setScrollFactor(0);
        newComb.setScale(this.combScale, this.combScale);
        this.combImages.push(newComb);
    }

    public getRewardCount(): number {
        return this.rewardCount;
    }
}
