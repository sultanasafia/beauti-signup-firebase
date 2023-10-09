

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore , collection, addDoc, getDocs ,doc, setDoc} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlbFJelIYcibfx2v0wimjdAR4-DXPd1BA",
  authDomain: "saad-97bec.firebaseapp.com",
  projectId: "saad-97bec",
  storageBucket: "saad-97bec.appspot.com",
  messagingSenderId: "483137802287",
  appId: "1:483137802287:web:b2fb8fbbd0e29df146f6da",
  measurementId: "G-556WX15WKK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


let btn = document.getElementById('submitbtn');

  btn.addEventListener("click",() => {
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let repeatPassword = document.getElementById('repeatPassword');


  let userData = {
    firstName : firstName.value,
    lastName : lastName.value,
    email : email.value,
    password:password.value,
    repeatPassword : repeatPassword.value
}

createUserWithEmailAndPassword(auth, userData.email, userData.password)
  .then(async(userCredential) => {
   const user = userCredential.user;
   
try {
  const docRef = await addDoc(collection(db, "users"), {
     ...userData,
     uid:user.uid
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
   Swal.fire({
    
    title: 'Great...',
    text: 'Succesfully signup!'
    
  })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   console.log("errorMessage",errorMessage);
   Swal.fire('something went wrong')
  });

})

let getAllUsers = async () => {
 const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => `,doc.data());
 });
 }
 getAllUsers()














    // createUserWithEmailAndPassword(auth,"khani@gmail.com","1236789")
    // .then((res) => {
    //  const user = res.user;
    // console.log('user',user);
    // alert('success')
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log('errorMessage',errorMessage);
       
    //   });
 
//     signInWithEmailAndPassword(auth, "khani@gmail.com","1236789")
//   .then((userCredential) => {
  
//     const user = userCredential.user;
//  console.log('user',user);
//  alert('succes')
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorCode);
//     console.log(errorMessage);
//   });

