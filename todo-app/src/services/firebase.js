import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyANaNyO7-890eeaLQT1_aVUgAdz_eQiigM',
  authDomain: 'todo-app-e78bd.firebaseapp.com',
  projectId: 'todo-app-e78bd',
  appId: '1:392220350869:web:bbab6d145f63643c8cbe9c'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = getFirestore(app)

export async function getUserId() {
  const cred = await signInAnonymously(auth)
  return cred.user.uid
}

export async function loadTasksOnce() {
  const uid = await getUserId()
  const col = collection(db, `users/${uid}/tasks`)
  const snap = await getDocs(col)
  return snap.docs.map(d => {
    const data = d.data()
    const createdAt = data.createdAt?.toMillis ? data.createdAt.toMillis() : data.createdAt || 0
    return { id: d.id, ...data, createdAt }
  })
}