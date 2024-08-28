import { Environment, IEnvironment, Variable } from "../ConcreteStatements/Environment"
import { StatementVisitor } from "./Visitor"

export interface IStatement extends IEnvironment {
    accept(visitor: StatementVisitor): Promise<void>;
}

export abstract class Statement extends Environment implements IStatement {
    addOrSetVariable(variable: Variable): void {
        throw new Error("Method not implemented.");
    }
    shouldBeAdded(variable: Variable): boolean {
        throw new Error("Method not implemented.");
    }
    abstract accept(visitor: StatementVisitor): Promise<void>;
}
