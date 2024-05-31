// components/Layout.tsx
"use client";
import classNames from "classnames";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "@/components/Sidebar";
const Layout = (props) => {
  // const [collapsed, setSidebarCollapsed] = useState(false);

  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div
      className={classNames({
        // 👇 use grid layout
        "grid min-h-screen": true,
        // 👇 toggle the width of the sidebar depending on the state
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        // 👇 transition animation classes
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setSidebarCollapsed}
        shown={showSidebar}
      />
      {/* content */}
      <div className="">{props.children}</div>
    </div>
  );
};
export default Layout;
