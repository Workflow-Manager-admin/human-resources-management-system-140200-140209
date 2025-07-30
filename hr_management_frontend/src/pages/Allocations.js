import React, { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";

// DATA MODEL (assumed): id, employee_id, project_id
function Allocations() {
  const [list, setList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ employee_id: "", project_id: "" });
  const [alert, setAlert] = useState(null);

  function load() {
    apiGet("allocations")
      .then(setList)
      .catch(e => setAlert({ type: "danger", msg: e.message }));
    apiGet("employees").then(setEmployees).catch(() => {});
    apiGet("projects").then(setProjects).catch(() => {});
  }
  useEffect(() => { load(); }, []);

  function resetForm() {
    setForm({ employee_id: "", project_id: "" });
    setSelected(null);
    setAlert(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);
    if (!form.employee_id || !form.project_id) {
      setAlert({ type: "danger", msg: "All fields required" });
      return;
    }
    const f = selected
      ? apiPut("allocations", selected.id, form)
      : apiPost("allocations", form);
    f
      .then(() => {
        load();
        resetForm();
        setAlert({ type: "success", msg: selected ? "Allocation updated" : "Allocation added" });
      })
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }

  function handleEdit(a) {
    setSelected(a);
    setForm({ employee_id: a.employee_id, project_id: a.project_id });
    setAlert(null);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete allocation?")) return;
    apiDelete("allocations", id)
      .then(() => {
        load();
        resetForm();
        setAlert({ type: "success", msg: "Allocation deleted" });
      })
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }

  return (
    <div>
      <div className="hrm-h1">Allocations</div>
      {alert &&
        <div className={`hrm-alert hrm-alert-${alert.type}`}>{alert.msg}</div>
      }
      <form onSubmit={handleSubmit} style={{maxWidth:"500px"}}>
        <div className="hrm-form-group">
          <label className="hrm-form-label">Employee</label>
          <select className="hrm-form-select"
            value={form.employee_id}
            onChange={e => setForm(f => ({ ...f, employee_id: e.target.value }))}
          >
            <option value="">--Select--</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.first_name} {emp.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="hrm-form-group">
          <label className="hrm-form-label">Project</label>
          <select className="hrm-form-select"
            value={form.project_id}
            onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))}
          >
            <option value="">--Select--</option>
            {projects.map(proj => (
              <option key={proj.id} value={proj.id}>{proj.name}</option>
            ))}
          </select>
        </div>
        <div className="hrm-form-actions">
          <button className="hrm-btn" type="submit">{selected ? "Update" : "Allocate"}</button>
          {selected && (
            <button className="hrm-btn hrm-btn-accent" type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <hr style={{margin:"2rem 0"}} />
      <div style={{overflowX:"auto"}}>
      <table className="hrm-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Project</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(list.length === 0) ? (
            <tr><td colSpan={4}>No allocations</td></tr>
          ) : (
            list.map((a, idx) => (
              <tr key={a.id}>
                <td>{idx+1}</td>
                <td>
                  {employees.find(e => e.id === a.employee_id) ?
                    employees.find(e => e.id === a.employee_id).first_name +
                    " " +
                    employees.find(e => e.id === a.employee_id).last_name 
                    : "-"}
                </td>
                <td>
                  {projects.find(p => p.id === a.project_id)?.name ?? "-"}
                </td>
                <td className="hrm-table-actions">
                  <button className="hrm-btn hrm-btn-accent" type="button" onClick={() => handleEdit(a)}>Edit</button>
                  <button className="hrm-btn hrm-btn-danger" type="button" onClick={() => handleDelete(a.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Allocations;
