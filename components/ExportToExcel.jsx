import React from "react";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ExportToExcel = ({ projectList }) => {
  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Projects Data");

    // Define the columns and headers
    const columns = [
      { header: "Project No", key: "projectNo", width: 15 },
      { header: "Transaction No", key: "txnNo", width: 15 },
      { header: "Transaction Date", key: "txnDate", width: 15 },
      { header: "Project Type", key: "projectType", width: 15 },
      { header: "Total Fund", key: "totalFund", width: 15 },
      { header: "Transaction Amount", key: "txnAmount", width: 15 },
      { header: "Expenditure Code", key: "expCode", width: 15 },
      { header: "Bill No", key: "billNo", width: 15 },
      { header: "Bill Details", key: "billDetails", width: 15 },
      { header: "File URL", key: "fileUrl", width: 40 }, // Increase width for URLs
      { header: "Remarks", key: "remarks", width: 15 },
    ];

    worksheet.columns = columns;

    // Add data to the worksheet
    projectList.forEach((project) => {
      worksheet.addRow({
        projectNo: project?.projectNo ?? "NA",
        txnNo: project?.txnNo ?? "NA",
        txnDate: project?.txnDate ?? "NA",
        projectType: project?.projectType ?? "NA",
        totalFund: project?.totalFund ?? "NA",
        txnAmount: project?.txnAmount ?? "NA",
        expCode: project?.expCode ?? "NA",
        billNo: project?.billNo ?? "NA",
        billDetails: project?.billDetails ?? "NA",
        fileUrl: project?.fileUrl
          ? {
              text: "open",
              hyperlink: project?.fileUrl,
            }
          : "NA",
        remarks: project?.remarks ?? "NA",
      });
    });

    // Save the workbook to a file

    workbook.xlsx.writeBuffer().then((buffer) => {
      // Convert the buffer to a Blob
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Generate a unique filename for the exported Excel file
      const fileName = "project_expenditure_" + Date.now() + ".xlsx";

      // Save the Blob as a file using FileSaver.js
      saveAs(blob, fileName);
    });
  };

  return (
    <div>
      <button
        className="bg-secondary py-2 px-5 text-white"
        onClick={handleExportToExcel}
      >
        Export to Excel
      </button>
    </div>
  );
};

export default ExportToExcel;
