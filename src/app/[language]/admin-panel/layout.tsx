import React from "react";
import ResponsiveDrawer from "@/components/drawer/DrawerComponent";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResponsiveDrawer>
      <main>{children}</main>
    </ResponsiveDrawer>
  );
};

export default Layout;
