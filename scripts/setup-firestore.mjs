import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { chunk, range } from "lodash-es";
import { createNote } from "./create-note.mjs";
import { readNotes } from "./read-notes.mjs";

const BATCH_SIZE = 40;

const GRAPHS_COLLECTION = "graphs_debug_v3";
const NOTES_COLLECTION = "notes_debug_v5";
const GRAPH_ID = "my_graph_id_v2";

const app = initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore(app);

async function setupGraph() {
  const coll = db.collection(`${GRAPHS_COLLECTION}`);

  coll.doc(GRAPH_ID).set({
    id: GRAPH_ID,
    name: "my_graph_name",
  });
}

async function setupNotes() {
  const coll = db.collection(
    `${GRAPHS_COLLECTION}/${GRAPH_ID}/${NOTES_COLLECTION}`
  );

  const allNotes = readNotes();

  for (let notes of chunk(allNotes, BATCH_SIZE)) {
    const batch = db.batch();

    for (let note of notes) {
      console.log(`creating documnet ${note.id} / ${allNotes.length}`);
      const ref = coll.doc(note.id);
      batch.set(ref, note);
    }

    await batch.commit();
  }
}

async function main() {
  await setupGraph();
  await setupNotes();
}

main();
