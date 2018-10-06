import FirebaseApp from 'firebase/app';
import 'firebase/firestore';

const instance = {};

export default {
  init(config) {
    try {
      FirebaseApp.initializeApp(config);
      instance.database = FirebaseApp.firestore();
      instance.database.settings({timestampsInSnapshots: true});
      return true;
    } catch (error) {
      throw new Error(`Error -> ${error}`);
    }
  },

  get(collection) {
    if (!instance.database) throw new Error('Database not initialized. Use the init method to initialize it');

    // Returning a promise
    return new Promise((resolve) => {
      instance.database.collection(collection).get()
        .then((querySnapshot) => {
          let docs = [];

          querySnapshot.forEach((doc) => {
            docs.push(doc.data());
          });

          resolve(docs);
        });
    });
  },
};
