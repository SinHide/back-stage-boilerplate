import { combineReducers } from 'redux'
import app from '../reducer'
import locales from 'i18n/reducer'

export default combineReducers({
  app,
  locales,
})