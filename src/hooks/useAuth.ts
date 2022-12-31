import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { useCallback, useState } from 'react'
import { firebaseAuth } from '~/firebase'
import { authState } from '~/stores'

function useAuth() {
 const [isPending, setIsPending] = useState<boolean>(false)
 const [auth, setAuth] = useAtom(authState)

 const signIn = useCallback(() => {
  setIsPending(() => true)
  const provider = new GoogleAuthProvider()
  signInWithPopup(firebaseAuth, provider)
   .then((data) => {
    setAuth(data.user)
   })
   .catch((err) => {
    console.error(err)
   })
   .finally(() => {
    setIsPending(() => false)
   })
 }, [])

 const signOut = useCallback(async () => {
  setIsPending(() => true)
  setAuth(RESET)
  await firebaseAuth.signOut()
  setIsPending(() => false)
 }, [])

 return {
  auth,
  isPending,
  signIn,
  signOut,
 }
}

export default useAuth
