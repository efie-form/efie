import type { CSSProperties } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const layoutStyle: CSSProperties = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
  };

  return <div style={layoutStyle}>{children}</div>;
}

export function AdminLayoutMain({ children }: AdminLayoutProps) {
  const mainLayoutStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
  };

  return <div style={mainLayoutStyle}>{children}</div>;
}
