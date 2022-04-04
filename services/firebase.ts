import { indexedDBLocalPersistence, initializeAuth } from "@firebase/auth";
import {
  firebase,
  firebaseAnalytics,
  firebaseAuth,
  firebaseStorage,
  firestore,
} from "./firebase-packages";

const firebaseAuthJson = process.env.NEXT_PUBLIC_FIREBASE_AUTH_JSON;

if (!firebaseAuthJson) {
  throw new Error("missing NEXT_PUBLIC_FIREBASE_AUTH_JSON env var");
}

const firebaseAuthConfig = JSON.parse(firebaseAuthJson);

export const config = {
  ...firebaseAuthConfig,
};

const apps = firebase.getApps();
const app = apps[0] ?? firebase.initializeApp(config);

// Should we enable things like analytics/remote config which require a browser env
const browser = typeof window != "undefined" && !!window.indexedDB;

// Setup auth
// Setup auth
// Using initializeAuth instead of getAuth because of a very
// subtle bug in Capacitor
// See also: https://www.reddit.com/r/Firebase/comments/pq3shp/firebase_js_sdk_v9_incompatible_with_capacitor_3/
// See also: https://github.com/firebase/firebase-js-sdk/issues/5019
export const auth = initializeAuth(
  app,
  browser
    ? {
        persistence: indexedDBLocalPersistence,
      }
    : {}
);
export type { User as AuthUser } from "@firebase/auth";

// Setup storage
export const storage = firebaseStorage.getStorage(app);

// Setup analytics
export const analytics = browser
  ? firebaseAnalytics.initializeAnalytics(app)
  : null;

// Setup firestore
// firestore.setLogLevel('debug')
export const db = firestore.initializeFirestore(app, {
  ...(browser && { cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED }),
});

// Only enable persistence client-side
if (browser) {
  firebaseAuth.setPersistence(auth, firebaseAuth.indexedDBLocalPersistence);
  firestore.enableMultiTabIndexedDbPersistence(db);
}
