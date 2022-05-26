import {
  Accessor, Component, For, Setter,
} from 'solid-js';

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
  'bg-white/50',
);

const introWrapper = clsx(
  'w-96',
  'h-96',
  'bg-palette-e',
  'flex',
  'flex-col',
  'items-center',
  'justify-center',
);

interface PropsType {
  setDifficulty: Setter<DifficultiesValue>;
  setTries: Setter<number>;
  score: Accessor<number>;
}

const GameOverModal: Component<PropsType> = (props) => (
  <main class={container}>
    <section class={introWrapper}>
      <p>
        Game over! Your score - {props.score()} / {AMOUNT_OF_TRIES}
      </p>
      <p>Want to play again?</p>
      <p>Choose your difficulty</p>
      <select
        onChange={(e) => {
          props.setDifficulty(
            difficulties[
              (e.target as EventTarget & HTMLSelectElement).selectedIndex
            ].value,
          );
          props.setTries(0);
        }}
      >
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
