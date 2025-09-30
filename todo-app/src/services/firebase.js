import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'

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

export async function addTaskRemote(uid, text) {
  const col = collection(db, `users/${uid}/tasks`)
  const ref = await addDoc(col, { text, completed: false, createdAt: serverTimestamp() })
  return { id: ref.id, text, completed: false, createdAt: Date.now() }
}

export async function updateTaskRemote(uid, id, changes) {
  const ref = doc(db, `users/${uid}/tasks/${id}`)
  await updateDoc(ref, changes)
  return { id, changes }
}

export async function deleteTaskRemote(uid, id) {
  const ref = doc(db, `users/${uid}/tasks/${id}`)
  await deleteDoc(ref)
  return id
}