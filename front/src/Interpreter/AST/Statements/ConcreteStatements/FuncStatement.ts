import { Statement } from "../Interfaces/Statement";
import { StatementVisitor } from "../Interfaces/Visitor";

export class FuncStatement extends Statement {
    funcName: string

    constructor(funcName: string) {
        super()
        this.funcName = funcName
    }

    accept(visitor: StatementVisitor): void {
        visitor.doFuncStatement(this)
    }
    
}