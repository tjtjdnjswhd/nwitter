import AuthForm from "components/AuthForm";
import { authService, getSocialProvider } from "firebaseInstance";
import React from "react";

const Auth = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    const provider = getSocialProvider(name);
    await authService.signInWithPopup(provider)
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>Continue with google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth;