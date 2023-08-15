import React from "react";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="header">
      <span className="title"> {title} </span>
    </div>
  );
};

export default Header;
