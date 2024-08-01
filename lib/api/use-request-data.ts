import { TRequestBody, TRequestMethod, TRequestType } from '.'
import { generateHeader, getClientSideToken } from 'cookies'

type RequestData = {
  reqMethod: TRequestMethod
  reqType: TRequestType
  reqBody?: TRequestBody
  reqToken?: String
}

export const useRequestData = ({
  reqBody,
  reqType,
  reqToken,
  reqMethod,
}: RequestData) => {
  const token = JSON.stringify(reqToken ?? getClientSideToken())
  const body = reqType === 'FORM' ? reqBody : JSON.stringify(reqBody)

  const requestMethod = reqMethod
  const requestHeaders = generateHeader(token, reqType)
  const requestBody = reqBody ? body : null

  return {
    body: requestBody,
    headers: requestHeaders,
    method: requestMethod,
  } as any
}
