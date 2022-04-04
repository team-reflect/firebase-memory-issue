# Firebase memory issue

We've found that Firebase is keep crashing on mobile safari because of out of memory. This repo is a minimal repication for this issue.

## How to use

1. Open https://firebase-memory-issue-2022-04.vercel.app/ using iPhone safari.
2. Click one of the buttons to load some documents. Each document contains about 39KB of data.
3. You can connect your iPhone to your Mac and see the console log as well as the memory usage.

On my iPhone Xr (with 3GB of memory), this webpage will crash after loading about 750 documents, which is about 30MB of raw data. The browser memory usage is about 1.6GB right before the crashing.

<img width="999" alt="image" src="https://user-images.githubusercontent.com/24715727/161531926-109f82e5-7f4d-4d66-a55a-558da5a78419.png">


## Steup locally

You can also run this repo locally.

1. Prepare a firebase project that allow read and write without authentication.
2. Clone this repo and run `yarn install`.
3. Download the service account JSON file and save it to `config/firebase.admin.json`.
4. Download the web app config JSON file and save it to `config/firebase.client.json`.
5. Run `yarn setup-data` to insert data into firestore database.
6. Run `yarn dev` to start the web server.
