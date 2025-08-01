import type { CSSProperties } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeMenuItem: string;
  onMenuItemChange: (itemId: string) => void;
  onGetSchema: () => void;
  onSetSchema: () => void;
  hasSchema: boolean;
}

export function Sidebar({
  menuItems,
  activeMenuItem,
  onMenuItemChange,
  onGetSchema,
  onSetSchema,
  hasSchema,
}: SidebarProps) {
  const sidebarStyle: CSSProperties = {
    width: '240px',
    backgroundColor: '#f9fafb',
    borderRight: '1px solid #e5e7eb',
    padding: '16px 0',
  };

  const getMenuItemStyle = (isActive: boolean): CSSProperties => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    border: 'none',
    backgroundColor: isActive ? '#eff6ff' : 'transparent',
    color: isActive ? '#1d4ed8' : '#374151',
    fontSize: '14px',
    fontWeight: isActive ? '500' : '400',
    cursor: 'pointer',
    textAlign: 'left',
    borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
    transition: 'all 0.2s',
  });

  const footerStyle: CSSProperties = {
    padding: '16px 24px',
    borderTop: '1px solid #e5e7eb',
    marginTop: '32px',
  };

  const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
  };

  const footerButtonStyle: CSSProperties = {
    flex: 1,
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const statusStyle: CSSProperties = {
    fontSize: '11px',
    color: '#6b7280',
  };

  return (
    <div style={sidebarStyle}>
      <nav>
        {menuItems.map((item) => {
          const isActive = activeMenuItem === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onMenuItemChange(item.id)}
              style={getMenuItemStyle(isActive)}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onFocus={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onBlur={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div style={footerStyle}>
        <div style={buttonContainerStyle}>
          <button type="button" onClick={onGetSchema} style={footerButtonStyle}>
            Get Schema
          </button>
          <button type="button" onClick={onSetSchema} style={footerButtonStyle}>
            Set Sample
          </button>
        </div>
        <div style={statusStyle}>Schema: {hasSchema ? '✅ Loaded' : '❌ Empty'}</div>
      </div>
    </div>
  );
}
