import {
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
