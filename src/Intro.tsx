import { Component, For, Setter } from 'solid-js';

import clsx from 'clsx';
import { difficulties, DifficultiesValue } from './utils';

const container = clsx('flex', 'items-center', 'justify-center', 'h-full');

const introWrapper = clsx(
  'w-96',
  'h-96',
  'bg-palette-e',
  'flex',
  'rounded-lg',
  'flex-col',
  'items-center',
  'justify-center',
);

interface PropsType {
  setDifficulty: Setter<DifficultiesValue | undefined>;
}

const Intro: Component<PropsType> = (props) => (
  <main class={container}>
    <section class={introWrapper}>
      <p>Choose your difficulty</p>
      <select
        onChange={(e) => {
          props.setDifficulty(
            difficulties[
              (e.target as EventTarget & HTMLSelectElement).selectedIndex
            ].value,
          );
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

export default Intro;
