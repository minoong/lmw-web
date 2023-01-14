import React from 'react'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Layout from '~/components/Layout'
import Spinner from '~/components/ui/Common/Spinner/spinner'
import Exchange from '~/pages/Exchange'
import { store } from '~/stores'
import { symbolAtom } from '~/stores/atoms/symbolState'

function Router() {
 return (
  <RouterProvider
   router={createBrowserRouter([
    {
     path: '/',
     element: <Layout />,
     children: [
      {
       loader: ({ params }) => {
        if (!params?.symbol) {
         throw redirect('/exchange/KRW-BTC')
        }
        store.set(symbolAtom, params.symbol)
        return null
       },
       path: '/exchange/:symbol?',
       element: (
        <React.Suspense fallback={<Spinner />}>
         <Exchange />
        </React.Suspense>
       ),
      },
     ],
    },
   ])}
  />
 )
}

export default Router
