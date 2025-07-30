import React, { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";

// DATA MODEL (assumed): id, name, contact_email

function Clients() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", contact_email: "" });
  const [alert, setAlert] = useState(null);

  function load() {
    apiGet("clients")
      .then(setList)
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }
  useEffect(() => { load(); }, []);

  function resetForm() {
    setForm({ name: "", contact_email: "" });
    setSelected(null);
    setAlert(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);
    if (!form.name || !form.contact_email) {
      setAlert({ type: "danger", msg: "All fields required" });
      return;
    }
    const f = selected
      ? apiPut("clients", selected.id, form)
      : apiPost("clients", form);
    f
      .then(() => {
        load();
        resetForm();
        setAlert({ type: "success", msg: selected ? "Client updated" : "Client added" });
      })
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }

  function handleEdit(cli) {
    setSelected(cli);
    setForm({ name: cli.name, contact_email: cli.contact_email });
    setAlert(null);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete client?")) return;
    apiDelete("clients", id)
      .then(() => {
        load();
        resetForm();
        setAlert({ type: "success", msg: "Client deleted" });
      })
      .catch(e => setAlert({ type: "danger", msg: e.message }));
  }

  return (
    <div>
      <div className="hrm-h1">Clients</div>
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
          <label className="hrm-form-label">Contact Email</label>
          <input className="hrm-form-input" type="email" value={form.contact_email}
            onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))}
          />
        </div>
        <div className="hrm-form-actions">
          <button className="hrm-btn" type="submit">{selected ? "Update" : "Add"} Client</button>
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
            <th>Contact Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(list.length === 0) ? (
            <tr><td colSpan={4}>No clients</td></tr>
          ) : (
            list.map((cli, idx) => (
              <tr key={cli.id}>
                <td>{idx+1}</td>
                <td>{cli.name}</td>
                <td>{cli.contact_email}</td>
                <td className="hrm-table-actions">
                  <button className="hrm-btn hrm-btn-accent" type="button" onClick={() => handleEdit(cli)}>Edit</button>
                  <button className="hrm-btn hrm-btn-danger" type="button" onClick={() => handleDelete(cli.id)}>Delete</button>
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

export default Clients;
