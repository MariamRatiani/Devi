import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame.tsx';
import './playground.css';
import GeorgianCodeEditor from "../editor/GeorgianLanguageEditor.tsx";
import { EventBus } from '../game/EventBus.ts';

function Playground() {
    const [code, setCode] = useState('// დაწერე კოდი აქ');
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const editorRef = useRef<any>(null);  // Adjusted the type for editorRef

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        console.log(scene);
    };

    useEffect(() => {
        const handleSpaceKeyPress = () => {
            if (editorRef.current) {
                // Capture the current cursor position
                const cursorPosition = editorRef.current.getCursorPosition();
                console.log('Cursor position:', cursorPosition);

                // Update the code and maintain cursor position
                setCode((prevCode) => {
                    const newCode = prevCode.substring(0, cursorPosition) + ' ' + prevCode.substring(cursorPosition);

                    // Schedule setting the cursor after the code updates
                    setTimeout(() => {
                        if (editorRef.current) {
                            editorRef.current.setCursorPosition(cursorPosition + 1);  // +1 to account for added space
                        }
                    }, 0);

                    return newCode;
                });
            }
        };

        EventBus.on('space-key-pressed', handleSpaceKeyPress);

        return () => {
            EventBus.removeListener('space-key-pressed', handleSpaceKeyPress);
        };
    }, []);

    const didTapOnRunCode = () => {
        if (phaserRef.current) {
            phaserRef.current.sceneViewModel?.startCodeExecution(code);
        }
    };

    const didTapOnResetCode = () => {
        setCode('');
    };

    return (
        <div className="playground">
            <div className="phaserGameContainer">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            </div>

            <div className="editorContainer">
                <GeorgianCodeEditor ref={editorRef} code={code} setCode={setCode} />
                <div className="button-container">
                    <button className="stylish-button" onClick={didTapOnRunCode}>Run Code</button>
                    <button className="stylish-button" onClick={didTapOnResetCode}>Reset Code</button>
                </div>
            </div>
        </div>
    );
}

export default Playground;
