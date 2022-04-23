import App from './App'
import './styles/globals.css'
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)