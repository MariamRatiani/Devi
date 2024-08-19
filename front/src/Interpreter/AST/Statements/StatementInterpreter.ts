import { ForStatement } from "./ConcreteStatements/ForStatement";
import { FuncStatement } from "./ConcreteStatements/FuncStatement";
import { IfStatement } from "./ConcreteStatements/IfStatement";
import { VarStatement } from "./ConcreteStatements/VarStatement";
import { WhileStatement } from "./ConcreteStatements/WhileStatement";
import { Statement } from "./Interfaces/Statement";
import { StatementVisitor } from "./Interfaces/Visitor";
import { SceneAction } from "./SceneAction";
import { ExpressionInterpreter } from "../Expressions/ExpressionInterpreter";
import { Variable, VarValue } from "./ConcreteStatements/Environment";

export class StatementInterpreter implements StatementVisitor {
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
        const parentEnv = statement.getParentEnvironment()
        this.expessionInterpreter.setCurrentEnvironment(parentEnv)
        const value = this.expessionInterpreter.interpret(statement.intializer)
        parentEnv.addOrSetVariable(new Variable(statement.type, statement.name, value as VarValue))
    }
    
    doForStatement(statement: ForStatement): void {
        for (let i = 0; i < statement.iterationCount; i++) {
            statement.callStatements(this)
        }
    }
}