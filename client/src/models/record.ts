import { Dayjs } from 'dayjs'

export interface LunchRecord {
  date: Dayjs
  description: string
  payerId: number
  selectedUserIds: number[]
}
