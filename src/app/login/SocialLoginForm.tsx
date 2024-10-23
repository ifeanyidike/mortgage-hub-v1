import { handleSocialLogin } from "@/actions/auth";
import cookies from "js-cookies";
import React from "react";

const SocialLoginForm = ({ role }: { role: string }) => {
  const performAction = (formData: FormData) => {
    formData.set("role", role);
    handleSocialLogin(formData);
  };
  return (
    <form action={performAction}>
      <button
        className="login-with-google-btn"
        type="submit"
        name="action"
        value="google"
      >
        Sign in with Google
      </button>
    </form>
  );
};

export default SocialLoginForm;
