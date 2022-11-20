import dayjs from 'dayjs'

export const getDate = (time: any) => {
  dayjs.locale('ru')
  return dayjs(new Date(time.seconds * 1000)).toString()
}
