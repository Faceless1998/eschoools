import { request } from 'lib/api'

export const forgotPassword = async (mail: string) =>
  request(`/forgot`, 'POST', 'JSON', { mail })

export const forgotPasswordChange = async (body: {
  password: string
  id: string
}) =>
  request(
    `/forgot/password`,
    'POST',
    'JSON',
    { password: body.password },
    body.id,
  )

export const forgotPasswordValidation = async (id: string) =>
  request('/forgot/validation', 'GET', 'JSON', null, id)
