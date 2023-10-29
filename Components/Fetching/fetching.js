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

export const addToSavedCourses = async (uid, courseId, setSaved) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const savedCourses = userData.savedCourses || [];
      const courseIndex = savedCourses.indexOf(courseId);
      let className = "";
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
      // if (userDoc.exists()) {
      //   const userData = userDoc.data();
      //   const updatedSavedCourses = [courseId, ...userData.savedCourses];
      //   // Update the user document with the updated savedCourses array
      //   await updateDoc(userDocRef, { savedCourses: updatedSavedCourses });
    } else {
      console.error("User document not found.");
    }
  } catch (e) {
    console.error("Error adding course to savedCourses: ", e);
  }
};

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
