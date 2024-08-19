import { Statement } from "../Interfaces/Statement.ts";
import { StatementVisitor } from "../Interfaces/Visitor.ts";
import { Expression } from "../../Expressions/Expression.ts";
import { ConditionalStatement } from "./ConditionalStatement.ts";

export class WhileStatement extends ConditionalStatement {

    constructor(statements: Statement[] = [], expression: Expression) {
        super(statements, expression);
        super(statements, expression);
    }

    public accept(visitor: StatementVisitor): void {
        visitor.doWhileStatement(this)
    }
    
}
