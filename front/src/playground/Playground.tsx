import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame.tsx';
import './playground.css';
import GeorgianCodeEditor from "../editor/GeorgianLanguageEditor.tsx";
import { EventBus } from '../game/EventBus.ts';

function Playground()
{
    const [code, setCode] = useState('// დაწერე კოდი აქ');
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        console.log(scene)
    }

    useEffect(() => {
        const handleSpaceKeyPress = () => {
            setCode((prevCode) => prevCode + ' ');  // Append space to the current code
        };

        EventBus.on('space-key-pressed', handleSpaceKeyPress);

        return () => {
            EventBus.removeListener('space-key-pressed', handleSpaceKeyPress);
        };
    }, []);

    const didTapOnRunCode = () => {
        if (phaserRef.current) {
            console.log(code)
            phaserRef.current.sceneViewModel?.startCodeExecution(code)
        }
    };

    return (
        <div className="playground">
            <div className="phaserGameContainer">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            </div>

            <div className="editorContainer">
                <GeorgianCodeEditor code={code} setCode={setCode} />
            </div>
            <div>
                <button onClick={didTapOnRunCode}>Run Code</button>
            </div>
        </div>
    )
}


export default Playground