import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axe from '@axe-core/react'

if (process.env.NODE_ENV !== 'production') {
  // Inicializa o Axe Core com um delay maior para garantir que a página esteja completamente carregada
  axe(React, ReactDOM, 2000)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) 