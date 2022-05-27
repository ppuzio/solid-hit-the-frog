import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Index,
  onCleanup,
  Setter,
} from 'solid-js';

import clsx from 'clsx';
import { difficulties, DifficultiesValue, rechargeTime, tiles } from './utils';
import { AMOUNT_OF_TRIES } from './consts';

const tileContainer = clsx(
  'grid',
  'gap-4',
  'h-full',
  'grid-cols-3',
  'grid-rows-3',
  'p-4'
);

const tile = clsx('bg-palette-a', 'rounded-lg');

const header = clsx('px-8', 'py-2', 'flex', 'justify-between', 'bg-palette-c');

interface PropsType {
  difficulty: Accessor<DifficultiesValue>;
  tries: Accessor<number>;
  setTries: Setter<number>;
  score: Accessor<number>;
  setScore: Setter<number>;
}

const Game: Component<PropsType> = (props) => {
  const [activeTile, setActiveTile] = createSignal(-1);

  createEffect(() => {
    const interval = setInterval(() => {
      setActiveTile(Math.floor(Math.random() * 9));

      setTimeout(() => {
        setActiveTile(-1);
        props.setTries((tries) => tries + 1);
      }, Number(props.difficulty()));
    }, rechargeTime[props.difficulty()]);
    if (props.tries() === AMOUNT_OF_TRIES) {
      clearInterval(interval);
    }
    onCleanup(() => clearInterval(interval));
  });

  const tileOnClick = (tileValue: Accessor<number>) => {
    if (tileValue() === activeTile()) {
      props.setScore((score) => score + 1);
    }
    setActiveTile(-1);
  };

  const selectedDiff = () =>
    difficulties.find((d) => d.value === props.difficulty())?.label;

  return (
    <>
      <header class={header}>
        <p>Difficulty: {selectedDiff()} </p>
        <p>
          Score: {props.score()} / {props.tries()}
        </p>
      </header>
      <div class={tileContainer}>
        <Index each={tiles}>
          {(tileValue) => (
            <div
              onClick={() => tileOnClick(tileValue)}
              class={clsx(tile, tileValue() === activeTile() && 'bg-palette-d')}
            />
          )}
        </Index>
      </div>
    </>
  );
};

export default Game;
