import React from 'react';


const SvgPath = ({ d, className, stroke, strokeWidth, strokeDasharray }) => {
  return (
    <svg className={className} width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <path d={d} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} fill="none" />
    </svg>
  );
};

export default SvgPath;
