import React from "react";

const Sponsored = (props) => {
  const renderTableRows = (data) => {
    return data?.map((item, index) => (
      <tr
        key={index}
        className="hover:bg-gray-100 border-b border-gray-200 py-10"
      >
        <td className="px-4 py-4">{item.scheme}</td>
        <td className="px-4 py-4">{item.sponsoringAgency}</td>
        <td className="px-4 py-4">{item.otherFaculties}</td>
        <td className="px-4 py-4">{item.yearSponsored}</td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="overflow-auto">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold pb-5">Sponsored Research</h1>
        </div>
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
              <th className="px-4 py-2 bg-gray-200">Scheme</th>
              <th className="px-4 py-2 bg-gray-200">Sponsoring Agency</th>
              <th className="px-4 py-2 bg-gray-200">Other Faculties</th>
              <th className="px-4 py-2 bg-gray-200">Year Sponsored</th>
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

export default Sponsored;
