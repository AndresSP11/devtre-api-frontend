import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router'

import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'


const queryClient=new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* En este caso recordar que router es la parte del Export const que se esta manteniendo en el archivo Router.tsx */}
    
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools/>
    </QueryClientProvider>
    
  </StrictMode>,
)
