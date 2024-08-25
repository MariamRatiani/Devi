import React, { useImperativeHandle, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sublime } from '@uiw/codemirror-theme-sublime';

interface GeorgianCodeEditorProps {
    code: string;
    setCode: (code: string) => void;
}

const extensions = [javascript({ jsx: true })];

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
            theme={sublime}
            extensions={extensions}
            onChange={(value: string) => {
                setCode(value);
            }}
            className="CodeMirror" // Apply custom class
        />
    );
});

export default GeorgianCodeEditor;
