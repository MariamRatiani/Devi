import { Environment } from "../Interpreter/AST/Statements/ConcreteStatements/Environment";
import { StatementInterpreter } from "../Interpreter/AST/Statements/StatementInterpreter";
import { StatementParser } from "../Interpreter/AST/Statements/StatementParser";
import { Tokenizer } from "../Interpreter/Tokenizer/Tokenizer";

export interface SceneViewModel {
    startCodeExecution(code: String): void
    reset(): void
}

export class SceneViewModelImpl implements SceneViewModel {
    private scene: SceneInteractable

    constructor(scene: SceneInteractable) {
        this.scene = scene;
    }

    startCodeExecution(code: string): void {
        let tokenizer = new Tokenizer(code)
        let tokens = tokenizer.scanTokens()

        let globalEnvironment = new Environment()
        let parser = new StatementParser(tokens, globalEnvironment)
        let statements = parser.parse()

        let interpreter = new StatementInterpreter(this.scene, statements)
        interpreter.execute()
    }

    // TODO
    reset(): void {
    }
}