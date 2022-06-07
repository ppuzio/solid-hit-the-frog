import { Component, Show } from 'solid-js';
import clsx from 'clsx';

import Intro from './Intro';
import Game from './Game';
import GameOverModal from './GameOverModal';
import { AMOUNT_OF_TRIES } from '../utils/consts';
import { AppProvider, useAppContext } from '../stores/AppContext';

const App: Component = () => {
  const { difficulty, tries } = useAppContext();

  return (
    <>
      <div
        class={clsx('w-full', 'h-screen', 'bg-palette-b', 'flex', 'flex-col')}
      >
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

const AppWithProvider = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default AppWithProvider;
