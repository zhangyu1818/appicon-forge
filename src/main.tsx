import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider as SpectrumProvider,
  defaultTheme,
} from '@adobe/react-spectrum'

import App from './App.tsx'
import { Provider } from './context'

import './index.css'

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Provider>
      <SpectrumProvider theme={defaultTheme}>
        <App />
      </SpectrumProvider>
    </Provider>
  </StrictMode>,
)
