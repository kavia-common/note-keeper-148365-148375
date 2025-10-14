import React, { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * NotesList renders a filterable list of notes.
 */
export default function NotesList({ notes, query, setQuery, onEdit, onDelete }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      (n.content || '').toLowerCase().includes(q)
    );
  }, [notes, query]);

  return (
    <div className="card">
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notes"
        />
        <div className="helper">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</div>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">No notes found.</div>
      ) : (
        <div className="list" role="list">
          {filtered.map((n) => (
            <div key={n.id} className="note-item" role="listitem">
              <div>
                <h3 className="note-title">{n.title}</h3>
                {n.content ? <p className="note-content">{n.content}</p> : <p className="note-content muted">No content</p>}
              </div>
              <div className="note-actions">
                <button className="btn ghost" onClick={() => onEdit(n)} aria-label={`Edit ${n.title}`}>Edit</button>
                <button className="btn error" onClick={() => onDelete(n)} aria-label={`Delete ${n.title}`}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
