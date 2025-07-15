// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración temporal para desarrollo
// Reemplaza con tu configuración real de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY || "demo-api-key",
  authDomain: import.meta.env.VITE_AUTHDOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_PROJECTID || "demo-project",
  storageBucket:
    import.meta.env.VITE_STORAGEBUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID || "123456789",
  appId: import.meta.env.VITE_APPID || "1:123456789:web:abcdef123456",
  measurementId: import.meta.env.VITE_MEASUREMENTID || "G-XXXXXXXXXX",
};

let app, analytics, auth, db, storage;

// Verificar si estamos en modo desarrollo con claves demo
const isDemoMode =
  firebaseConfig.apiKey === "demo-api-key" ||
  firebaseConfig.apiKey === "demo-key-for-development";

try {
  // Solo inicializar Firebase si tenemos configuración real
  if (!isDemoMode) {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } else {
    console.warn("⚠️  Ejecutándose en modo DEMO. Firebase está deshabilitado.");
    console.warn(
      "📝 Para habilitar Firebase, configura tus variables de entorno reales en el archivo .env"
    );

    // Mock objects para desarrollo - evita errores de inicialización
    auth = {
      currentUser: null,
      onAuthStateChanged: () => () => {},
      signInWithEmailAndPassword: () =>
        Promise.reject(new Error("Firebase en modo demo")),
      createUserWithEmailAndPassword: () =>
        Promise.reject(new Error("Firebase en modo demo")),
      signOut: () => Promise.resolve(),
    };

    db = {
      collection: () => ({
        doc: () => ({
          get: () => Promise.resolve({ exists: false }),
          set: () => Promise.resolve(),
        }),
      }),
    };

    storage = null;
    analytics = null;
  }
} catch (error) {
  console.error("❌ Error inicializando Firebase:", error);
  // Fallback a objetos mock
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () =>
      Promise.reject(new Error("Firebase no disponible")),
    createUserWithEmailAndPassword: () =>
      Promise.reject(new Error("Firebase no disponible")),
    signOut: () => Promise.resolve(),
  };
  db = null;
  storage = null;
  analytics = null;
}

export { analytics, app, auth, db, storage };

export const userExists = async (uid) => {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
};

export const existsUsername = async (username) => {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
};

export const registerNewUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {}
};

export const updateUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {}
};

export const getUserInfo = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    console.log(document);
    return document.data();
  } catch (error) {}
};
