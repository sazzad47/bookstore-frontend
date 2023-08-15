import React from "react";
import RefreshSpinnerProps from "../../types/molecules/RefreshSpinner";

const RefreshSpinner: React.FC<RefreshSpinnerProps> = ({
  size = 28,
  color = "#ec4899",
  pullChange = 0,
  isFetching 
}) => {
  return (
    <div
      style={{
        marginTop: isFetching? "1rem" : "-3rem",
        position: "absolute",
        top: `${pullChange / 3.118}px`,
        zIndex: 1,
      }}
      className=""
    >
      <div className="loader">
        <span className="loader-before"></span>
        <span className="loader-after"></span>
      </div>
      <style>
        {`
          .loader {
            width: ${size}px;
            height: ${size}px;
            border: 3px solid ${color};
            border-bottom-color: transparent;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
          }
          .loader::after {
            content: '';  
            position: absolute;
            box-sizing: border-box;
            left: 10px;
            top: 16px;
            border: 6px solid transparent;
            border-right-color: ${color};
            transform: rotate(-40deg);
          }
          
          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(${isFetching? "360": pullChange}deg);
            }
          } 
        `}
      </style>
    </div>
  );
};

export default RefreshSpinner;
