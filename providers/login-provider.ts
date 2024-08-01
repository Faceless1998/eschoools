import { ge } from 'public/locales/ge/ge'
import { getAuth, getRefreshToken } from 'modules/login/login.api'
import { getClientSideToken } from 'cookies'
import { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import constate from 'constate'
import jwtDecode from 'jwt-decode'

export type TRole = 'teacher' | 'student'

export type UserState = {
  name: string
  surname: string
  image: string
  role: TRole
  phone?: string
  class_id?: string
}

export type AuthState =
  | { type: 'null' }
  | { type: 'unauthenticated' }
  | {
      type: 'authenticated'
      accessToken: string
      role: TRole
      _id: string
    }

export type JwtPayload = {
  _id: string
  ID: string
  role: TRole
}

export const decodeJwt = (accessToken: string) => {
  return jwtDecode<JwtPayload>(accessToken)
}

const useAuth = () => {
  const authRequest = async (login: string, password: string, type: TRole) => {
    const response = await getAuth(login, password, type)
    if (response.success) {
      setAuthData(response.access_token, response.user)
      return response
    }
  }

  const [auth, setAuth] = useState<AuthState>({ type: 'null' })
  const [user, setUser] = useState<UserState | null>(null)

  const [t] = useState(ge)

  const $login = useMutation(
    ({
      login,
      password,
      type,
    }: {
      login: string
      password: string
      type: TRole
    }) => authRequest(login, password, type),
  )

  const setAuthData = useCallback(
    (accessToken: string, user: UserState) => {
      const { _id, role } = decodeJwt(accessToken)

      document.cookie = `token=${accessToken};path=/`
      setAuth(() => ({ _id, accessToken, role, type: 'authenticated' }))
      setUser(() => user)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }

  const removeToken = useCallback(() => {
    setAuth({ type: 'unauthenticated' })
    setUser(null)
    deleteAllCookies()
  }, [])

  const refreshToken = useCallback(
    async () => {
      const response = await getRefreshToken()

      if (!response.expired) {
        response.success
          ? setAuthData(response.access_token, response.user)
          : removeToken()
      } else {
        removeToken()
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setAuthData, removeToken],
  )

  useEffect(() => {
    getClientSideToken() ? refreshToken() : removeToken()
  }, [refreshToken, removeToken])

  const watchToken = (event: StorageEvent) => {
    if (event.key === 'token') {
      removeToken()
      setAuth({ type: 'unauthenticated' })
    }
  }

  useEffect(() => {
    window.addEventListener('storage', watchToken)

    return () => {
      window.removeEventListener('storage', watchToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    $login,
    auth,
    authRequest,
    removeToken,
    setAuthData,
    setUser,
    t,
    user,
  } as const
}

export const [CheckLoginProvider, useAuthContext] = constate(useAuth)
