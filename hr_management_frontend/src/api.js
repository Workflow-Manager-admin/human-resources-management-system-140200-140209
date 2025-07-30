const BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

// PUBLIC_INTERFACE
export async function apiGet(resource, params = "") {
  try {
    const res = await fetch(`${BASE}/${resource}${params ? `?${params}` : ""}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (e) {
    throw new Error(e.message || "API error");
  }
}

// PUBLIC_INTERFACE
export async function apiPost(resource, data) {
  try {
    const res = await fetch(`${BASE}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data ?? {}),
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (e) {
    throw new Error(e.message || "API error");
  }
}

// PUBLIC_INTERFACE
export async function apiPut(resource, id, data) {
  try {
    const res = await fetch(`${BASE}/${resource}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data ?? {}),
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (e) {
    throw new Error(e.message || "API error");
  }
}

// PUBLIC_INTERFACE
export async function apiDelete(resource, id) {
  try {
    const res = await fetch(`${BASE}/${resource}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (e) {
    throw new Error(e.message || "API error");
  }
}
