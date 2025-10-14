import React, { useEffect, useState } from 'react';
import './styles/theme.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import ConfirmDialog from './components/ConfirmDialog';
import { getNotes, createNote, updateNote, deleteNote } from './api/notesApi';

/**
 * PUBLIC_INTERFACE
 * App is the main shell: header, list, modals for create/edit, and confirmation for delete.
 */
function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // fetch notes
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getNotes();
        if (!ignore) setNotes(Array.isArray(data) ? data : []);
      } catch (e) {
        setToast(e.message || 'Failed to load notes');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchData();
    return () => { ignore = true; };
  }, []);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(note) {
    setEditing(note);
    setFormOpen(true);
  }

  async function handleSubmit(formData) {
    setSubmitting(true);
    try {
      if (editing) {
        const updated = await updateNote(editing.id, formData);
        // update in place
        setNotes((prev) => prev.map(n => n.id === updated.id ? updated : n));
        setToast('Note updated');
      } else {
        const created = await createNote(formData);
        setNotes((prev) => [created, ...prev]);
        setToast('Note created');
      }
      setFormOpen(false);
      setEditing(null);
    } catch (e) {
      setToast(e.message || 'Failed to save note');
    } finally {
      setSubmitting(false);
    }
  }

  function askDelete(note) {
    setDeleteTarget(note);
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteNote(deleteTarget.id);
      setNotes((prev) => prev.filter(n => n.id !== deleteTarget.id));
      setToast('Note deleted');
    } catch (e) {
      setToast(e.message || 'Failed to delete note');
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
      setDeleteTarget(null);
    }
  }

  return (
    <>
      <Header onCreate={openCreate} />
      <main className="container">
        {loading ? (
          <div className="card center">
            <span className="spinner" aria-label="Loading notes" />
          </div>
        ) : (
          <NotesList
            notes={notes}
            query={query}
            setQuery={setQuery}
            onEdit={openEdit}
            onDelete={askDelete}
          />
        )}
      </main>

      <NoteForm
        open={formOpen}
        initialData={editing}
        onCancel={() => { if (!submitting) { setFormOpen(false); setEditing(null); } }}
        onSubmit={handleSubmit}
        submitting={submitting}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete note?"
        message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.title}"? This cannot be undone.` : ''}
        onCancel={() => { if (!deleting) { setConfirmOpen(false); setDeleteTarget(null); } }}
        onConfirm={confirmDelete}
        loading={deleting}
      />

      {toast && (
        <div className="toast" role="status" onAnimationEnd={() => {}}>
          {toast}
          <button
            className="btn ghost"
            style={{ marginLeft: 10, padding: '4px 8px' }}
            onClick={() => setToast('')}
            aria-label="Dismiss message"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}

export default App;
