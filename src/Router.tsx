import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '~/components/Layout'

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
       element: <div>dsf</div>,
      },
     ],
    },
   ])}
  />
 )
}

export default Router
