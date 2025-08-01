import type { CSSProperties } from 'react';

interface TopBarProps {
  onSave: () => void;
}

export function TopBar({ onSave }: TopBarProps) {
  const topBarStyle: CSSProperties = {
    height: '64px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  };

  const logoContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const logoStyle: CSSProperties = {
    width: '32px',
    height: '32px',
    backgroundColor: '#3b82f6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
  };

  const rightSideStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const saveButtonStyle: CSSProperties = {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background-color 0.2s',
  };

  const avatarStyle: CSSProperties = {
    width: '36px',
    height: '36px',
    backgroundColor: '#f3f4f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid #e5e7eb',
  };

  return (
    <div style={topBarStyle}>
      {/* Logo/Brand */}
      <div style={logoContainerStyle}>
        <div style={logoStyle}>E</div>
        <h1 style={titleStyle}>Efie Form Admin</h1>
      </div>

      {/* Right side - Save button and Avatar */}
      <div style={rightSideStyle}>
        <button
          type="button"
          onClick={onSave}
          style={saveButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6';
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6';
          }}
        >
          💾 Save Schema
        </button>

        {/* Avatar */}
        <div style={avatarStyle}>
          <span style={{ fontSize: '16px' }}>👤</span>
        </div>
      </div>
    </div>
  );
}
