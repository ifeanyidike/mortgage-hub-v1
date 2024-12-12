import { handleSocialLogin } from "@/actions/auth";
import cookies from "js-cookies";
import React from "react";

const SocialLoginForm = ({ role }: { role?: string }) => {
  const performAction = (formData: FormData) => {
    if (role) formData.set("role", role);
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
        Continue with Google
      </button>
    </form>
  );
};

export default SocialLoginForm;

export const SocialLoginForm2 = ({ role }: { role?: string }) => {
  const performSocialLogin = (formData: FormData) => {
    if (role) formData.set("role", role);
    handleSocialLogin(formData);
  };
  return (
    <form
      action={performSocialLogin}
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-4"
    >
      <button
        type="submit"
        className="btn flex items-center justify-center w-full py-3 px-4 rounded-lg border border-gray-300 hover:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition"
        name="action"
        value="google"
      >
        <img
          src="/media/brand-logos/google.svg"
          alt="Google"
          className="w-5 h-5 mr-3"
        />
        Continue with Google
      </button>
    </form>
  );
};
