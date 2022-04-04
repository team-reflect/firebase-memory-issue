import { Timestamp } from "@firebase/firestore";

export type DbNote = {
  created_at: Timestamp;
  updated_at: Timestamp;
  document_json: any;
};
