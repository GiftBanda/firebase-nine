import {initializeApp} from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    doc,
    setDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBTv0cFgbfcJvvJXsvifhf030nG0zVzGAk",
    authDomain: "fir-9-8e24d.firebaseapp.com",
    projectId: "fir-9-8e24d",
    storageBucket: "fir-9-8e24d.appspot.com",
    messagingSenderId: "631280272919",
    appId: "1:631280272919:web:59f03894a88029a8c27e52"
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//init collection references
const colRef = collection(db, 'books');

//get docs
// getDocs(colRef).then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//         books.push({...doc.data(), id: doc.id});
//     });
//     console.log(books);
// })
// .catch((err) => {
//     console.log(err.message);
// });

//get realtime updates
// onSnapshot(colRef, (snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//         books.push({...doc.data(), id: doc.id});
//     });
//     console.log(books);
// });


//add doc
const addBookForm = document.querySelector('.add');

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    }).then(() => {
        addBookForm.reset();
    }).catch((err) => {
        console.log(err.message);
    });

})

//delete doc
const deleteBookForm = document.querySelector('.delete');

deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let docRef = doc(db, 'books', deleteBookForm.id.value);

    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
    }
    );
})

//update doc

const updateBookForm = document.querySelector('.update');

updateBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let docRef = doc(db, 'books', updateBookForm.id.value);

    setDoc(docRef, {
        title: updateBookForm.title.value,  //update title
        author: updateBookForm.author.value, //update author
    }).then(() => {
        updateBookForm.reset();
    }).catch((err) => {
        console.log(err.message);
    }); 
});

//query single author
//const q = query(colRef, where('author', '==', 'Gift Banda'), orderBy('title', 'desc'));

//query all docs
const q = query(colRef, orderBy('title', 'desc'));

onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id});
    });
    console.log(books);
});
