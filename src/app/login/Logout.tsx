import { handleLogout } from "@/actions/auth";
import { Button } from "antd";
import React from "react";

const Logout = () => {
  return (
    <form action={handleLogout}>
      <Button shape="round" className="uppercase" htmlType="submit">
        Logout
      </Button>
    </form>
  );
};

export default Logout;
