import sleep from '../../util/sleep'
import series from '../series'

it('execute promise-returning functions serially', async () => {
  const called: number[] = []

  /** Generates an asynchronous task that pushes to called, delays, and returns. */
  const makeDelay = (n: number) => {
    // eslint-disable-next-line fp/no-mutating-methods
    called.push(n)
    return () => sleep(n).then(() => n)
  }

  const result = await series([makeDelay(100), makeDelay(200), makeDelay(10)])

  expect(called).toEqual([100, 200, 10])
  expect(result).toEqual([100, 200, 10])
})
