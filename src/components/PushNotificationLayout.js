import React, {useEffect} from "react"
import * as firebase from "firebase/app"
import "firebase/messaging";
import {firebaseCloudMessaging} from "../utils/firebase"
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

function PushNotificationLayout({children}) {
    const router = useRouter(); // navigation 

    useEffect( () => {
        
        setToken();

        // Event listener that listens for push notification event in background 
        navigator.serviceWorker.addEventListener("message",(event) => {
            console.log("Service worker event", event);
        });

        //Calls the getMessage function if the token is valid 
        async function setToken() {
            try {
                const token = await firebaseCloudMessaging.init(); // Calls cloud function to init

                if (token){
                    console.log("token", token);
                    getMessage();
                }
            } catch (error) {
                console.log(error);
            }
        }
    })

    const handleClickPushNotification = (url) => {
        router.push(url);
    };

    // Get push notification message and calls toast to display it 
    function getMessage() {
        const messaging = firebase.messaging();
        messaging.onMessage( (message) => {
            toast(
                <div onClick={ () => handleClickPushNotification( message?.data?.url )}>
                    <h5>{message?.notification?.title}</h5>
                    <h6>{message?.notification?.body}</h6>
                </div>
            )
        })
    }

    return (
        <>
        <ToastContainer />
        {children}
        </>
    )
}

export default PushNotificationLayout;