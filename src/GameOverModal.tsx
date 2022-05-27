import { Accessor, Component, For, Setter } from 'solid-js';

import clsx from 'clsx';
import { difficulties, DifficultiesValue } from './utils';
import { AMOUNT_OF_TRIES } from './consts';

const container = clsx(
  'flex',
  'items-center',
  'justify-center',
  'h-full',
  'w-full',
  'absolute',
  'top-0',
  'left-0',
  'bg-white/50'
);

const introWrapper = clsx(
  'w-96',
  'h-96',
  'bg-palette-e',
  'flex',
  'flex-col',
  'items-center',
  'rounded-lg',
  'justify-center'
);

interface PropsType {
  setDifficulty: Setter<DifficultiesValue>;
  setTries: Setter<number>;
  setScore: Setter<number>;
  score: Accessor<number>;
}

const GameOverModal: Component<PropsType> = (props) => (
  <main class={container}>
    <section class={introWrapper}>
      <h1>Game over! </h1>
      <h2>
        Your score - {props.score()} / {AMOUNT_OF_TRIES}
      </h2>
      <p>Want to play again?</p>
      <p>Choose your difficulty</p>
      <select
        value={undefined}
        onChange={(e) => {
          props.setDifficulty(
            difficulties[
              (e.target as EventTarget & HTMLSelectElement).selectedIndex - 1
            ].value
          );
          props.setScore(0);
          props.setTries(0);
        }}
      >
        <option style="display:none" />
        <For each={difficulties}>
          {(difficulty) => (
            <option value={difficulty.value}>{difficulty.label}</option>
          )}
        </For>
      </select>
    </section>
  </main>
);

export default GameOverModal;
