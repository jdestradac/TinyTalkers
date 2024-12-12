import { FaInfoCircle } from "react-icons/fa";
import React from "react";
import PropTypes from "prop-types";



  const Tooltip = ({ text, title }) => {
    return (
      <div className="relative flex items-center"> 
      <FaInfoCircle className="text-[#a3d6ff] cursor-pointer w-6 h-6" />
        <div className="absolute left-6 -top-2 bg-[#feca7a] text-white text-sm rounded-md shadow-md px-3 py-1 opacity-0 hover:opacity-100 transition-opacity duration-300 w-[20%]">
          <strong>{title} </strong>
          <div className="">{text}</div>
          
        </div>
      </div>
    );
  };
  Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };
export default Tooltip;