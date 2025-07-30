import React from "react";
import { useLocation } from "react-router-dom";

const sectionName = (pathname) => {
  if (pathname.startsWith("/employees")) return "Employees";
  if (pathname.startsWith("/clients")) return "Clients";
  if (pathname.startsWith("/projects")) return "Projects";
  if (pathname.startsWith("/allocations")) return "Allocations";
  return "Dashboard";
};

function TopBar() {
  const location = useLocation();
  const title = sectionName(location.pathname);

  return (
    <div className="top-bar">
      <span className="top-bar-title">{title}</span>
      <div className="top-bar-actions">
        <span title="Notifications" style={{cursor:"pointer"}} role="img" aria-label="Bell">🔔</span>
      </div>
    </div>
  );
}

export default TopBar;
