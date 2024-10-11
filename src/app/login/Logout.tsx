import { handleLogout } from "@/actions/auth";
import React from "react";

const Logout = () => {
  return (
    <form action={handleLogout}>
      <button className="bg-blue-500 text-white">Logout</button>
    </form>
  );
};

export default Logout;
