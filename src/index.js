import ReactDOM from 'react-dom'
import history from 'router/history'
import 'antd/dist/antd.css'
import { createApp, createStore, initClient } from './app'
import * as serviceWorker from './serviceWorker'

const store = createStore(history, {})

const application = createApp(store, history)

initClient(store.dispatch)

ReactDOM.render(application, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
