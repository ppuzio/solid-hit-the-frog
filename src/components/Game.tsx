import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Index,
  onCleanup,
} from 'solid-js';

import clsx from 'clsx';
import { difficulties, rechargeTime, tiles } from '../utils/utils';
import { AMOUNT_OF_TRIES } from '../utils/consts';
import useWindowSize from '../utils/useWindowSize';
import { useAppContext } from '../stores/AppContext';

const { windowSize } = useWindowSize();
const isVertical = windowSize().height > windowSize().width;

const Game: Component = () => {
  const { tries, setTries, difficulty, score, setScore } = useAppContext();

  const [activeTile, setActiveTile] = createSignal(-1);
  const [wasClicked, setWasClicked] = createSignal(false);

  createEffect(() => {
    const interval = setInterval(() => {
      setActiveTile(Math.floor(Math.random() * 9));

      setTimeout(() => {
        setActiveTile(-1);
        // if someone scored - don't increase the tries, it was done in tileOnClick
        if (!wasClicked()) {
          setTries((tries) => tries + 1);
        } else {
          setWasClicked(false);
        }
      }, Number(difficulty()));
    }, rechargeTime[difficulty()!]);

    if (tries() === AMOUNT_OF_TRIES) {
      clearInterval(interval);
    }

    onCleanup(() => clearInterval(interval));
  });

  const tileOnClick = (tileValue: Accessor<number>) => {
    if (tileValue() === activeTile()) {
      setScore((score) => score + 1);
      setTries((tries) => tries + 1);
      setWasClicked(true);
    }
    setActiveTile(-1);
  };

  const selectedDiff = () =>
    difficulties.find((d) => d.value === difficulty())?.label;

  return (
    <>
      <header
        class={clsx('px-8', 'py-2', 'flex', 'justify-between', 'bg-palette-c')}
      >
        <div>
          <p class={'font-bold'}>Difficulty</p>
          {selectedDiff()}
        </div>
        <div class={clsx('text-right')}>
          <p class={'font-bold'}>Score</p>
          {score()} / {tries()}
        </div>
      </header>
      <div
        class={clsx(
          'grid',
          'gap-4',
          'grid-cols-3',
          'grid-rows-3',
          'mx-auto',
          'my-auto',
          'p-4'
        )}
        style={{
          width: isVertical ? '100%' : `${windowSize().height - 64}px`,
          height: isVertical ? `${windowSize().width}px` : '100%',
        }}
      >
        <Index each={tiles}>
          {(tileValue) => (
            <div
              onClick={() => tileOnClick(tileValue)}
              class={clsx(
                'bg-palette-a',
                'rounded-full',
                tileValue() === activeTile() && 'bg-palette-d'
              )}
            />
          )}
        </Index>
      </div>
    </>
  );
};

export default Game;
