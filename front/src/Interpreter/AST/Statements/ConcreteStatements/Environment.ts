export interface IEnvironment {
    setParentEnvironment(parentEnv: Environment): void;
    getParentEnvironment(): Environment
    addOrSetVariable(variable: Variable): void;
    shouldBeAdded(variable: Variable): boolean;
    getVariable(name: string): Variable | undefined;
}

export class Environment implements Environment {
    private env: Map<string, Variable>
    private parentEnv: Environment

    constructor() {
        this.env = new Map()
    }

    setParentEnvironment(parentEnv: Environment) {
        this.parentEnv = parentEnv
    }

    getParentEnvironment(): Environment {
        return this.parentEnv
    }

    addVariable(variable: Variable) {
        this.env.set(variable.name, variable);
    }

    setVariable(varName: string, varValue: VarValue): boolean {
        if (this.variableDoExist(varName)) {
            const variable = this.env.get(varName)
            this.env.set(varName, new Variable(variable?.type!, varName, varValue));
            return true
        } else {
            return false
        }
    }

    variableDoExist(varName: string): boolean {
        return this.env.has(varName)
    }

    getVariable(name: string): Variable | undefined {
        if (this.env.has(name)) {
            return this.env.get(name)
        }
        return this.parentEnv.getVariable(name)
    }
}

export class Variable {
    type: VarType
    name: string
    value: VarValue

    constructor(type: VarType, name: string, value: VarValue) {
        this.type = type
        this.name = name
        this.value = value
    }
}

export type VarValue = string | boolean | number

export enum VarType {
    STRING = "სიტყვა",
    NUMBER = "რიცხვი",
    BOOLEAN = "ბულეანი"
}