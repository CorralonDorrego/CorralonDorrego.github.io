console.log("firebase js cargado");
const firebaseConfig = {

  apiKey: "AIzaSyCAfc3CdhwxYATsZMBiBKAruy9e9qhTIaw",

  authDomain: "corralon-dorrego.firebaseapp.com",

  databaseURL: "https://corralon-dorrego-default-rtdb.firebaseio.com",

  projectId: "corralon-dorrego",

  storageBucket: "corralon-dorrego.firebasestorage.app",

  messagingSenderId: "129980074634",

  appId: "1:129980074634:web:f40405855b8e7b29d7fb73"

};


firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const database = firebase.database();



function get_firebase(url){
    return new Promise((resolve, reject) => {
        try {
            var fetchedData = database.ref(url);

            fetchedData.on('value', (snapshot) => {
                var data = snapshot.val()
                
                resolve(data);
            })
        } catch(e) {
            reject(e);
        }
       
    });
}

function login(email, pass){
    return new Promise(async (resolve, reject) => {
        try {
            await auth.signInWithEmailAndPassword(email,pass);
            resolve(1);
        } catch(e) {
            reject(e);
        }
    })
}
/* vv write example vv

try {
    await auth.signInWithEmailAndPassword("mail","password");
    console.log("Signed in!");
} catch (e) {
    console.log("error: ",e);
}*/

function set_firebase(data){
    database.ref("data").set(data)
}