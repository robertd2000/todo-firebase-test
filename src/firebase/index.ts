import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCylEk8Grw0pnyXp6qWmWmh8JMn4Mi8_eI',
  authDomain: 'test-todo-b5716.firebaseapp.com',
  projectId: 'test-todo-b5716',
  storageBucket: 'test-todo-b5716.appspot.com',
  messagingSenderId: '704551561516',
  appId: '1:704551561516:web:a94d78a77d2d7a3209e489',
}

const app = initializeApp(firebaseConfig)
const projectFirestore = getFirestore(app)
const projectStorage = getStorage(app)

export { projectFirestore, projectStorage }
