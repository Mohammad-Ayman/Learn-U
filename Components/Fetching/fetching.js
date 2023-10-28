import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import db from "@/firebase.js";

export const fetchCourses = async () => {
  console.log("Started Fetching");
  const courseCollection = collection(db, "courses");
  const courseSnapshot = await getDocs(courseCollection);
  let fetchedCourses = [];
  courseSnapshot.forEach((doc) => {
    fetchedCourses.push({ _id: doc.id, ...doc.data() });
  });
  return fetchedCourses;
};
export const fetchLimitedCourses = async (limitC = 1) => {
  console.log("Started Fetching");
  const courseCollection = query(collection(db, "courses"), limit(limitC));
  const courseSnapshot = await getDocs(courseCollection);
  let fetchedCourses = [];
  courseSnapshot.forEach((doc) => {
    fetchedCourses.push({ _id: doc.id, ...doc.data() });
  });
  return fetchedCourses;
};

export const fetchSavedCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "savedCourses"));
  let courses = [];
  querySnapshot.forEach((doc) => {
    courses.push(doc.data());
  });
  return courses;
};

export const addToSavedCourses = async (uid, courseId) => {
  try {
    const userDocRef = doc(db, "users", uid);
    // First, fetch the user document to get the existing savedCourses array
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log(userData.savedCourses);
      const updatedSavedCourses = [courseId, ...userData.savedCourses];
      console.log("updatedSavedCourses", updatedSavedCourses);
      // Update the user document with the updated savedCourses array
      await updateDoc(userDocRef, { savedCourses: updatedSavedCourses });

      console.log("Course added to savedCourses for user with ID: ", uid);
    } else {
      console.error("User document not found.");
    }
  } catch (e) {
    console.error("Error adding course to savedCourses: ", e);
  }
};
// export const addToSavedCourses = async (uid, courseId) => {
//   try {
//     console.log("addToSavedCourses Started");
//     const userDocRef = doc(db, "users", uid);
//     // Data to associate with the user
//     const userData = {
//       savedCourses: [courseId, ...savedCourses],
//       // myLearning: [],
//     };
//     // Set or update user data
//     await setDoc(userDocRef, userData); // Use setDoc to set the data

//     console.log("Document written with ID: ", uid); // You can use 'uid' as the document ID
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

export const checkIfBookmarked = async (courseName) => {
  const q = query(
    collection(db, "savedCourses"),
    where("name", "==", courseName)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const bookmarkCourse = async (course) => {
  await addDoc(collection(db, "savedCourses"), {
    name: course.name,
    image: course.image,
    duration: course.duration,
    rate: course.rate,
    price: course.price,
  });
};
