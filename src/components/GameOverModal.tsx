import { Component } from 'solid-js';

import clsx from 'clsx';
import { AMOUNT_OF_TRIES } from '../utils/consts';
import { useAppContext } from '../stores/AppContext';
import { DifficultySelect } from './DifficultySelect';

const GameOverModal: Component = () => {
  const store = useAppContext();
  return (
    <main
      class={clsx(
        'flex',
        'items-center',
        'justify-center',
        'h-full',
        'w-full',
        'absolute',
        'top-0',
        'left-0',
        'bg-white/50'
      )}
    >
      <section
        class={clsx(
          'w-96',
          'h-96',
          'bg-palette-e',
          'flex',
          'flex-col',
          'items-center',
          'rounded-lg',
          'justify-center'
        )}
      >
        <h1>Game over! </h1>
        <h2>
          Your score - {store.score()} / {AMOUNT_OF_TRIES}
        </h2>
        <p>Want to play again?</p>
        <p>Choose your difficulty</p>
        <DifficultySelect />
      </section>
    </main>
  );
};

export default GameOverModal;
