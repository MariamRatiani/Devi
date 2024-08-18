import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'; 
import './georgianLanguageMode.ts'
import 'codemirror/theme/twilight.css';

interface GeorgianCodeEditorProps {
    code: string;
    setCode: (code: string) => void;
}

function GeorgianCodeEditor({ code, setCode }: GeorgianCodeEditorProps) {
    return (
        <CodeMirror
            value={code}
            options={{
                mode: 'georgianLanguage', 
                theme: 'twilight', 
                lineNumbers: true,
            }}
            onChange={(_, __, value) => {
                setCode(value);
            }}
        />
    );
}

export default GeorgianCodeEditor;
