import { ForStatement } from "../ConcreteStatements/ForStatement"
import { FuncStatement } from "../ConcreteStatements/FuncStatement"
import { IfStatement } from "../ConcreteStatements/IfStatement"
import { VarStatement } from "../ConcreteStatements/VarStatement"
import { WhileStatement } from "../ConcreteStatements/WhileStatement"

export interface StatementVisitor {
    doWhileStatement(statement: WhileStatement): Promise<void>;
    doIfStatement(statement: IfStatement): Promise<void>;
    doFuncStatement(statement: FuncStatement): Promise<void>;
    doVarStatement(statement: VarStatement): Promise<void>;
    doForStatement(statement: ForStatement): Promise<void>;
}
