import { stat } from "fs";
import { ForStatement } from "./ConcreteStatements/ForStatement";
import { FuncStatement } from "./ConcreteStatements/FuncStatement";
import { IfStatement } from "./ConcreteStatements/IfStatement";
import { VarStatement } from "./ConcreteStatements/VarStatement";
import { WhileStatement } from "./ConcreteStatements/WhileStatement";
import { Statement } from "./Interfaces/Statement";
import { Visitor } from "./Interfaces/Visitor";
import { SceneAction } from "./SceneAction";
import { ExpressionInterpreter } from "../Expressions/ExpressionInterpreter";

export class StatementInterpreter implements Visitor {
    private statements: Statement[] = []
    private scene: SceneInteractable
    private expessionInterpreter = new ExpressionInterpreter()

    constructor(scene: SceneInteractable, statements: Statement[]) {
        this.scene = scene
        this.statements = statements
    }

    execute() {
        this.executeStatements(this.statements)
    }

    executeStatements(statements: Statement[]) {
        for (const statement of statements) {
            statement.accept(this);
        }
    }

    doWhileStatement(statement: WhileStatement) {
        let conditionValue = this.expessionInterpreter.interpret(statement.condition)
        while (conditionValue) {
            statement.callStatements(this)
        }
    }

    doIfStatement(statement: IfStatement) {
        let conditionValue = this.expessionInterpreter.interpret(statement.condition)
        if (conditionValue) {
            statement.callStatements(this)
        }
    }
    
    doFuncStatement(statement: FuncStatement) {
        switch (statement.funcName) {
            case SceneAction.MOVE_MAIN_CHARACTER: 
                this.scene.moveForwardMainPlayer()
                break
            case SceneAction.JUMP_MAIN_CHARACTER:
                this.scene.jumpMainPlayer()
                break
            default:
                console.log('Invalid action on func') 
        }
    }
    
    doVarStatement(statement: VarStatement): void {

    }
    
    doForStatement(statement: ForStatement): void {
        for (let i = 0; i < statement.iterationCount; i++) {
            statement.callStatements(this)
        }
    }
}