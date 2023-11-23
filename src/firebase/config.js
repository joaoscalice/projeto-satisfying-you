import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBCVfcYC_Pq9YyocMG14AHtLYKPd3agHks',
  authDomain: 'satisfyingyou-e2d58.firebaseapp.com',
  projectId: 'satisfyingyou-e2d58',
  storageBucket: 'satisfyingyou-e2d58.appspot.com',
  messagingSenderId: '299504011850',
  appId: '1:299504011850:web:285d5adf084a53265c34b3',
};

const app = initializeApp(firebaseConfig);

export const auth_mod = getAuth(app);
export const storage = getStorage(app);

export default app;
