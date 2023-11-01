import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDfQc1iJ3QSR5CHr2Y64ffwOOFwa5wqJzE",
  authDomain: "testimonials-c3d77.firebaseapp.com",
  projectId: "testimonials-c3d77",
  storageBucket: "testimonials-c3d77.appspot.com",
  messagingSenderId: "125518248646",
  appId: "1:125518248646:web:185228f5893e6a599775c7",
  measurementId: "G-W28TNP1784",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
