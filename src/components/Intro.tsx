import { Component } from 'solid-js';

import clsx from 'clsx';
import { DifficultySelect } from './DifficultySelect';

const Intro: Component = () => (
  <main class={clsx('flex', 'items-center', 'justify-center', 'h-full')}>
    <section
      class={clsx('w-96', 'h-96', 'bg-palette-e', 'flex', 'rounded-lg', 'flex-col', 'items-center', 'justify-center')}
    >
      <h1>Welcome to Whac-a-mole(beta)!</h1>
      <h2>Choose your difficulty</h2>
      <DifficultySelect />
    </section>
  </main>
);

export default Intro;
