import React, { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";

// DATA MODEL (assumed): id, name, client_id

function Projects() {
  const [list, setList] = useState([]);
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", client_id: "" });
  const [alert, setAlert] = useState(null);

  function load() {
    apiGet("projects")
      .then(setList)
      .catch(e => setAlert({ type: "danger", msg: e.message }));
    apiGet("clients")
      .then(setClients)
      .catch(() => {});
  }
  useEffect(() => { load(); }, []);

  function resetForm() {
    setForm({ name: "", client_id: "" });
    setSelected(null);
    setAlert(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);
    if (!form.name || !form.client_id) {
      setAlert({ type: "danger", msg: "All fields required" });
      return;
    }
    const f = selected
      ? apiPut("projects", selected.id, form)
      : apiPost("projects", form);
    f
      .then(() => {
        load();
        resetForm();
        setAlert({ type: "success", msg: selected ? "Project updated" : "Project added" });
      })
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }

  function handleEdit(proj) {
    setSelected(proj);
    setForm({ name: proj.name, client_id: proj.client_id });
    setAlert(null);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete project?")) return;
    apiDelete("projects", id)
      .then(() => {
        load();
        resetForm();
        setAlert({ type: "success", msg: "Project deleted" });
      })
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }

  return (
    <div>
      <div className="hrm-h1">Projects</div>
      {alert &&
        <div className={`hrm-alert hrm-alert-${alert.type}`}>{alert.msg}</div>
      }
      <form onSubmit={handleSubmit} style={{maxWidth:"500px"}}>
        <div className="hrm-form-group">
          <label className="hrm-form-label">Name</label>
          <input className="hrm-form-input" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="hrm-form-group">
          <label className="hrm-form-label">Client</label>
          <select className="hrm-form-select"
            value={form.client_id}
            onChange={e => setForm(f => ({ ...f, client_id: e.target.value }))}
          >
            <option value="">--Select--</option>
            {clients.map(cli => (
              <option key={cli.id} value={cli.id}>{cli.name}</option>
            ))}
          </select>
        </div>
        <div className="hrm-form-actions">
          <button className="hrm-btn" type="submit">{selected ? "Update" : "Add"} Project</button>
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
            <th>Name</th>
            <th>Client</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(list.length === 0) ? (
            <tr><td colSpan={4}>No projects</td></tr>
          ) : (
            list.map((proj, idx) => (
              <tr key={proj.id}>
                <td>{idx+1}</td>
                <td>{proj.name}</td>
                <td>
                  {clients.find(c => c.id === proj.client_id)?.name ?? "-"}
                </td>
                <td className="hrm-table-actions">
                  <button className="hrm-btn hrm-btn-accent" type="button" onClick={() => handleEdit(proj)}>Edit</button>
                  <button className="hrm-btn hrm-btn-danger" type="button" onClick={() => handleDelete(proj.id)}>Delete</button>
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

export default Projects;
