import React, { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";

// DATA MODEL (assumed):
// id, first_name, last_name, email, position

function Employees() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", position: ""
  });
  const [alert, setAlert] = useState(null);

  function load() {
    apiGet("employees")
      .then(setList)
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }
  useEffect(() => { load(); }, []);

  function resetForm() {
    setForm({ first_name: "", last_name: "", email: "", position: "" });
    setSelected(null);
    setAlert(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);
    if (!form.first_name || !form.last_name || !form.email) {
      setAlert({ type: "danger", msg: "All fields required" });
      return;
    }
    const f = selected
      ? apiPut("employees", selected.id, form)
      : apiPost("employees", form);
    f
      .then(() => {
        load();
        resetForm();
        setAlert({ type: "success", msg: selected ? "Employee updated" : "Employee added" });
      })
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }

  function handleEdit(emp) {
    setSelected(emp);
    setForm({
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position ?? "",
    });
    setAlert(null);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete employee?")) return;
    apiDelete("employees", id)
      .then(() => {
        load();
        resetForm();
        setAlert({ type: "success", msg: "Employee deleted" });
      })
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }

  return (
    <div>
      <div className="hrm-h1">Employees</div>
      {alert &&
        <div className={`hrm-alert hrm-alert-${alert.type}`}>{alert.msg}</div>
      }
      <form onSubmit={handleSubmit} style={{maxWidth:"500px"}}>
        <div className="hrm-form-group">
          <label className="hrm-form-label">First Name</label>
          <input className="hrm-form-input" value={form.first_name}
            onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
          />
        </div>
        <div className="hrm-form-group">
          <label className="hrm-form-label">Last Name</label>
          <input className="hrm-form-input" value={form.last_name}
            onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
          />
        </div>
        <div className="hrm-form-group">
          <label className="hrm-form-label">Email</label>
          <input className="hrm-form-input" type="email" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div className="hrm-form-group">
          <label className="hrm-form-label">Position</label>
          <input className="hrm-form-input" value={form.position}
            onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
          />
        </div>
        <div className="hrm-form-actions">
          <button className="hrm-btn" type="submit">{selected ? "Update" : "Add"} Employee</button>
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
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Position</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(list.length === 0) ? (
            <tr><td colSpan={6}>No employees</td></tr>
          ) : (
            list.map((emp, idx) => (
              <tr key={emp.id}>
                <td>{idx+1}</td>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td className="hrm-table-actions">
                  <button className="hrm-btn hrm-btn-accent" type="button" onClick={() => handleEdit(emp)}>Edit</button>
                  <button className="hrm-btn hrm-btn-danger" type="button" onClick={() => handleDelete(emp.id)}>Delete</button>
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

export default Employees;
