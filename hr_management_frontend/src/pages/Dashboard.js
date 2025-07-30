import React, { useEffect, useState } from "react";
import { apiGet } from "../api";

// Simple bar chart for allocations-per-project
function AllocationChart({ data }) {
  if (!data.length) return null;
  const max = Math.max(...data.map(d => d.count));
  return (
    <div style={{display:"flex", gap:"25px", alignItems:"flex-end", margin:"2rem 0"}}>
      {data.map((proj) => (
        <div key={proj.name} style={{textAlign:"center"}}>
          <div
            style={{
              height: (max ? (120 * proj.count/max): 10) + "px",
              width: "56px",
              background: "var(--primary)",
              borderRadius: "6px 6px 0 0",
              color: "var(--text-light)",
              display:"flex",
              alignItems:"flex-end",
              justifyContent:"center",
            }}
            title={`${proj.count} allocations`}
          >
            <span style={{fontWeight:"600",color:"var(--accent)",paddingTop:4}}>{proj.count}</span>
          </div>
          <div style={{fontSize:"0.98rem",marginTop:"2px",maxWidth:54,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{proj.name}</div>
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  const [summary, setSummary] = useState({
    employees: 0,
    clients: 0,
    projects: 0,
    allocationsByProject: []
  });

  useEffect(() => {
    Promise.all([
      apiGet("employees").catch(() => []),
      apiGet("clients").catch(() => []),
      apiGet("projects").catch(() => []),
      apiGet("allocations").catch(() => []),
    ]).then(([employees, clients, projects, allocations]) => {
      // Allocations by project
      const byProject = projects.map(p => ({
        id: p.id,
        name: p.name,
        count: allocations.filter(a => a.project_id === p.id).length,
      }));
      setSummary({
        employees: employees.length,
        clients: clients.length,
        projects: projects.length,
        allocationsByProject: byProject,
      });
    });
  }, []);

  return (
    <div>
      <div className="hrm-h1">Dashboard</div>
      <div style={{display:"flex", gap:"40px", flexWrap:"wrap", marginBottom:"2rem"}}>
        <div className="hrm-badge">Employees: {summary.employees}</div>
        <div className="hrm-badge">Clients: {summary.clients}</div>
        <div className="hrm-badge">Projects: {summary.projects}</div>
      </div>
      <div>
        <b>Allocations per Project</b>
        <AllocationChart data={summary.allocationsByProject} />
      </div>
    </div>
  );
}
export default Dashboard;
