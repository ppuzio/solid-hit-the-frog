import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  Setter,
} from 'solid-js';
import { DifficultiesValue } from '../utils/utils';

interface StoreProvider {
  tries: Accessor<number>;
  setTries: Setter<number>;
  score: Accessor<number>;
  setScore: Setter<number>;
  difficulty: Accessor<DifficultiesValue | undefined>;
  setDifficulty: Setter<DifficultiesValue | undefined>;
}

const [difficulty, setDifficulty] = createSignal<
  DifficultiesValue | undefined
>();

const [tries, setTries] = createSignal(0);
const [score, setScore] = createSignal<number>(0);

const AppContext = createContext<StoreProvider | undefined>(undefined);

interface PropsType {
  children: JSX.Element;
}

export function AppProvider(props: PropsType) {
  const store = { tries, setTries, score, setScore, difficulty, setDifficulty };

  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('Component beyond the reach of AppContext');
  }

  return ctx;
}
