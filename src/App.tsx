import { Accessor, Component, createSignal, Show } from 'solid-js';
import clsx from 'clsx';

import { DifficultiesValue } from './utils';
import Intro from './Intro';
import Game from './Game';
import GameOverModal from './GameOverModal';
import { AMOUNT_OF_TRIES } from './consts';

const container = clsx(
  'w-full',
  'h-screen',
  'bg-palette-b',
  'flex',
  'flex-col'
);

const App: Component = () => {
  const [difficulty, setDifficulty] = createSignal<
    DifficultiesValue | undefined
  >();

  const [tries, setTries] = createSignal(0);
  const [score, setScore] = createSignal<number>(0);

  return (
    <>
      <div class={container}>
        <Show
          when={difficulty() !== undefined}
          fallback={<Intro setDifficulty={setDifficulty} />}
        >
          <Game
            difficulty={difficulty as unknown as Accessor<DifficultiesValue>}
            tries={tries}
            score={score}
            setScore={setScore}
            setTries={setTries}
          />
        </Show>
        <Show when={tries() === AMOUNT_OF_TRIES}>
          <GameOverModal
            score={score}
            setDifficulty={setDifficulty}
            setScore={setScore}
            setTries={setTries}
          />
        </Show>
      </div>
    </>
  );
};

export default App;
