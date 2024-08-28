import { Statement } from "../Interfaces/Statement.ts";
import { StatementVisitor } from "../Interfaces/Visitor.ts";
import { Expression } from "../../Expressions/Expression.ts";
import { ConditionalStatement } from "./ConditionalStatement.ts";

export class WhileStatement extends ConditionalStatement {

    constructor(statements: Statement[] = [], expression: Expression) {
        super(statements, expression);
    }

    public async accept(visitor: StatementVisitor): Promise<void> {
        await visitor.doWhileStatement(this)
    }
    
}
