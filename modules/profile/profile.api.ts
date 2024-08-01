import { TResponse, request } from 'lib/api'

type teacherType = {
  firstName: string
  lastName: string
  phone: string
  mail: string
  birthDate: string
  address: string
  about: string
  image: string
  CV: string
}

type studentType = Omit<teacherType, 'CV'>

type TResponseType =
  | ({
      role: 'teacher'
      user: teacherType
    } & TResponse)
  | ({
      role: 'student'
      user: studentType
    } & TResponse)

type TProfile = {
  firstName: string
  lastName: string
  phone: string
  mail: string
  birthDate: string
  address: string
  about: string
}

type TImageUploadInput = {
  file: string
  url: string
  fileName: string
}

type TCvUpload = TImageUpload & {
  resources: { title: string; link: string; _id: string }[]
}

type TFileUploadInput = {
  file: string
  url: string
  fileName: string
}

export type TImageUpload = { url: string } & TResponse

export const getProfileInfo = async (serverSideToken: string) =>
  request<TResponseType>(`/profile/info`, 'GET', 'JSON', null, serverSideToken)

export const editProfileInfo = async (body: TProfile) =>
  request(`/profile/edit`, 'POST', 'JSON', body)

export const imageUpload = async ({
  file,
  url,
  fileName,
}: TImageUploadInput) => {
  let formData = new FormData()
  formData.append(fileName, file[0])

  if (!file[0]) return null

  return request<TImageUpload>(`${url}`, 'POST', 'FORM', formData)
}

export const fileUpload = async ({ file, url, fileName }: TFileUploadInput) => {
  let formData = new FormData()
  formData.append(fileName, file[0])

  if (!file[0]) return null

  return request<TCvUpload>(url, 'POST', 'FORM', formData)
}
