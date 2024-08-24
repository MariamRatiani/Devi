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
    private statements: Statement[] = [];
    private scene: SceneInteractable;
    private expressionInterpreter = new ExpressionInterpreter();

    constructor(scene: SceneInteractable, statements: Statement[]) {
        this.scene = scene;
        this.statements = statements;
    }

    async execute() {
        await this.executeStatements(this.statements);
    }

    async executeStatements(statements: Statement[]): Promise<void> {
        console.log('statements: ', statements);
        for (const statement of statements) {
            await statement.accept(this);
        }
    }

    async doWhileStatement(statement: WhileStatement): Promise<void> {
        let conditionValue = this.expressionInterpreter.interpret(statement.condition);
        while (conditionValue) {
            await statement.callStatements(this);
            conditionValue = this.expressionInterpreter.interpret(statement.condition);
        }
    }

    async doIfStatement(statement: IfStatement): Promise<void> {
        let conditionValue = this.expressionInterpreter.interpret(statement.condition);
        if (conditionValue) {
            await statement.callStatements(this);
        }
    }

    async doFuncStatement(statement: FuncStatement): Promise<void> {
        switch (statement.funcName) {
            case SceneAction.MOVE_MAIN_CHARACTER:
                await this.scene.moveForwardMainPlayer();
                console.log('did moved');
                break;
            case SceneAction.JUMP_MAIN_CHARACTER:
                await this.scene.jumpMainPlayer();
                console.log('did jumped');
                break;
            default:
                console.log('Invalid action on func');
        }
    }

    async doVarStatement(statement: VarStatement): Promise<void> {
        const parentEnv = statement.getParentEnvironment();
        this.expressionInterpreter.setCurrentEnvironment(parentEnv);
        const value = this.expressionInterpreter.interpret(statement.intializer);
        parentEnv.addOrSetVariable(new Variable(statement.type, statement.name, value as VarValue));
    }

    async doForStatement(statement: ForStatement): Promise<void> {
        for (let i = 0; i < statement.iterationCount; i++) {
            await statement.callStatements(this);
        }
    }
}
