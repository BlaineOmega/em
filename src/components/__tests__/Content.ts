import { ReactWrapper } from 'enzyme'
import deleteThoughtWithCursor from '../../action-creators/deleteThoughtWithCursor'
import importText from '../../action-creators/importText'
import contextToPath from '../../selectors/contextToPath'
import store from '../../stores/app'
import createTestApp, { cleanupTestApp } from '../../test-helpers/createTestApp'
import EmptyThoughtspace from '../EmptyThoughtspace'

let wrapper: ReactWrapper<unknown, unknown>

beforeEach(async () => {
  wrapper = await createTestApp()
})

afterEach(cleanupTestApp)

it('show EmptyThoughtspace when there are no visible thoughts in the root context', () => {
  // EmptyThoughtspace should be visible when there are no thoughts
  expect(wrapper.find(EmptyThoughtspace)).toHaveLength(1)

  store.dispatch(
    importText({
      text: `
      - a
      - b
      - =test
    `,
    }),
  )

  wrapper.update()

  // EmptyThoughtspace should not be visible when there is at least one visible thought
  expect(wrapper.find(EmptyThoughtspace)).toHaveLength(0)

  store.dispatch(
    deleteThoughtWithCursor({
      path: contextToPath(store.getState(), ['b'])!,
    }),
  )

  // still has one visible thought
  expect(wrapper.find(EmptyThoughtspace)).toHaveLength(0)

  store.dispatch(
    deleteThoughtWithCursor({
      path: contextToPath(store.getState(), ['b'])!,
    }),
  )

  wrapper.update()

  // There are no visible thoughts
  expect(wrapper.find(EmptyThoughtspace)).toHaveLength(1)
})
