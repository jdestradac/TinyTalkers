import ProgressSelect from "../../components/Progress/ProgressSelect"
import React, { Suspense } from 'react';

const Progress = () => {
  return (
    <div className="relative">
      <Suspense fallback={<div>Loading...</div>}>
          <ProgressSelect/>
      </Suspense>
       
    </div>
  );
};

export default Progress;
