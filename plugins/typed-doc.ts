import {QueryDocumentSnapshot} from '@firebase/firestore'

export const typedDoc = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
})
