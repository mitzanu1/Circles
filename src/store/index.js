import { createStore } from 'redux'
import reducer from './reducer'

const state = {}
  
const store = createStore(
  reducer,
  state,
  (global.__REDUX_DEVTOOLS_EXTENSION__)
    ? global.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
)

export default store