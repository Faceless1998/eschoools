import { request } from 'lib/api'

export type TChangePassword = {
  currentPassword: string
  password: string
}

export const changePassword = async (input: { body: TChangePassword }) =>
  request(`/profile/change/password`, 'POST', 'JSON', input.body)
