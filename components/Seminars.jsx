import React from "react";

const Seminars = (props) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();

    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };
  const renderTableRows = (data) => {
    return data.map((item, index) => (
      <tr
        key={index}
        className="hover:bg-gray-100 border-b border-gray-200 py-10"
      >
        <td className="px-4 py-4">{item.name}</td>
        <td className="px-4 py-4">{item.place}</td>
        <td className="px-4 py-4">{item.sponsoredBy}</td>
        <td className="px-4 py-4">{formatDate(item.date)}</td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="overflow-auto">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold pb-5">Seminars</h1>
        </div>
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
              <th className="px-4 py-2 bg-gray-200">Name</th>
              <th className="px-4 py-2 bg-gray-200">Place</th>
              <th className="px-4 py-2 bg-gray-200">Sponsored By</th>
              <th className="px-4 py-2 bg-gray-200">Date</th>
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

export default Seminars;
