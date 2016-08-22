import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCjecWgW2lq3P2yL6KzA77_oXnKwQImWHg",
  authDomain: "omakase-3868d.firebaseapp.com",
  databaseURL: "https://omakase-3868d.firebaseio.com",
  storageBucket: "omakase-3868d.appspot.com",
};
export const Firebase = firebase.initializeApp(config);
export const Database = Firebase.database();
export default Database;
