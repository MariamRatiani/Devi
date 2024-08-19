import { ForStatement } from "../ConcreteStatements/ForStatement"
import { FuncStatement } from "../ConcreteStatements/FuncStatement"
import { IfStatement } from "../ConcreteStatements/IfStatement"
import { VarStatement } from "../ConcreteStatements/VarStatement"
import { WhileStatement } from "../ConcreteStatements/WhileStatement"

export interface StatementVisitor {
    doWhileStatement(statement: WhileStatement): void
    doIfStatement(statement: IfStatement): void
    doFuncStatement(statement: FuncStatement): void
    doVarStatement(statement: VarStatement): void
    doForStatement(statement: ForStatement): void
}
