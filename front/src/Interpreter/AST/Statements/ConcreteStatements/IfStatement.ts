import { Statement } from "../Interfaces/Statement.ts";
import { StatementVisitor } from "../Interfaces/Visitor.ts";
import { ConditionalStatement } from "./ConditionalStatement.ts";
import { Expression } from "../../Expressions/Expression.ts";

export class IfStatement extends ConditionalStatement {

    constructor(statements: Statement[] = [], expression: Expression) {
        super(statements, expression);
    }

    public async accept(visitor: StatementVisitor): Promise<void> {
        await visitor.doIfStatement(this)
    }
}
