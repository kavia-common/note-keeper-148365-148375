const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.message) message = data.message;
    } catch {
      // ignore JSON parse error
    }
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  // 204 No Content
  if (res.status === 204) return null;
  return res.json();
}

// PUBLIC_INTERFACE
export async function getNotes() {
  /** Fetch all notes */
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function createNote(payload) {
  /** Create a new note */
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function updateNote(id, payload) {
  /** Update an existing note by id */
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete note by id */
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
