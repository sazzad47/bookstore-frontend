import React from "react";

// Define the props interface for the Header component
interface HeaderProps {
    title?: string; // Optional title to display in the header
}

// Define the Header component
const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        // Use a div with the "header" class to encapsulate the header
        <div className="header">
            <span className="title"> {title} </span> {/* Render the title */}
        </div>
    );
};

export default Header;
