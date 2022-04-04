"use strict";

const fs = require("fs");

process.env.NEXT_PUBLIC_FIREBASE_AUTH_JSON = fs.readFileSync(
  "./config/firebase.client.json",
  "utf8"
);

const config = {
  experimental: { esmExternals: "loose" },

  productionBrowserSourceMaps: true,
};

module.exports = config;
