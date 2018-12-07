import Cookie from 'js-cookie'
import api from 'utils/api'
import createAsyncAction from 'utils/createAsyncAction'

const login = (username, password) => (
  createAsyncAction('APP_LOGIN', () => (
    api.post('/login', {
      username,
      password,
    })
  ))
)

const logout = () => {
  Cookie.remove('user')

  return ({
    type: 'APP_LOGOUT',
  })
}

const loginUser = (username, password) => {
  const action = login(username, password)

  return dispatch => (
    action(dispatch)
      .then(callbackAction => {
        if (callbackAction.type === 'APP_LOGIN_SUCCESS') {
          Cookie.set('user', JSON.stringify(callbackAction.payload))
          return getNotices()(dispatch)
        }
        if (callbackAction.type === 'APP_LOGIN_ERROR') {
          return setTimeout(() => dispatch(resetLoginErrorMsg()), 1500)
        }
        return null
      })
  )
}

const resetLoginErrorMsg = () => ({
  type: 'APP_RESET_LOGIN_ERROR_MSG'
})

const getNotices = () => (
  createAsyncAction('APP_GET_NOTICES', () => (
    api.get('/notice')
  ))
)

const deleteNotices = () => {

}

export default {
  login,
  logout,
  loginUser,
  resetLoginErrorMsg,
  getNotices,
  deleteNotices,
}