import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { FIREBASE_DB } from '../setup/firestore.ts'
import { LunchRecord } from '../models/lunch-record.ts'
import dayjs from 'dayjs'

export const useLunchRecords = (userId: string) => {
  const [lunchRecords, setLunchRecords] = useState<LunchRecord[]>([])

  useEffect(() => {
    const collectionRef = collection(FIREBASE_DB, 'lunch-records')

    const unsub = onSnapshot(collectionRef, (data) => {
      const fetchedRecords = data.docs
        .map(
          (doc) =>
            ({
              ...doc.data(),
              date: dayjs(doc.data().date, 'YYYY-MM-DD'),
              score: 0,
              id: doc.id,
            }) as LunchRecord,
        )
        .filter((record) => {
          return (
            record.payerId === userId || record.selectedUserIds.includes(userId)
          )
        })
        .map((record) => ({
          ...record,
          score: record.payerId === userId ? record.selectedUserIds.length : -1,
        }))

      setLunchRecords(fetchedRecords)
    })

    return () => unsub()
  }, [setLunchRecords, userId])

  return lunchRecords
}
