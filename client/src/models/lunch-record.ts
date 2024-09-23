import { Dayjs } from 'dayjs'

export interface LunchRecord {
  id: string
  score: number
  date: Dayjs
  description: string
  payerId: string
  selectedUserIds: string[]
}
