import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux';
import App from "./App"
import './index.css';

import { store } from './common/app/store';
import Loading from './components/loading/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Loading>
      <App />
      </Loading>
    </Provider>
  </React.StrictMode>
);
