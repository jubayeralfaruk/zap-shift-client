import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userDataUpdate = (profile) => {
      return updateProfile(auth.currentUser, profile)
    }
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
      return signOut(auth)
    }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
      })
      return unsubscribe
    }, [])
  const authInfo = {
    user,
    registerUser,
    userDataUpdate,
    loginUser,
    logOut,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
