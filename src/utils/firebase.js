import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsA5K7TkU36wFPUcWEU7gvue1BKC0sBVM",
  authDomain: "travel-app-b1938.firebaseapp.com",
  projectId: "travel-app-b1938",
  storageBucket: "travel-app-b1938.appspot.com",
  messagingSenderId: "335023863177",
  appId: "1:335023863177:web:c14a27b13ce8dbe6761d58",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const getAllPackages = async () => {
  const ref = doc(db, "packages", "all");
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    const data = { ...snapshot.data() };
    return data;
  }
};

export const deletePackage = async (packageId) => {
  const ref = doc(db, "packages", "all");
  await updateDoc(ref, {
    [`${packageId}`]: deleteField(),
  });
};

export const addPackage = async (packageInfo) => {
  const ref = doc(db, "packages", "all");
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    await updateDoc(ref, {
      [`${packageInfo.packageId}`]: packageInfo,
    });
  } else if (snapshot.data() === undefined) {
    await setDoc(ref, {
      [`${packageInfo.packageId}`]: packageInfo,
    });
  }
};

export const createUserBooking = async (bookingInfo, userId) => {
  const bookingDocRef = doc(db, "bookings", userId);
  const bookingSnapshot = await getDoc(bookingDocRef);
  if (bookingSnapshot.data() === undefined) {
    try {
      Object.values(bookingInfo).map(async (booking) => {
        await setDoc(bookingDocRef, {
          [`${booking.packageId}`]: booking,
        });
      });
    } catch (error) {
      console.log(error);
    }
  } else if (bookingSnapshot.exists()) {
    try {
      Object.values(bookingInfo).map(async (booking) => {
        await updateDoc(bookingDocRef, {
          [`${booking.packageId}`]: booking,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const getUserBookings = async () => {
  const bookingsDocRef = collection(db, "bookings");
  const bookingsSnapshot = await getDocs(bookingsDocRef);
  const bookingsData = bookingsSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return bookingsData;
};

export const getUserDetails = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    const userData = { ...userSnapshot.data() };
    return userData;
  }
};

export const deleteUserBooking = async (uid, index) => {
  const userBookingRef = doc(db, "bookings", uid);
  await updateDoc(userBookingRef, {
    [`${index}`]: deleteField(),
  });
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return userDocRef;
};

export const getUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (userSnapshot.exists()) {
    const userData = { ...userSnapshot.data(), id: userAuth.uid };
    return userData;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
