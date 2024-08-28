export class RewardText {
    private scene: Phaser.Scene;
    private rewardText: Phaser.GameObjects.Text;
    private rewardCount: number;

    constructor(scene: Phaser.Scene, initialCount: number = 0) {
        this.scene = scene;
        this.rewardCount = initialCount;

        this.rewardText = this.scene.add.text(10, 10, `combs: ${this.rewardCount}`, {
            fontSize: '32px'
            // fill: '#fff'
        });
    }

    public incrementRewardCount() {
        this.rewardCount += 1;
        this.updateText();
    }

    private updateText() {
        this.rewardText.setText(`combs: ${this.rewardCount}`);
    }

    public getRewardCount(): number {
        return this.rewardCount;
    }
}
