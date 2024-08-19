import { Environment, IEnvironment } from "../ConcreteStatements/Environment"
import { StatementVisitor } from "./Visitor"

export interface IStatement extends IEnvironment {
    accept(visitor: StatementVisitor): void
}

export abstract class Statement extends Environment implements IStatement {
    abstract accept(visitor: StatementVisitor): void
}
