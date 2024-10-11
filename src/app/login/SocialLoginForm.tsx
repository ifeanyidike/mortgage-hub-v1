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
        className="bg-pink-400 text-white p-1 rounded-md m-1 text-lg"
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
