import {
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import sleep from "plugins/sleep";
import { firestore } from "services/firebase-packages";
import { getNotesRef } from "./helpers-v3";
import type { DbNote } from "./notes.types";

let logged = false;

const PAGE_SIZE = 50;
const SLEEP_BETWEEN_PAGES = 100;

export const onNotesSnapshotV3 = async (
  maxCount: number,
  onLoadingPage: (count: number) => void
) => {
  const ref = getNotesRef();

  let lastSyncDate: Date | undefined = undefined;
  let lastDoc: QueryDocumentSnapshot<DbNote> | null = null;
  const baseConstraints = [orderBy("updated_at", "asc")];

  let count = 0;
  do {
    console.log("loading page");
    await sleep(SLEEP_BETWEEN_PAGES);

    const constraints: QueryConstraint[] = [
      ...baseConstraints,
      limit(PAGE_SIZE),
    ];

    if (lastSyncDate) {
      constraints.push(where("updated_at", ">", lastSyncDate));
    }

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const pageQuery = query(ref, ...constraints);
    const snap = await firestore.getDocs(pageQuery);

    count += snap.docs.length;
    console.log(`loaded ${snap.docs.length} records. total ${count} records`);
    onLoadingPage(count);

    lastDoc = snap.docs[snap.docs.length - 1];

    // const noteChanges = snap.docs.map((doc) => NoteChange.fromDoc(graph, doc))

    // await callback(noteChanges)

    if (lastDoc) {
      const dbNote = lastDoc.data();
      lastSyncDate = dbNote.updated_at.toDate();

      if (!logged) {
        console.log("dbNote:", dbNote);
        logged = true;
      }

      // graph.noteStore.setLastSyncAt(lastSyncDate.getTime())
    }
  } while (lastDoc && count < maxCount);

  console.log("all pages are loaded");

  const constraints = [...baseConstraints];

  if (lastSyncDate) {
    constraints.push(where("updated_at", ">", lastSyncDate));
  }

  const liveQuery = query(ref, ...constraints);

  return firestore.onSnapshot(
    liveQuery,
    { includeMetadataChanges: true },
    (snapshot) => {
      const docChanges = snapshot.docChanges();
      docChanges.map((change) => console.log("docChange", change));
    }
  );
};
