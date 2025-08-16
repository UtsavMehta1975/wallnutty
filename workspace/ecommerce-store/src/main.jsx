import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './utils/stripe.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div className="h-screen grid place-items-center text-slate-500">Loading…</div>}>
          {stripePromise ? (
            <Elements stripe={stripePromise} options={{ appearance: { theme: 'flat', variables: { colorPrimary: '#2563eb' }}}}>
              <App />
            </Elements>
          ) : (
            <App />
          )}
          <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
