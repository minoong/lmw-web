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
    },
   ])}
  />
 )
}

export default Router
