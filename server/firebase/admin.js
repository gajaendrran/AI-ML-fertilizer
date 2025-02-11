const admin = require("firebase-admin");
const serviceAccount = require("./firbaseadmin.json"); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
