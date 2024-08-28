import { Statement } from "../Interfaces/Statement";
import { StatementContainer } from "./StatementContainer";
import { StatementVisitor } from "../Interfaces/Visitor";

export class ForStatement extends StatementContainer implements Statement {
    iterationCount: number

    constructor(statements: Statement[] = [], iterationCount: number) {
        super(statements);
        this.iterationCount = iterationCount;
    }

    public async accept(visitor: StatementVisitor): Promise<void> {
        await visitor.doForStatement(this)
    }
}
