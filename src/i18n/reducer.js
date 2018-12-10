import createReducer from 'utils/createReducer'
import locales from 'i18n/locale.json'

const defaultState = () => ({
  lang: 'zh',
  messages: tansformLocaleLang('zh'),
})

const tansformLocaleLang = (lang) => {
  const getMessages = key => locales[key]

  switch (lang) {
    case 'en':
        return getMessages('en_US')
    case 'zh':
        return getMessages('zh_CN')
    default:
        return getMessages('zh_CN')
  }
}

const localeUpdateLang = (state, action) => ({
  ...state,
  lang: action.payload,
  messages: tansformLocaleLang(action.payload),
})

export default createReducer(defaultState, {
  LOCALES_UPDATE_LANG: localeUpdateLang,
})