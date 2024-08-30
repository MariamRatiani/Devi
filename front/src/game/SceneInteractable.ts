interface SceneInteractable {
    jumpMainPlayer(): Promise<boolean> 
    moveForwardMainPlayer(): Promise<boolean> 
    moveBackMainPlayer(): Promise<boolean>
}