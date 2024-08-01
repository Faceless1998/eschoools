import { GetServerSidePropsContext } from 'next'
import { TRole, decodeJwt } from 'providers/login-provider'

export const getClientSideToken = () => {
  let nameEQ = 'token='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return 'null'
}

export const getServerSideToken = (ctx: GetServerSidePropsContext) =>
  ctx.req.cookies.token ?? 'null'

export const generateHeader = (token: string, type: string) => {
  if (type === 'FORM') return { authorization: `Bearer ${token}` }
  return {
    'Content-type': 'application/json',
    authorization: `Bearer ${token}`,
  }
}

export const generateRedirectRoute = (
  destination: string,
  permanent: boolean,
) => {
  return { destination, permanent }
}

const returnRedirects = (path: string) => {
  return {
    redirect: generateRedirectRoute(path, false),
  }
}

const returnEmptyProps = () => {
  return {
    props: {},
  }
}

//cheking user login if page renders without request on the server
export const checkScopesServerSide = (
  ctx: GetServerSidePropsContext,
  role: TRole,
) => {
  const token = getServerSideToken(ctx)
  const { ...props } = ctx.query

  if (token !== 'null') {
    if (decodeJwt(token).role !== role) return returnRedirects(`/`)
    else
      return {
        props: {
          ...props,
        },
      }
  } else {
    return returnRedirects('/')
  }
}

export const checkAuthServerSide = (ctx: GetServerSidePropsContext) => {
  const token = getServerSideToken(ctx)

  if (token !== 'null') {
    return returnEmptyProps()
  } else {
    return returnRedirects('/')
  }
}
