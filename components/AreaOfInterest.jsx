import React from "react";

const AreaOfInterest = (props) => {
  console.log(props.data);
  return (
    <div id="interest">
      <div className="overflow-auto">
        <div className="flex flex-col items-start">
          <h4 className="text-2xl font-bold pb-5">Area of Interest</h4>
          <p className="py-1">{props.data}</p>
        </div>
      </div>
    </div>
  );
};

export default AreaOfInterest;
