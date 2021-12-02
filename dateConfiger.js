const admin = require("firebase-admin");
const serviceAccount = require("./service_key.json");
const moment = require("moment");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const fieldValue = admin.firestore.FieldValue;

const docNames = require("./dataNames.json");
let org = "test";

docNames.forEach((elm) => {
  let collRef = db.collection(org + "/" + elm + "/tables");
  collRef.get().then((col) => {
    col.docs.forEach((doc, i) => {
      if (doc.data().CaptureDate) {
        let newDate = moment(doc.data().CaptureDate).format("YYYY-MM-DD HH:mm");
        db.collection(org + "/" + elm + "/tables")
          .doc(doc.id)
          .update({ CaptureDate: newDate })
          .then((resp) => {
            console.log(resp);
          });
      } else if (doc.data().Capturedate) {
        let newDate = moment(doc.data().Capturedate).format("YYYY-MM-DD HH:mm");
        db.collection(org + "/" + elm + "/tables")
          .doc(doc.id)
          .update({ Capturedate: newDate })
          .then((resp) => {
            console.log(resp);
          });
      } else if (doc.data().CapDate) {
        let newDate = moment(doc.data().CapDate).format("YYYY-MM-DD HH:mm");
        db.collection(org + "/" + elm + "/tables")
          .doc(doc.id)
          .update({ CapDate: newDate })
          .then((resp) => {
            console.log(resp);
          });
      }
      //   if (doc.data().prop) {
      //     db.collection(org + '/' + elm + "/tables")
      //       .doc(doc.id)
      //       .update({ prop: fieldValue.delete() })
      //       .then((resp) => {
      //         console.log(resp);
      //       });
      //   }
    });
    console.log(elm + " done!!!");
  });
});

// let collRef = db.collection("test/Trn_OverheadBud/tables");
// collRef.get().then((col) => {
//   col.docs.forEach((doc, i) => {
//     db.collection("test/Trn_OverheadBud/tables")
//       .doc(doc.id)
//       .update({ CapDate: "" });
//   });
//   console.log("done!!!");
// });
