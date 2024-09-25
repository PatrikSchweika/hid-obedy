import { useCallback } from 'react'
import { AddLunchFormData } from '../components/AddLunch.tsx'
import { collection, doc, runTransaction } from 'firebase/firestore'
import { FIREBASE_DB } from '../setup/firestore.ts'

export const useAddLunchRecord = () => {
  return useCallback(async (data: AddLunchFormData) => {
    const payerRef = doc(FIREBASE_DB, 'users', data.payerId)
    const selectedUserRefs = data.selectedUserIds.map((userId) =>
      doc(FIREBASE_DB, 'users', userId),
    )

    await runTransaction(FIREBASE_DB, async (transaction) => {
      const payer = await transaction.get(payerRef)

      if (!payer.exists()) {
        throw new Error('Payer does not exist')
      }

      const selectedUsers = await Promise.all(
        selectedUserRefs.map((ref) => transaction.get(ref)),
      )

      if (selectedUsers.some((user) => !user.exists())) {
        throw new Error('Selected user does not exist')
      }

      transaction.update(payerRef, {
        score: payer.data().score + selectedUsers.length,
      })

      selectedUsers.forEach((user, i) => {
        transaction.update(selectedUserRefs[i], {
          score: user.data()!.score - 1,
        })
      })

      const newRecordRef = doc(collection(FIREBASE_DB, 'lunch-records'))

      transaction.set(newRecordRef, {
        date: data.date.format('YYYY-MM-DD'),
        description: data.description,
        payerId: data.payerId,
        selectedUserIds: data.selectedUserIds,
      })
    })
  }, [])
}
