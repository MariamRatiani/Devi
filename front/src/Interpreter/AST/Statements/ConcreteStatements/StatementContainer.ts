import { Statement } from "../Interfaces/Statement";
import { StatementVisitor } from "../Interfaces/Visitor";

/**
 * This class holds child statements. You can add statements and then 
 * call for each one its execution logic. How to execute each statement 
 * is responsibility of visitor property. 
 * this class can be subclassed by the Statement classes which hold can 
 * have more statements in their scope. For exmaple IfStatement, ForStatement.
 * This class also should be used for implementing Root node of the tree.
 */
export abstract class StatementContainer extends Statement {
    statements: Statement[]

    constructor(statements: Statement[] = []) {
        super();
        this.statements = statements;
    }

    public addStatement(statement: Statement) {
        this.statements.push(statement)
    }

    public async callStatements(visitor: StatementVisitor): Promise<void> {
        for (const currentStatement of this.statements) {
            await currentStatement.accept(visitor);
        }
    }
}