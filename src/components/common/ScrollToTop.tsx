import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children: React.ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div> {children} </div>;
};

export default ScrollToTop;
