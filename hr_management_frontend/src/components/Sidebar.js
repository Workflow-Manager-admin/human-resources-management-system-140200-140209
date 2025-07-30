import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/dashboard",
    icon: <span role="img" aria-label="Dashboard" data-icon>🏠</span>,
    label: "Dashboard",
  },
  {
    to: "/employees",
    icon: <span role="img" aria-label="Employees" data-icon>🧑‍💼</span>,
    label: "Employees",
  },
  {
    to: "/clients",
    icon: <span role="img" aria-label="Clients" data-icon>👥</span>,
    label: "Clients",
  },
  {
    to: "/projects",
    icon: <span role="img" aria-label="Projects" data-icon>📁</span>,
    label: "Projects",
  },
  {
    to: "/allocations",
    icon: <span role="img" aria-label="Allocations" data-icon>🔀</span>,
    label: "Allocations",
  },
];

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <span>HR&nbsp;<span style={{color: "var(--accent)"}}>Manage</span></span>
      </div>
      <ul className="sidebar-nav">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                "sidebar-link" + (isActive ? " active" : "")
              }
            >
              {item.icon}&nbsp;<span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
