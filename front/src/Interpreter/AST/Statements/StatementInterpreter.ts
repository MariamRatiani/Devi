import { ForStatement } from "./ConcreteStatements/ForStatement";
import { FuncStatement } from "./ConcreteStatements/FuncStatement";
import { IfStatement } from "./ConcreteStatements/IfStatement";
import { VarAsignStatement, VarStatement } from "./ConcreteStatements/VarStatement";
import { WhileStatement } from "./ConcreteStatements/WhileStatement";
import { Statement } from "./Interfaces/Statement";
import { StatementVisitor } from "./Interfaces/Visitor";
import { SceneAction } from "./SceneAction";
import { ExpressionInterpreter } from "../Expressions/ExpressionInterpreter";
import {Environment, Variable, VarValue} from "./ConcreteStatements/Environment";
import {Expression} from "../Expressions/Expression.ts";

export class StatementInterpreter implements StatementVisitor {
    private statements: Statement[] = [];
    private scene: SceneInteractable;
    private expressionInterpreter = new ExpressionInterpreter();

    constructor(scene: SceneInteractable, statements: Statement[]) {
        this.scene = scene;
        this.statements = statements;
        console.log(statements)
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
        console.log(statement)
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
        parentEnv.addVariable(new Variable(statement.type, statement.name, value as VarValue));
    }

    async doVarAsignStatement(statement: VarAsignStatement): Promise<void> {
        this.searchParentAndSet(statement.getParentEnvironment(), statement.name, statement.asigner)
    }

    async doForStatement(statement: ForStatement): Promise<void> {
        let iterationCount = this.expressionInterpreter.interpret(statement.iterationCount);
        if (typeof iterationCount === 'number') {
            for (let i = 0; i < iterationCount; i++) {
                await statement.callStatements(this);
            }
        }
    }
    
    private searchParentAndSet(parentEnv: Environment | undefined, varName: string, asigner: Expression) {
        if (parentEnv != null || parentEnv != undefined) {
            this.expressionInterpreter.setCurrentEnvironment(parentEnv);
            const value = this.expressionInterpreter.interpret(asigner);
            if (!parentEnv.setVariable(varName, value as VarValue)) {
                this.searchParentAndSet(parentEnv.getParentEnvironment(), varName, asigner)
            }
        }
    }
}
