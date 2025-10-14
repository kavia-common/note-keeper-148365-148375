import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header component renders the app title and primary actions with Ocean Professional gradient.
 */
export default function Header({ onCreate }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="brand" aria-label="Note Keeper">
          <div className="brand-badge" aria-hidden>NK</div>
          <div className="brand-title">Note Keeper</div>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={onCreate} aria-label="Create new note">
            + New Note
          </button>
        </div>
      </div>
    </header>
  );
}
