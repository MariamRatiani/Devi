import { Statement } from "../Interfaces/Statement";
import { StatementContainer } from "./StatementContainer";
import { StatementVisitor } from "../Interfaces/Visitor";
import {Expression} from "../../Expressions/Expression.ts";

export class ForStatement extends StatementContainer implements Statement {
    iterationCount: Expression

    constructor(statements: Statement[] = [], iterationCount: Expression) {
        super(statements);
        this.iterationCount = iterationCount;
    }

    public async accept(visitor: StatementVisitor): Promise<void> {
        await visitor.doForStatement(this)
    }
}
