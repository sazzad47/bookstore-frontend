import React from 'react';
import LoadingSpinnerProps from '../../types/molecules/LoadingSpinner';

// Define the LoadingSpinner component
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, color = '#701a75' }) => {
    return (
        <div>
            <div className="lds-dual-ring"></div>
            <style>
                {`
                /* Style for the loading spinner animation */
                .lds-dual-ring {
                    display: inline-block;
                    width: ${size}px;
                    height: ${size}px;
                }
                .lds-dual-ring:after {
                    content: " ";
                    display: block;
                    width: ${size - 16}px;
                    height: ${size - 16}px;
                    margin: 8px; 
                    border-radius: 50%;
                    border: 6px solid ${color};
                    border-color: ${color} transparent ${color} transparent;
                    animation: lds-dual-ring 1.2s linear infinite;
                }
                @keyframes lds-dual-ring {
                    0% {
                    transform: rotate(0deg);
                    }
                    100% {
                    transform: rotate(360deg);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default LoadingSpinner;
