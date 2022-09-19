import { createSignal } from 'solid-js';
import { DifficultiesValue } from '../utils/utils';

export const difficultySignal = createSignal<DifficultiesValue | undefined>();

export const triesSignal = createSignal(0);
export const scoreSignal = createSignal<number>(0);
