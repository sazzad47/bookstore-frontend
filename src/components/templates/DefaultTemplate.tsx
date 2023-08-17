import React, { ReactNode } from 'react';

// Define the props interface for the Layout component
interface LayoutProps {
  children: ReactNode;
}

// Define the Layout component
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="template">{children}</div>;
};

export default Layout;
