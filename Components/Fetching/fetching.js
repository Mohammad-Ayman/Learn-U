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
  const courseCollection = collection(db, "courses");
  const courseSnapshot = await getDocs(courseCollection);
  let fetchedCourses = [];
  courseSnapshot.forEach((doc) => {
    fetchedCourses.push({ _id: doc.id, ...doc.data() });
  });
  return fetchedCourses;
};
export const fetchLimitedCourses = async (limitC = 1) => {
  const courseCollection = query(collection(db, "courses"), limit(limitC));
  const courseSnapshot = await getDocs(courseCollection);
  let fetchedCourses = [];
  courseSnapshot.forEach((doc) => {
    fetchedCourses.push({ _id: doc.id, ...doc.data() });
  });
  return fetchedCourses;
};
export const fetchCoursesWhere = async (
  firebaseField,
  operator,
  localField
) => {
  const courseWhere = query(
    collection(db, "courses"),
    where(firebaseField, operator, localField)
  );
  const courseSnapshot = await getDocs(courseWhere);
  let fetchedCourses = [];
  courseSnapshot.forEach((doc) => {
    fetchedCourses.push({ _id: doc.id, ...doc.data() });
  });
  return fetchedCourses;
};
export const fetchCourseByDocumentId = async (documentId) => {
  const courseRef = doc(collection(db, "courses"), documentId);
  try {
    const courseSnapshot = await getDoc(courseRef);
    if (courseSnapshot.exists()) {
      const courseData = { _id: documentId, ...courseSnapshot.data() };
      return courseData;
    } else {
      console.log("Course not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
};
export const fetchUserSavedCourses = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  return userDoc.data();
};

export const addToSavedCourses = async (uid, courseId, setSaved) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const savedCourses = userData.savedCourses || [];
      const courseIndex = savedCourses.indexOf(courseId);
      if (courseIndex !== -1) {
        savedCourses.splice(courseIndex, 1);
        setSaved(false);
      } else {
        savedCourses.push(courseId);
        setSaved(true);
      }
      // Update the user document with the updated savedCourses array
      await updateDoc(userDocRef, { savedCourses });

      console.log(
        `Course ${courseId} ${
          courseIndex !== -1 ? "removed from" : "added to"
        } savedCourses for user with ID: ${uid}`
      );
    } else {
      console.error("User document not found.");
    }
  } catch (e) {
    console.error("Error adding course to savedCourses: ", e);
  }
};

export const addToMyLearningCourses = async (uid, courseId) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const myLearning = userData.myLearning || [];
      const courseIndex = myLearning.indexOf(courseId);
      if (courseIndex !== -1) {
        myLearning.splice(courseIndex, 1);
      } else {
        myLearning.push(courseId);
      }
      // Update the user document with the updated myLearning array
      await updateDoc(userDocRef, { myLearning });
    } else {
    }
  } catch (e) {}
};
