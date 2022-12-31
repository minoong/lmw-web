import { User } from 'firebase/auth'
import { atomWithStorage } from 'jotai/utils'

export const authState = atomWithStorage<User | null>('auth', null)
