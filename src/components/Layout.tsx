import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
 return (
  <div className="flex flex-col min-h-screen">
   <header>header</header>
   <main className="grow bg-slate-600 min-h-[550px]">
    <Outlet />
   </main>
   <footer>footer</footer>
  </div>
 )
}

export default Layout
