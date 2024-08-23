import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

interface GeorgianCodeEditorProps {
    code: string;
    setCode: (code: string) => void;
}

const extensions = [javascript({ jsx: true })];

function GeorgianCodeEditor({ code, setCode }: GeorgianCodeEditorProps) {
    return (
        <CodeMirror
          value={code}
          height="200px"
          theme={okaidia}
          extensions={extensions}
          onChange={(value, viewUpdate) => {
            console.log(value, viewUpdate);  
            setCode(value);      
          }}
        />
      );
}

export default GeorgianCodeEditor;
