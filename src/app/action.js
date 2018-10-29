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
  resetLoginErrorMsg,
  getNotices,
  deleteNotices,
}