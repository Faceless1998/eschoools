import { TResponse, request } from 'lib/api'

export type TSubject = {
  _id: string
  subject_id: {
    _id: string
    subject_name: string
  }
  teacher_id: {
    name: string
    surname: string
  }
}
type TSubjects = {
  subjects: TSubject[]
  ID: string
  CLASS_ID: string
} & TResponse

export const getClassSubjects = async ({ classId }: { classId: string }) =>
  request<TSubjects>(`/teacher/classes/${classId}`, 'GET', 'JSON')

export const getSadamrigebloSubjects = async ({
  classId,
}: {
  classId: string
}) =>
  request<TSubjects>(`/teacher/sadamrigeblo/subjects/${classId}`, 'GET', 'JSON')
