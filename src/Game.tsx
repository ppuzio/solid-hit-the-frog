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
import useWindowSize from './useWindowSize';

const tileContainer = clsx(
  'grid',
  'gap-4',
  'grid-cols-3',
  'grid-rows-3',
  'mx-auto',
  'my-auto',
  'p-4'
);

const tile = clsx('bg-palette-a', 'rounded-full');

const score = clsx('text-right');

const header = clsx('px-8', 'py-2', 'flex', 'justify-between', 'bg-palette-c');

interface PropsType {
  difficulty: Accessor<DifficultiesValue>;
  tries: Accessor<number>;
  setTries: Setter<number>;
  score: Accessor<number>;
  setScore: Setter<number>;
}

const { windowSize } = useWindowSize();
const isVertical = windowSize().height > windowSize().width;

const Game: Component<PropsType> = (props) => {
  const [activeTile, setActiveTile] = createSignal(-1);
  const [wasClicked, setWasClicked] = createSignal(false);

  createEffect(() => {
    const interval = setInterval(() => {
      setActiveTile(Math.floor(Math.random() * 9));

      setTimeout(() => {
        setActiveTile(-1);
        // if someone scored - don't increase the tries, it was done in tileOnClick
        if (!wasClicked()) {
          props.setTries((tries) => tries + 1);
        } else {
          setWasClicked(false);
        }
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
      props.setTries((tries) => tries + 1);
      setWasClicked(true);
    }
    setActiveTile(-1);
  };

  const selectedDiff = () =>
    difficulties.find((d) => d.value === props.difficulty())?.label;

  return (
    <>
      <header class={header}>
        <div>
          <p class={'font-bold'}>Difficulty</p>
          {selectedDiff()}
        </div>
        <div class={score}>
          <p class={'font-bold'}>Score</p>
          {props.score()} / {props.tries()}
        </div>
      </header>
      <div
        class={tileContainer}
        style={{
          width: isVertical ? '100%' : `${windowSize().height - 64}px`,
          height: isVertical ? `${windowSize().width}px` : '100%',
        }}
      >
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
