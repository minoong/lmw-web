import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '~/components/Layout'
import Spinner from '~/components/ui/Common/Spinner/spinner'
import Exchange from '~/pages/Exchange'

function Router() {
 return (
  <RouterProvider
   router={createBrowserRouter([
    {
     path: '/',
     element: <Layout />,
     children: [
      {
       path: '/exchange',
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
