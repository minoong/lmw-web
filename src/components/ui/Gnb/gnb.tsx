import React, { ReactElement, useCallback } from 'react'
import { NavLink, useMatches } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ReactComponent as Chart } from '~/assets/svg/chart.svg'
import { ReactComponent as Balance } from '~/assets/svg/balance.svg'
import { ReactComponent as Wallet } from '~/assets/svg/wallet.svg'
import { ReactComponent as Notice } from '~/assets/svg/notice.svg'
import { ReactComponent as SignIn } from '~/assets/svg/signin.svg'
import { ReactComponent as SignOut } from '~/assets/svg/signout.svg'
import { ReactComponent as User } from '~/assets/svg/user.svg'
import useAuth from '~/hooks/useAuth'
import Spinner from '~/components/ui/Common/Spinner/spinner'

const LINKS: { path: string; name: string; icon: ReactElement }[] = [
 {
  path: '/exchange',
  name: '거래소',
  icon: <Chart width={20} />,
 },
 {
  path: '/balances',
  name: '입출금',
  icon: <Balance width={20} />,
 },
 {
  path: '/investments/balance',
  name: '투자내역',
  icon: <Wallet width={20} />,
 },
 {
  path: '/service_center/notice',
  name: '고객센터',
  icon: <Notice width={20} />,
 },
]

function Gnb() {
 const matches = useMatches().at(-1)
 const { auth, signIn, signOut, isPending } = useAuth()

 return (
  <header className="bg-[#093687]/80 backdrop-blur-sm fixed w-full select-none">
   <nav className="flex items-center justify-between max-w-[1400px] min-w-[1200px] m-auto p-4">
    <section className="flex items-center">
     <NavLink
      className="inline-block font-bold tracking-widest text-transparent text-2xl bg-clip-text bg-gradient-to-r from-yellow-300 via-teal-50 to-rose-800"
      to="/"
     >
      LMW MARKET
     </NavLink>
     <ul className="flex items-center space-x-10 ml-20">
      {LINKS.map((link, index) => (
       <motion.li
        key={link.path}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: index / 10 }}
       >
        <NavLink
         to={link.path}
         className={({ isActive }) =>
          `flex items-center gap-1 font-bold tracking-widest hover:text-white transition-all ease-out ${
           isActive ? 'text-white' : 'text-gray-400'
          }`
         }
        >
         {React.cloneElement(link.icon, {
          ...(link.path === matches?.pathname && { strokeWidth: 2 }),
          stroke: link.path === matches?.pathname ? '#FFFFFF' : '#687EB0',
          fill: link.path === matches?.pathname ? '#FFFFFF' : '#687EB0',
         })}
         {link.name}
        </NavLink>
       </motion.li>
      ))}
     </ul>
    </section>
    <section>
     {isPending ? (
      <Spinner />
     ) : auth ? (
      <div className="flex items-center justify-center gap-1">
       <button type="button" onClick={signOut} className="hover:scale-110 transition-all">
        {React.createElement(SignOut, { fill: '#FFFFFF', width: 20, strokeWidth: 2, stroke: '#FFFFFF' })}
       </button>
       <span className="border-l-2 border-slate-900/50 h-[20px]" />
       <NavLink to="/mypage" className="hover:scale-110 transition-all">
        <User width={20} fill="#FFFFFF" />
       </NavLink>
      </div>
     ) : (
      <button type="button" onClick={signIn} className="hover:scale-110 transition-all">
       {React.createElement(SignIn, { fill: '#FFFFFF', width: 20, strokeWidth: 2, stroke: '#FFFFFF' })}
      </button>
     )}
    </section>
   </nav>
  </header>
 )
}

export default Gnb
