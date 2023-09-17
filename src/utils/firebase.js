// Import the functions you 

import { getAnalytics } from "firebase/analytics";

import "firebase/messaging";
import firebase from "firebase/app"
import localforage from "localforage"; // improve offline experience by using async storage 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseCloudMessaging = {

    init: async () => {

        if (!firebase?.app?.length) {
            // Firebase is not init, so init
            firebase?.initializeApp({
                apiKey: process.env.FIREBASE_APIKEY,
                authDomain: process.env.FIREBASE_AUTHDOMAIN,
                projectId: process.env.FIREBASE_PROJECTID,
                messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
                appId: process.env.FIREBASE_APP_ID,
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET,

              });              
        }

        try {
            const messaging = firebase.messaging();
            const tokenInLocalForage = await localforage.getItem("fcm_token");
            
            // Return token if it is already in storage
            if (tokenInLocalForage !== null) { return tokenInLocalForage; }
        
        
        // Request the push notiication permission 
        const status = await Notification.requestPermission();
        
        if ( status && status === "granted" )
        {
            const fcm_token = await messaging.getToken( { 
                vapidKey: process.env.FIREBASE_WEBPUSH_KEY,
            });
        } else 
        {
            throw new Error("Permission denied for notification!")
        }

        // Set token in local storage
        if ( fcm_token ) {
            localforage.setItem("fcm_token", fcm_token);
            return fcm_token;
        }

        } catch (error) {
            console.error("Error in getting FCM Token", error) 
            throw error;
        }

    }





}



export default firebaseCloudMessaging;