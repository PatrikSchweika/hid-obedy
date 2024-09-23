import { Dayjs } from 'dayjs'

export interface LunchRecord {
  date: Dayjs
  description: string
  payerId: string
  selectedUserIds: string[]
}
