import React from "react";
const AuthContext = React.createContext({
  isLoggedIn: false,
  userId:'',
  savedCourses: [],
  myLearning: [],
  
});

export default AuthContext;
