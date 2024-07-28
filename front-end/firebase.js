import { firebaseConfig } from './firebaseConfig';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };