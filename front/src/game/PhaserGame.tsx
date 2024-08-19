import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';
import { SceneViewModel, SceneViewModelImpl } from './SceneViewModel';

export interface IRefPhaserGame
{
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
    sceneViewModel: SceneViewModel | null
} 

interface IProps
{
    currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

export const  PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene }, ref)
{
    const game = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() =>
    {
        if (game.current === null)
        {

            game.current = StartGame("game-container");

            if (typeof ref === 'function')
            {
                ref({ game: game.current, scene: null, sceneViewModel: null });
            } else if (ref)
            {
                ref.current = { game: game.current, scene: null, sceneViewModel: null };
            }

        }

        return () =>
        {
            if (game.current)
            {
                game.current.destroy(true);
                if (game.current !== null)
                {
                    game.current = null;
                }
            }
        }
    }, [ref]);

    useEffect(() =>
    {
        EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) =>
        {
            if (currentActiveScene && typeof currentActiveScene === 'function')
            {

                currentActiveScene(scene_instance);

            }

            const sceneViewModel = new SceneViewModelImpl(scene_instance as unknown as SceneInteractable)
            if (typeof ref === 'function')
            {
                ref({ game: game.current, scene: scene_instance, sceneViewModel: sceneViewModel });
            } else if (ref)
            {
                ref.current = { game: game.current, scene: scene_instance, sceneViewModel: sceneViewModel };
            }
            
        });
        return () =>
        {
            EventBus.removeListener('current-scene-ready');
        }
    }, [currentActiveScene, ref]);

    return (
        <div id="game-container"></div>
    );

});
