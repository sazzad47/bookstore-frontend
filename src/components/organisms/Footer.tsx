import React from "react";

interface FooterProps {
  content?: string;
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <div className="footer">
      <p className="content"> {content} </p>
    </div>
  );
};

export default Footer;
