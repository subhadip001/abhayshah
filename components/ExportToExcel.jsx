import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ExportToExcel = ({ projectList }) => {
  const createAnchorElement = (url) => {
    return (
      <a
        href={url}
        className="underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open
      </a>
    );
  };
  return (
    <div>
      <table id="projectTable" style={{ display: "none" }}>
        <thead>
          <tr>
            <th>Project No</th>
            <th>Transaction No</th>
            <th>Transaction Date</th>
            <th>Project Type</th>
            <th>Total Fund</th>
            <th>Transaction Amount</th>
            <th>Expenditure Code</th>
            <th>Bill No</th>
            <th>Bill Details</th>
            <th>File URL</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((project, index) => (
            <tr key={index}>
              <td>{project?.projectNo ?? "NA"}</td>
              <td>{project?.txnDate ?? "NA"}</td>
              <td>{project?.txnNo ?? "NA"}</td>
              <td>{project?.projectType ?? "NA"}</td>
              <td>{project?.totalFund ?? "NA"}</td>
              <td>{project?.txnAmount ?? "NA"}</td>
              <td>{project?.expCode ?? "NA"}</td>
              <td>{project?.billNo ?? "NA"}</td>
              <td>{project?.billDetails ?? "NA"}</td>
              <td>
                {project?.fileUrl
                  ? createAnchorElement(project?.fileUrl)
                  : "NA"}
              </td>
              <td>{project?.remarks ?? "NA"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactHTMLTableToExcel
        id="exportButton"
        className="bg-secondary py-2 px-5 text-white"
        table="projectTable"
        filename="project_expenditure"
        sheet="sheet1"
        buttonText="Export to Excel"
      />
    </div>
  );
};

export default ExportToExcel;
