import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
// import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrimeReactProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
