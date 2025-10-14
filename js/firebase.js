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