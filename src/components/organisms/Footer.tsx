import React from "react";

// Define the props interface for the Footer component
interface FooterProps {
    content?: string; // Optional content to display in the footer
}

// Define the Footer component
const Footer: React.FC<FooterProps> = ({ content }) => {
    return (
        // Use a div with the "footer" class to encapsulate the footer
        <div className="footer">
            <p className="content"> {content} </p> {/* Render the content */}
        </div>
    );
};

export default Footer;
