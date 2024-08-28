import { Expression } from "../../Expressions/Expression";
import { Statement } from "../Interfaces/Statement";
import { StatementVisitor } from "../Interfaces/Visitor";
import { VarType } from "./Environment";

export class VarStatement extends Statement {
    type: VarType
    name: string
    intializer: Expression

    constructor(type: VarType, name: string, initalizer: Expression) {
        super()
        this.type = type 
        this.name = name
        this.intializer = initalizer
    }
    
    async accept(visitor: StatementVisitor): Promise<void> {
        await visitor.doVarStatement(this)
    }
}

export class VarAsignStatement extends Statement {
    name: string
    asigner: Expression

    constructor(name: string, asigner: Expression) {
        super()
        this.name = name
        this.asigner = asigner
    }

    async accept(visitor: StatementVisitor): Promise<void> {
        await visitor.doVarAsignStatement(this)
    }
}
