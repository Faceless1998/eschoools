export const pointRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export type TMonthRange = {
  month: string
  monthNumber: string
  days: number
}

export const monthesRange: TMonthRange[] = [
  {
    days: 31,
    month: 'იანვარი',
    monthNumber: 'month01',
  },
  {
    days: 29,
    month: 'თებერვალი',
    monthNumber: 'month02',
  },
  {
    days: 31,
    month: 'მარტი',
    monthNumber: 'month03',
  },
  {
    days: 30,
    month: 'აპრილი',
    monthNumber: 'month04',
  },
  {
    days: 31,
    month: 'მაისი',
    monthNumber: 'month05',
  },
  {
    days: 30,
    month: 'ივნისი',
    monthNumber: 'month06',
  },
  {
    days: 31,
    month: 'ივლისი',
    monthNumber: 'month07',
  },
  {
    days: 31,
    month: 'აგვისტო',
    monthNumber: 'month08',
  },
  {
    days: 30,
    month: 'სექტემბერი',
    monthNumber: 'month09',
  },
  {
    days: 31,
    month: 'ოქტომბერი',
    monthNumber: 'month10',
  },
  {
    days: 30,
    month: 'ნოემბერი',
    monthNumber: 'month11',
  },
  {
    days: 31,
    month: 'დეკემბერი',
    monthNumber: 'month12',
  },
]

export const monthToDateRange: any = {
  month01: '01',
  month02: '02',
  month03: '03',
  month04: '04',
  month05: '05',
  month06: '06',
  month07: '07',
  month08: '08',
  month09: '09',
  month10: '10',
  month11: '11',
  month12: '12',
}
