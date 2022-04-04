import { typedDoc } from "plugins/typed-doc";
import { db } from "services/firebase";
import { firestore } from "services/firebase-packages";
import { DbNote } from "./notes.types";

const GRAPHS_COLLECTION = "graphs_debug_v3";
const NOTES_COLLECTION = "notes_debug_v5";
const GRAPH_ID = "my_graph_id_v2";

interface DbGraph {
  id: string;
  name: string;
}

const getGraphsRef = () => {
  return firestore
    .collection(db, GRAPHS_COLLECTION)
    .withConverter(typedDoc<DbGraph>());
};

const getGraphRef = (graphId: string) => {
  return firestore.doc(getGraphsRef(), graphId);
};

export const getNotesRef = (graphId: string = GRAPH_ID) => {
  const ref = getGraphRef(graphId);
  return firestore
    .collection(ref, NOTES_COLLECTION)
    .withConverter(typedDoc<DbNote>());
};
