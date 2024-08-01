export const useRequestUrl = ({ reqUrl }: { reqUrl: string }) => {
  const requestUrl = `${process.env.LOCAL_URL}${reqUrl}`
  return requestUrl
}
