import Cookie from 'js-cookie'
import api from 'utils/api'
import createAsyncAction from 'utils/createAsyncAction'

const getNotices = () => (
  createAsyncAction('APP_GET_NOTICES', () => (
    api.get('/notice')
  ))
)

const deleteNotices = () => {
  
}