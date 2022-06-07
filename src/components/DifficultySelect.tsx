import { For } from 'solid-js';
import { useAppContext } from '../stores/AppContext';
import { difficulties } from '../utils/utils';

export const DifficultySelect = () => {
  const { setDifficulty, setScore, setTries } = useAppContext();
  return (
    <select
      value={undefined}
      onChange={(e) => {
        setDifficulty(
          difficulties[
            (e.target as EventTarget & HTMLSelectElement).selectedIndex - 1
          ].value
        );
        setScore(0);
        setTries(0);
      }}
    >
      <option style="display:none" />
      <For each={difficulties}>
        {(difficulty) => (
          <option value={difficulty.value}>{difficulty.label}</option>
        )}
      </For>
    </select>
  );
};
