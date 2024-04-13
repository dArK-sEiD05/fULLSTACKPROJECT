import {getApp,getApps,initializeApp } from "firebase/app";

import{getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDf-RlbCvwtwDMwRUZa5J89Wv96aGNjokA",
    authDomain: "fullstackproject-c0a97.firebaseapp.com",
    projectId: "fullstackproject-c0a97",
    storageBucket: "fullstackproject-c0a97.appspot.com",
    messagingSenderId: "500655233621",
    appId: "1:500655233621:web:50283334f3b64cdf0d12dc",
    
  };
  
  const app=initializeApp(firebaseConfig);
  const storage=getStorage(app);

  export {app,storage};