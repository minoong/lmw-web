import React from 'react'
import { Outlet } from 'react-router-dom'
import Gnb from '~/components/ui/Gnb/gnb'

function Layout() {
 return (
  <div className="flex flex-col min-h-screen w-full min-w-[1400px]">
   <Gnb />
   <main className="grow min-h-[550px] px-4 pt-[64px]">
    <Outlet />
   </main>
   <footer>footer</footer>
  </div>
 )
}

export default Layout
