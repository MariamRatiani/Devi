import { Environment } from "../Interpreter/AST/Statements/ConcreteStatements/Environment";
import { StatementInterpreter } from "../Interpreter/AST/Statements/StatementInterpreter";
import { StatementParser } from "../Interpreter/AST/Statements/StatementParser";
import { Tokenizer } from "../Interpreter/Tokenizer/Tokenizer";

export interface SceneViewModel {
    startCodeExecution(code: string): void
    reset(): void
}

export class SceneViewModelImpl implements SceneViewModel {
    private scene: SceneInteractable

    constructor(scene: SceneInteractable) {
        this.scene = scene;
    }

    startCodeExecution(code: string): void {
        const tokenizer = new Tokenizer(code)
        const tokens = tokenizer.scanTokens()

        const globalEnvironment = new Environment()
        const parser = new StatementParser(tokens, globalEnvironment)
        const statements = parser.parse()

        const interpreter = new StatementInterpreter(this.scene, statements)
        interpreter.execute()
    }

    // TODO
    reset(): void {
    }
}