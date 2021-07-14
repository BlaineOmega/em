import { Shortcut } from '../@types'
import { bumpThoughtDown } from '../action-creators'
import { asyncFocus, isDocumentEditable } from '../util'

const bumpThoughtDownShortcut: Shortcut = {
  id: 'bumpThought',
  label: 'Bump Thought Down',
  description: 'Bump the current thought down to its children and replace with empty text.',
  gesture: 'rld',
  keyboard: { key: 'd', meta: true, alt: true },
  canExecute: getState => !!getState().cursor && isDocumentEditable(),
  exec: dispatch => {
    asyncFocus()
    dispatch(bumpThoughtDown())
  },
}

export default bumpThoughtDownShortcut
