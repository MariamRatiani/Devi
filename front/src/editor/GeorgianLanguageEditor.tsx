import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sublime } from '@uiw/codemirror-theme-sublime';

interface GeorgianCodeEditorProps {
    code: string;
    setCode: (code: string) => void;
}

const extensions = [javascript({ jsx: true })];

function GeorgianCodeEditor({ code, setCode }: GeorgianCodeEditorProps) {
  return (
      <CodeMirror
        value={code}
        height="100%"
        theme={sublime}
        extensions={extensions}
        onChange={(value, viewUpdate) => {
          console.log(value, viewUpdate);
          setCode(value);
        }}
        className="CodeMirror" // Apply custom class
      />
  );
}

export default GeorgianCodeEditor;
