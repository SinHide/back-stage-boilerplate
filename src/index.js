import ReactDOM from 'react-dom'
import history from 'utils/history'
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker'
import { createApp, createStore, initClient } from './app'

const store = createStore(history, {})

const application = createApp(store, history)

initClient(store.dispatch)

ReactDOM.render(application, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
