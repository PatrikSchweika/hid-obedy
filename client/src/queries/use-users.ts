import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { FIREBASE_DB } from '../setup/firestore.ts'
import { User } from '../models/user.ts'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const collectionRef = collection(FIREBASE_DB, 'users')

    const unsub = onSnapshot(collectionRef, (data) => {
      const fetchedUsers = data.docs
        .map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            }) as User,
        )
        .sort((a, b) => a.name.localeCompare(b.name))

      setUsers(fetchedUsers)
    })

    return () => unsub()
  }, [setUsers])

  return users
}
