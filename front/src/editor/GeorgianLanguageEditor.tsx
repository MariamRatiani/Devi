import React, { useImperativeHandle, useRef } from 'react';
import CodeMirror, {EditorView} from '@uiw/react-codemirror';
// import {sublime} from "@uiw/codemirror-theme-sublime";
import {dracula} from "thememirror";
import './ForestSceneEditorStyle.scss'
import {javascript} from "@codemirror/lang-javascript";


interface GeorgianCodeEditorProps {
    code: string;
    setCode: (code: string) => void;
}

// const extensions = [javascript({ jsx: true })];

const extensions = [
    javascript(),
    EditorView.theme({
        "&.cm-editor": {
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
        },
        ".cm-content": {
            caretColor: "var(--text-color)", // Cursor color
        },
        ".cm-gutters": {
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
            border: "none",
        },
        ".cm-line": {
            color: "var(--text-color)", // Default text color
        },
        ".cm-keyword": {
            color: "var(--keyword-color)", // Color for keywords
            fontWeight: "bold", // Optionally make keywords bold
        },
        ".cm-string": {
            color: "var(--string-color)", // Color for strings
        },
        ".cm-comment": {
            color: "var(--comment-color)", // Color for comments
            fontStyle: "italic", // Optionally make comments italic
        },
        ".cm-number": {
            color: "var(--number-color)", // Color for numbers
        },
        ".cm-variableName": {
            color: "var(--variable-color)", // If you want to add a variable color
        },
        ".cm-function": {
            color: "var(--function-color)", // If you want to add a function color
        },
        ".cm-operator": {
            color: "var(--operator-color)", // If you want to add an operator color
        },
        ".cm-bracket": {
            color: "var(--bracket-color)", // If you want to style brackets
        },
        ".cm-tag": {
            color: "var(--tag-color)", // If you are using HTML or XML
        },
        ".cm-attribute": {
            color: "var(--attribute-color)", // For attributes in HTML/XML
        },
        ".cm-type": {
            color: "var(--type-color)", // For types in languages that support them
        },
        ".cm-property": {
            color: "var(--property-color)", // For object properties
        },
    }, { dark: true }) // Optional: mark this theme as dark
];


const GeorgianCodeEditor = React.forwardRef((props: GeorgianCodeEditorProps, ref) => {
    const { code, setCode } = props;
    const editorRef = useRef<any>(null);

    // Expose methods to parent component using useImperativeHandle
    useImperativeHandle(ref, () => ({
        getCursorPosition: () => {
            if (editorRef.current) {
                // Get the CodeMirror view
                const view = editorRef.current.view;
                if (view) {
                    const cursor = view.state.selection.main.head;
                    return cursor;
                }
            }
            return 0;
        },
        setCursorPosition: (position: number) => {
            if (editorRef.current) {
                const view = editorRef.current.view;
                if (view) {
                    // Move the cursor to the new position
                    view.dispatch({
                        selection: { anchor: position, head: position }
                    });
                }
            }
        }
    }));

    return (
        <CodeMirror
            ref={editorRef}
            value={code}
            height="100%"
            theme={dracula} 
            extensions={extensions}
            onChange={(value: string) => {
                setCode(value);
            }}
            className="CodeMirror"
            style={{ fontSize: '24px' }}
        />
    );
});

export default GeorgianCodeEditor;
