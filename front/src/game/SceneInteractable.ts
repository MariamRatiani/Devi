interface SceneInteractable extends GameRewardable{
    jumpMainPlayer(): Promise<boolean> 
    moveForwardMainPlayer(): Promise<boolean> 
    moveBackMainPlayer(): Promise<boolean>
    jumpBackwardsMainPlayer(): Promise<boolean>
}

interface GameRewardable {
    getRewards(): number
}