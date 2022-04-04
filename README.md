## Steup

1. Prepare a firebase project that allow read and write without authentication.
2. Clone this repo and run `yarn install`.
3. Download the service account JSON file and save it to `config/firebase.admin.json`.
4. Download the web app config JSON file and save it to `config/firebase.client.json`.
5. Run `yarn setup-data` to insert data into firestore database.
6. Run `yarn dev` to start the web server.
7. Open this webpage in mobile Safari.
8. Click the button. It will crash after loaded about 750 documents on my iPhone XR (with 3GB memory).
