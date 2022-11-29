import asyncPool from './';

const delay = <T>(fn: () => T, ms: number): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(fn()), ms));
};

describe('asyncPool', () => {
  test('should behave like Promise.all', async () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const mapper = (value: number) => delay(() => value + 1, value * 10);

    const expectedResults = await Promise.all(values.map(mapper));
    const results = await asyncPool(2, values, mapper);

    expect(results).toEqual(expectedResults);
  });
});
