export const tiles = new Array(9).fill(null).map((_, i) => i);

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export const difficulties = [
  { value: '1500', label: 'Easy - 1.5s, new every 5s' },
  { value: '1000', label: 'Difficult - 1s, new every 4s' },
  { value: '500', label: 'Harder - 0.50s, new every 3s' },
  { value: '375', label: 'Hardcore - 0.375s, new every 2.5s' },
  { value: '250', label: 'Hardcore - 0.25s, new every 2s' },
] as const;

export type DifficultiesValue = ArrayElement<typeof difficulties>['value'];

export const rechargeTime: Record<DifficultiesValue, number> = {
  1500: 5000,
  1000: 4000,
  500: 3000,
  375: 2500,
  250: 2000,
};
