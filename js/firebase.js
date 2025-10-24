console.log("firebase js cargado");
const firebaseConfig = {

  apiKey: "AIzaSyBnaGqtsTYiixaqRYVLxP9fLITFVmsjHuM",

  authDomain: "corralondorrego.firebaseapp.com",

  databaseURL: "https://corralondorrego-default-rtdb.firebaseio.com",

  projectId: "corralondorrego",

  storageBucket: "corralondorrego.firebasestorage.app",

  messagingSenderId: "529530617501",

  appId: "1:529530617501:web:0a38524cf063fba03b9e74"

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