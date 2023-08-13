import React, { ReactNode } from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="template">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
