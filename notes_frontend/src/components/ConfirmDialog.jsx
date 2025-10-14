import React from 'react';

/**
 * PUBLIC_INTERFACE
 * A simple confirmation dialog/modal.
 */
export default function ConfirmDialog({ open, title = 'Confirm', message, onCancel, onConfirm, loading = false }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="modal">
        <div className="modal-header">
          <span id="confirm-title">{title}</span>
          <button className="btn ghost" onClick={onCancel} aria-label="Close">Close</button>
        </div>
        <div className="modal-body">
          <p className="muted">{message}</p>
        </div>
        <div className="modal-actions">
          <button className="btn ghost" onClick={onCancel} disabled={loading}>Cancel</button>
          <button className="btn error" onClick={onConfirm} disabled={loading}>
            {loading ? <span className="spinner" aria-label="Deleting" /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
