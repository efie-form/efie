import type { CSSProperties } from 'react';
import type { MenuItem } from './sidebar';

interface MainContentProps {
  activeMenuItem: string;
  menuItems: MenuItem[];
  children?: React.ReactNode;
}

export function MainContent({ activeMenuItem, menuItems, children }: MainContentProps) {
  const containerStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const placeholderContainerStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  };

  const placeholderContentStyle: CSSProperties = {
    textAlign: 'center',
    color: '#6b7280',
  };

  const placeholderIconStyle: CSSProperties = {
    fontSize: '48px',
    marginBottom: '16px',
  };

  const placeholderTitleStyle: CSSProperties = {
    margin: '0 0 8px 0',
    fontSize: '24px',
    color: '#111827',
  };

  const placeholderTextStyle: CSSProperties = {
    margin: 0,
    fontSize: '16px',
  };

  if (activeMenuItem === 'form-builder') {
    return <div style={containerStyle}>{children}</div>;
  }

  const currentMenuItem = menuItems.find((item) => item.id === activeMenuItem);

  return (
    <div style={containerStyle}>
      <div style={placeholderContainerStyle}>
        <div style={placeholderContentStyle}>
          <div style={placeholderIconStyle}>{currentMenuItem?.icon}</div>
          <h2 style={placeholderTitleStyle}>{currentMenuItem?.label}</h2>
          <p style={placeholderTextStyle}>This section is coming soon!</p>
        </div>
      </div>
    </div>
  );
}
