import { TResponse, request } from 'lib/api'
import { TRole, UserState } from 'providers/login-provider'

type RefreshTokenData = {
  expired: boolean
  access_token: string
  user: UserState
  msg: string
  success: boolean
}

export const getRefreshToken = async (): Promise<RefreshTokenData> =>
  request<RefreshTokenData>(`/refresh`, 'POST', 'JSON')

type AuthData = {
  access_token: string
  user: UserState
} & TResponse

export const getAuth = (login: string, password: string, type: TRole) =>
  request<AuthData>(`/auth/${type}`, 'POST', 'JSON', {
    login,
    password,
  })
