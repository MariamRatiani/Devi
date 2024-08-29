import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame.tsx';
import './playground.css';
import GeorgianCodeEditor from "../editor/GeorgianLanguageEditor.tsx";
import { EventBus } from '../game/EventBus.ts';
import LanguageRulesModal from "../editor/LanguageRulesModal.tsx";

function Playground() {
    const [code, setCode] = useState('// დაწერე კოდი აქ');
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const editorRef = useRef<any>(null);
    const [showRules, setShowRules] = useState(false); 
    const [showNotification, setShowNotification] = useState(false); 

    const currentScene = (scene: Phaser.Scene) => {
        console.log(scene);
    };

    useEffect(() => {
        const handleSpaceKeyPress = () => {
            if (editorRef.current) {
                const cursorPosition = editorRef.current.getCursorPosition();
                console.log('Cursor position:', cursorPosition);

                setCode((prevCode) => {
                    const newCode = prevCode.substring(0, cursorPosition) + ' ' + prevCode.substring(cursorPosition);

                    setTimeout(() => {
                        if (editorRef.current) {
                            editorRef.current.setCursorPosition(cursorPosition + 1); // +1 to account for added space
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

    // Implement the Reset Game functionality
    const didTapOnResetGame = () => {
        if (phaserRef.current?.scene) {
            phaserRef.current.scene.scene.restart(); 
            displayNotification();
        }
    }

    // Toggle modal visibility
    const toggleRulesModal = () => {
        setShowRules(!showRules);
    };

    // Display notification function
    const displayNotification = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2500); // Change the duration to match the CSS transition timing
    };

    return (
        <div className="playground">
            <div className="phaserGameContainer">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            </div>

            <div className="editorContainer">
                <GeorgianCodeEditor ref={editorRef} code={code} setCode={setCode} />
                <div className="button-container">
                    <button className="stylish-button" onClick={didTapOnRunCode}>კოდის გაშვება</button>
                    <button className="stylish-button" onClick={didTapOnResetCode}>კოდის გასუფთავება</button>
                    <button className="stylish-button" onClick={didTapOnResetGame}>თამაშის თავიდან დაწყება</button>
                </div>
                <button className="help-button" onClick={toggleRulesModal}>?</button>
            </div>

            <div className={`notification ${showNotification ? '' : 'notification-hidden'}`}>თამაში დაიწყო!</div>

            {showRules && <LanguageRulesModal onClose={toggleRulesModal} />}
        </div>
    );
}

export default Playground;
