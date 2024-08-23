interface SceneInteractable {
    jumpMainPlayer(): Promise<boolean> 
    moveForwardMainPlayer(): Promise<boolean> 
}