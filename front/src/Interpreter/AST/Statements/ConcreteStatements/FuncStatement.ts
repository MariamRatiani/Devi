import { Statement } from "../Interfaces/Statement";
import { StatementVisitor } from "../Interfaces/Visitor";

export class FuncStatement extends Statement {
    funcName: string

    constructor(funcName: string) {
        super()
        this.funcName = funcName
    }

    async accept(visitor: StatementVisitor): Promise<void> {
        await visitor.doFuncStatement(this)
    }
    
}