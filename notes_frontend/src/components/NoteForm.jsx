import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteForm handles both creation and editing of notes.
 */
export default function NoteForm({ open, initialData = null, onCancel, onSubmit, submitting = false }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setTitle(initialData?.title || '');
      setContent(initialData?.content || '');
      setErrors({});
    }
  }, [open, initialData]);

  function validate() {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;

    onSubmit({
      title: title.trim(),
      content: content,
    });
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="note-form-title">
      <div className="modal">
        <div className="modal-header">
          <span id="note-form-title">{initialData ? 'Edit Note' : 'New Note'}</span>
          <button className="btn ghost" onClick={onCancel} aria-label="Close form" disabled={submitting}>Close</button>
        </div>
        <div className="modal-body">
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              {errors.title && <div id="title-error" className="error-text">{errors.title}</div>}
            </div>

            <div className="field">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Optional details..."
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn ghost" onClick={onCancel} disabled={submitting}>Cancel</button>
              <button type="submit" className="btn" disabled={submitting}>
                {submitting ? <span className="spinner" aria-label="Saving" /> : (initialData ? 'Save Changes' : 'Create Note')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
