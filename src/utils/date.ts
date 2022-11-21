import dayjs from 'dayjs'

export const getDate = (time: any) => {
  dayjs.locale('ru')
  return dayjs(new Date(time.seconds * 1000)).toString()
}

export const checkDate = (date: Date | null) => {
  const currentDate = new Date()
  return new Date(date!) > currentDate
}
