import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'jotai'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App'
import { store } from '~/stores'
import './index.css'

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   retry: false,
   refetchOnWindowFocus: false,
  },
 },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <React.StrictMode>
  <Provider unstable_createStore={() => store}>
   <QueryClientProvider client={queryClient}>
    <App />
   </QueryClientProvider>
  </Provider>
 </React.StrictMode>,
)
