import { UserTable } from './UserTable.tsx'
import { AddLunch } from './AddLunch.tsx'
import { Stack } from '@mui/material'
import { User } from '../models/user.ts'
import { useCallback, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../setup/firestore.ts'

export const Layout = () => {
  const [users, setUsers] = useState<User[]>([])
  // const [records, setRecords] = useState<LunchRecord[]>([])

  const fetchUsers = async () => {
    await getDocs(collection(FIREBASE_DB, 'users')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as User,
      )

      setUsers(newData)
    })
  }

  // const addUser = async (name: string, score: number) => {
  //     try {
  //         const docRef = await addDoc(collection(FIREBASE_DB, 'users'), {
  //           user: { name, score},
  //         });
  //
  //         console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //         console.error("Error adding document: ", e);
  //     }
  // }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleAddLunch = useCallback(() => {
    // const { payerId, selectedUserIds } = lunchRecord
    //
    // const newUsers = users.map((user) => {
    //   if (user.id === payerId) {
    //     return {
    //       ...user,
    //       score: user.score + selectedUserIds.length,
    //     }
    //   } else if (selectedUserIds.includes(user.id)) {
    //     return {
    //       ...user,
    //       score: user.score - 1,
    //     }
    //   }
    //
    //   return user
    // })
    //
    // for (const user of users) {
    //     const userRef = doc(FIREBASE_DB, 'users', user.id)
    //
    //     await updateDoc(userRef, {
    //         score: user.score,
    //     })
    // }
    //
    // setUsers(newUsers)
    // setRecords([...records, lunchRecord])
  }, [])

  return (
    <Stack direction="row" spacing={20}>
      <AddLunch users={users} onAddLunch={handleAddLunch} />
      <UserTable users={users} />
    </Stack>
  )
}
