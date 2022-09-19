import { Component, Show } from 'solid-js';
import clsx from 'clsx';

import Intro from './Intro';
import Game from './Game';
import GameOverModal from './GameOverModal';
import { AMOUNT_OF_TRIES } from '../utils/consts';
import { difficultySignal, triesSignal } from '../stores/AppContext';

const App: Component = () => {
  const [difficulty] = difficultySignal;
  const [tries] = triesSignal;
  return (
    <>
      <div class={clsx('w-full', 'h-screen', 'bg-palette-b', 'flex', 'flex-col')}>
        <Show when={difficulty() !== undefined} fallback={<Intro />}>
          <Game />
        </Show>
        <Show when={tries() === AMOUNT_OF_TRIES}>
          <GameOverModal />
        </Show>
      </div>
    </>
  );
};

export default App;
