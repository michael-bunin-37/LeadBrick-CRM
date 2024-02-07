import {getAuth} from "firebase/auth"
import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCRHqXjM8DOfqQa9tvgyIpoeOc2Hf-a9KI",
	authDomain: "leadbrick.firebaseapp.com",
	projectId: "leadbrick",
	storageBucket: "leadbrick.appspot.com",
	messagingSenderId: "1080752384957",
	appId: "1:1080752384957:web:cd6a5b7e79344ff95dc0d4",
	measurementId: "G-XF40R37SZH",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()
