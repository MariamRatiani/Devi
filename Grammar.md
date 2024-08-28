## should design structure and nodes for the next Grammar:
### TERMINALS:
Statement:
- IfStatement
- WhileStatement
- VarStatement
- ForStatement
- FuncStatement

FuncStatement: ```*funcName*(args);```

Statements: Statement*

VarStatement: ```*Type* varname = *Expression*;```

VarAsignStatement: ```varname = *Expression*;```

IfStatement:
```
თუ (*Expression*) { 
*Statements*
} 
```
WhileStatement:
```
სანამ (*Expression*) { 
*Statements*
}
```
ForStatement:
```
გაიმეორე  (*Expression*) { 
*Statements*
}
```
Expression: *Term* (*Op* *Term*)

### NONTERMINALS:
Type: სიტყვა, რიცხვი, ბულეანი
Term: varName / NumberConstant / BooleanConstant
varName: String
NumberConstant: number
BooleanConstant: ჭეშმარიტი, მცდარი
Op: ‘+’, ‘-’, ‘=’, ‘>’, ‘<’, ‘*’, ‘/’

## KeyWord

```
["და", TokenType.AND],
["გაიმეორე", TokenType.FOR],
["ჭეშმარიტი", TokenType.TRUE],
["მცდარი", TokenType.FALSE],
["სანამ", TokenType.WHILE],
["თუ", TokenType.IF],
["ან", TokenType.OR],
["რიცხვი", TokenType.VAR_TYPE],
["სიტყვა", TokenType.VAR_TYPE],
["ბულეანი", TokenType.VAR_TYPE],
```

- Function Keywords
```
MOVE_MAIN_CHARACTER = 'წინ'
JUMP_MAIN_CHARACTER = 'ახტომა'
``` 
