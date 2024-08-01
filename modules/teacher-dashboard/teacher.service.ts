import { THistoryStudent, TStudent } from './teacher.dashboard.api'

export const sortByNameSurname = <T extends TStudent>({
  array,
}: {
  array: T[]
}) => {
  const sorted = array
    .map((el) => {
      return { ...el, checked: true }
    })
    .sort(function (a, b) {
      let af = a.student_id.name
      let bf = b.student_id.name
      let as = a.student_id.surname
      let bs = b.student_id.surname

      if (as === bs) {
        return af < bf ? -1 : af > bf ? 1 : 0
      } else {
        return as < bs ? -1 : 1
      }
    })
  return sorted
}

export const sortByNameSurnameHistoryPoints = <T extends THistoryStudent>({
  array,
}: {
  array: T[]
}) => {
  const sorted = array
    .map((el) => {
      return { ...el, checked: true }
    })
    .sort(function (a, b) {
      let af = a.name
      let bf = b.name
      let as = a.surname
      let bs = b.surname

      if (as === bs) {
        return af < bf ? -1 : af > bf ? 1 : 0
      } else {
        return as < bs ? -1 : 1
      }
    })
  return sorted
}

export const generateCSV = (array: any) => {
  return array.map((student: any) => {
    let obj = { name: student.name, surname: student.surname }
    student.points.map((point: any) => {
      obj = {
        ...obj,
        [point.date]: `${
          point.point === -2 ? 'არა' : point.point === -1 ? 'კი' : point.point
        } ${
          point.pointType === 1
            ? ' - საშინაო '
            : point.pointType === 2
            ? ' - საკლასო'
            : ' - შემაჯამებელი'
        }`,
      }
    })
    return obj
  })
}

export const generateHeaders = (array: any) => {
  return array[0].points.map((point: any) => {
    return { key: point.date, label: point.date }
  })
}
