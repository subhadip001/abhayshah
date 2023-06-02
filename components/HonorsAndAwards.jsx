import React from "react";

const HonorsAndAwards = (props) => {
  console.log(props.data);

  const renderTableRows = (data) => {
    return data?.map((item, index) => (
      <tr
        key={index}
        className="hover:bg-gray-100 border-b border-gray-200 py-10"
      >
        <td className="px-4 py-4">{item.award}</td>
        <td className="px-4 py-4">{item.institute}</td>
        <td className="px-4 py-4">{item.yearAwarded}</td>
      </tr>
    ));
  };

  return (
    <div id="honors">
      <div className="overflow-auto">
        <div className="flex flex-col items-start">
          <h4 className="text-2xl font-bold pb-5">Honors and Rewards</h4>
        </div>
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
              <th className="px-4 py-2 bg-gray-200">Award</th>
              <th className="px-4 py-2 bg-gray-200">Institute</th>
              <th className="px-4 py-2 bg-gray-200">Year Awarded</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {renderTableRows(props.data)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HonorsAndAwards;
