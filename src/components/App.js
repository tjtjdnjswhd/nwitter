import React, { useState, useEffect } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "firebaseInstance";

function App() {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (arg) => user.updateProfile(arg)
        });
      } else {
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (arg) => user.updateProfile(arg)
    });
  }

  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObject)} userObject={userObject} refreshUser={refreshUser} /> : "initializing..."}
    </>
  );
}

export default App;