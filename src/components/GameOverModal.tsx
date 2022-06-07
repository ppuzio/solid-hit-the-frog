import { Component, createSignal, onMount, Show } from 'solid-js';

import clsx from 'clsx';
import { AMOUNT_OF_TRIES } from '../utils/consts';
import { useAppContext } from '../stores/AppContext';
import { DifficultySelect } from './DifficultySelect';

const [isHighScore, setIsHighScore] = createSignal(false);

const GameOverModal: Component = () => {
  const store = useAppContext();

  const [difficultyHighScore, setDifficultyHighScore] = createSignal('0');

  onMount(() => {
    const highScoreFromStorage = localStorage.getItem(
      `high-score-${store.difficulty()}`
    );

    highScoreFromStorage && setDifficultyHighScore(highScoreFromStorage);

    if (Number(highScoreFromStorage) < store.score()) {
      setIsHighScore(true);
      localStorage.setItem(
        'high-score-' + store.difficulty(),
        `${store.score()}`
      );
    }
  });

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
        <h1 class={clsx('font-bold')}>Game over! </h1>
        <h2 class={clsx('mt-2', 'flex', 'gap-1')}>
          <p>Your score:</p>
          <p class={clsx('font-semibold')}>
            {store.score()} / {AMOUNT_OF_TRIES}
          </p>
        </h2>
        <Show
          fallback={() => (
            <h3 class={clsx('p-4', 'flex')}>
              High score for this level:
              <p class={clsx('font-semibold')}>{difficultyHighScore()}</p>
            </h3>
          )}
          when={isHighScore()}
        >
          <h3 class={'p-4'}>New high score achieved!</h3>
        </Show>
        <p>Want to play again?</p>
        <p class={'pb-4'}>Choose your difficulty</p>
        <DifficultySelect />
      </section>
    </main>
  );
};

export default GameOverModal;
