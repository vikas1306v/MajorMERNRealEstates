import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import { Provider } from 'react-redux'
import store from "./Store/Index.jsx"

const options = {
 
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE
}
ReactDOM.createRoot(document.getElementById('root')).render(

  
  
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
  <App />
  </Provider>
</AlertProvider>
 

)
