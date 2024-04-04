import  { initializeFirebase, auth} from "$lib/firebase.client.js";
import { browser} from "$app/environment";
import { onAuthStateChanged } from "firebase/auth";



export async function load({ url}){
    if(browser){
        try {
            initializeFirebase();
        } catch (error) {
            console.log(error);
        }
    }

    function getAuthUser(){
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                resolve(user);
            });
        });
    }

    return {
        getAuthUser: getAuthUser,
        url: url.pathname
    };
}