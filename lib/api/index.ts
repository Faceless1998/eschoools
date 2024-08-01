/* eslint-disable react-hooks/rules-of-hooks */
import { useRequestData } from './use-request-data'
import { useRequestUrl } from './use-request-url'
import toast from 'react-hot-toast'

export type TResponse = { msg: string; success: boolean }
export type TRequestMethod = 'GET' | 'POST' | 'DELETE'
export type TRequestType = 'FORM' | 'JSON'
export type TRequestBody = Record<string | number, any> | BodyInit | null

export const request = async <Result extends TResponse>(
  reqUrl: string,
  reqMethod: TRequestMethod,
  reqType: TRequestType,

  reqBody?: TRequestBody,
  reqToken?: string,
) => {
  const requestBody = useRequestData({ reqBody, reqMethod, reqToken, reqType })
  const requestUrl = useRequestUrl({ reqUrl })

  reqUrl !== '/refresh' && toast.loading('loading ...')
  const response = await fetch(requestUrl, requestBody)

  if (response.ok) {
    const data = (await response.json()) as Result

    data.success && data.msg && toast.success(data.msg)
    !data.success && data.msg && toast.error(data.msg)

    return data
  } else {
    const error = (await response.json()) as Result
    if (error) toast.error(error.msg)
    return Promise.reject({
      ...error,
    }) as unknown as Result
  }
}
