import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
