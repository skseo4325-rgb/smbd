import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy
} from "firebase/firestore";

// Config from firebase-applet-config.json
const firebaseConfig = {
  projectId: "gen-lang-client-0386999633",
  appId: "1:113263674151:web:2e18ee8dc3acf5ba519f02",
  apiKey: "AIzaSyBCmfMdnYEpCbYwIpOIC1ut9yGKzfdHVI8",
  authDomain: "gen-lang-client-0386999633.firebaseapp.com",
  databaseId: "ai-studio-34454284-bf2a-4bcc-a401-fd600a933aed",
  storageBucket: "gen-lang-client-0386999633.firebasestorage.app",
  messagingSenderId: "113263674151"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
// By default, the custom databaseId is passed as the second argument to getFirestore
export const db = getFirestore(app, "ai-studio-34454284-bf2a-4bcc-a401-fd600a933aed");

export const SETTINGS_COLLECTION = "settings";
export const POSTS_COLLECTION = "posts";

// Helper to get all settings from Firestore
export async function getFirebaseSettings(): Promise<any> {
  try {
    const settingsDocRef = doc(db, SETTINGS_COLLECTION, "main");
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting settings from Firebase:", error);
    return null;
  }
}

// Helper to save settings to Firestore
export async function saveFirebaseSettings(settings: any): Promise<boolean> {
  try {
    const settingsDocRef = doc(db, SETTINGS_COLLECTION, "main");
    await setDoc(settingsDocRef, settings, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving settings to Firebase:", error);
    return false;
  }
}

// Helper to get all posts from Firestore
export async function getFirebasePosts(): Promise<any[]> {
  try {
    const postsColRef = collection(db, POSTS_COLLECTION);
    const q = query(postsColRef, orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q);
    const posts: any[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.error("Error getting posts from Firebase:", error);
    return [];
  }
}

// Helper to add a post to Firestore
export async function addFirebasePost(post: { type: string; title: string; content: string; image_url: string; created_at: string }): Promise<string | null> {
  try {
    const postsColRef = collection(db, POSTS_COLLECTION);
    const docRef = await addDoc(postsColRef, post);
    return docRef.id;
  } catch (error) {
    console.error("Error adding post to Firebase:", error);
    return null;
  }
}

// Helper to update a post in Firestore
export async function updateFirebasePost(id: string, post: { type: string; title: string; content: string; image_url: string }): Promise<boolean> {
  try {
    const postDocRef = doc(db, POSTS_COLLECTION, id);
    await updateDoc(postDocRef, { ...post });
    return true;
  } catch (error) {
    console.error("Error updating post in Firebase:", error);
    return false;
  }
}

// Helper to delete a post from Firestore
export async function deleteFirebasePost(id: string): Promise<boolean> {
  try {
    const postDocRef = doc(db, POSTS_COLLECTION, id);
    await deleteDoc(postDocRef);
    return true;
  } catch (error) {
    console.error("Error deleting post from Firebase:", error);
    return false;
  }
}
