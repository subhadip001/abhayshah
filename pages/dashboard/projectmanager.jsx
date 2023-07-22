import ExportToExcel from "@/components/ExportToExcel";
import FileUploader from "@/components/FileUploader";
import InputComp from "@/components/InputComp";
import SelectComp from "@/components/SelectComp";
import SpecialInputComp from "@/components/SpecialInputComp";
import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const projectmanager = () => {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [totalFund, setTotalFund] = useState("");
  const [fundLeft, setFundLeft] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [projectListLoading, setProjectListLoading] = useState(false);
  const auth = useContext(AuthContext);
  const username = auth.username;

  const getAllProjectsList = async () => {
    setProjectListLoading(true);
    try {
      const res = await axios.get(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getAllProjectList"
      );
      console.log(res.data);
      setProjectList(res.data.reverse());
      setProjectListLoading(false);
    } catch (error) {
      console.log(error);
      setProjectListLoading(false);
    }
  };

  useEffect(() => {
    getAllProjectsList();
  }, []);

  const getTotalFundByProjectNo = async (projectNo) => {
    setTotalFund("Loading...");
    try {
      const res = await axios.post(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getTotalFundByProjectNo",
        { projectNo }
      );
      console.log(res.data);
      const totalFundValue = res.data.totalFund;

      let isOldProject = false;
      if (totalFundValue == 0) {
        setTotalFund(0);
        isOldProject = false;
      } else {
        setTotalFund(totalFundValue);
        isOldProject = true;
      }
      setFundLeft(res.data.fundLeft);
      setIsDisabled(isOldProject);
    } catch (error) {
      console.log(error);
      setTotalFund("");
    }
  };

  const addNewProjectHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const res = await axios.post(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/addProject",
        {
          username: username,
          projectNo: data["p-no"],
          txnNo: data["txn-no"],
          txnDate: data["txn-date"],
          projectType: data["p-type"],
          totalFund: data["t-fund"] || totalFund,
          txnAmount: data["t-amount"],
          fundLeft:
            totalFund == 0 ? data["t-fund"] : fundLeft - data["t-amount"],
          expCode: data["exp-code"],
          billNo: data["b-no"],
          billDetails: data["b-details"],
          fileUrl: downloadURL,
          remarks: data["remarks"],
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newProjectForm = () => {
    return (
      <section>
        <form onSubmit={addNewProjectHandler} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <InputComp
              label="Project No"
              type="text"
              name="p-no"
              id="p-no"
              required={true}
              showSuggestions={true}
              placeholder="Enter Project No"
              getTotalFundByProjectNo={getTotalFundByProjectNo}
            />
            <InputComp
              label="Transaction No"
              type="text"
              name="txn-no"
              id="txn-no"
              required={true}
              placeholder="Enter Transaction No"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputComp
              label="Transaction Date"
              type="date"
              name="txn-date"
              id="txn-date"
              required={true}
              placeholder="Enter Transaction Date"
            />
            <InputComp
              label="Transaction Type"
              type="text"
              name="p-type"
              id="p-type"
              required={true}
              placeholder="Enter Transaction Type"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <SpecialInputComp
              label="Total Fund"
              type="number"
              name="t-fund"
              id="t-fund"
              required={true}
              placeholder="Enter Total Fund"
              isDisabled={isDisabled}
              totalFund={totalFund}
            />
            <InputComp
              label="Transaction Amount"
              type="number"
              name="t-amount"
              id="t-amount"
              required={true}
              placeholder="Enter Transaction Amount"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <SelectComp
              label="Expenditure Code"
              name="exp-code"
              id="exp-code"
              optionTitle="Select Exp Code"
              optionValues={[
                "101(MACHINERY_AND_EQUIPMENT)",
                "302(TRAVELLING_ALLOWANCE)",
                "304(SCHOLARSHIPS/FELLOWSHIPS)",
                "412(LABORATORY_AND_CONSUMABLES)",
                "413(WORK_HIRE)",
                "414(CONTINGENCY)",
                "502(INSTITUTE_OVERHEAD)",
              ]}
            />
            <InputComp
              label="Bill No"
              type="text"
              name="b-no"
              id="b-no"
              required={true}
              placeholder="Enter Bill No"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputComp
              label="Bill Details"
              type="text"
              name="b-details"
              id="b-details"
              required={false}
              placeholder="Enter Bill Details"
            />
            <InputComp
              label="Remarks"
              type="text"
              name="remarks"
              id="remarks"
              required={false}
              placeholder="Enter Remarks"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <FileUploader
              label="Upload Bill"
              setDownloadURL={setDownloadURL}
              className="col-span-1"
              buttonClass="text-center bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold"
            />

            <div className="flex justify-end gap-10 items-end">
              <button
                onClick={() => {
                  setShowNewProjectForm(false);
                }}
                className="px-7 py-2 border border-secondary text-secondary"
                type="button"
              >
                Close
              </button>
              <button
                className="px-7 py-2 bg-secondary text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  };

  const projectListTable = () => {
    return (
      <section className="w-[100%] overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-300">
            <tr className="">
              <th className="px-2 py-1 h-[5vh]">Project No</th>
              <th className="px-2 py-1 h-[5vh]">Transaction No</th>
              <th className="px-2 py-1 h-[5vh]">Transaction Date</th>
              <th className="px-2 py-1 h-[5vh]">Project Type</th>
              <th className="px-2 py-1 h-[5vh]">Total Fund</th>
              <th className="px-2 py-1 h-[5vh]">Transaction Amount</th>
              <th className="px-2 py-1 h-[5vh]">Fund Left</th>
              <th className="px-2 py-1 h-[5vh]">Expenditure Code</th>
              <th className="px-2 py-1 h-[5vh]">Bill No</th>
              <th className="px-2 py-1 h-[5vh]">Bill Details</th>
              <th className="px-2 py-1 h-[5vh]">File URL</th>
              <th className="px-2 py-1 h-[5vh]">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project, index) => (
              <tr key={index} className="text-center even:bg-gray-200">
                <td className="h-[5vh]">{project?.projectNo ?? "NA"}</td>
                <td className="h-[5vh]">{project?.txnDate ?? "NA"}</td>
                <td className="h-[5vh]">{project?.txnNo ?? "NA"}</td>
                <td className="h-[5vh]">{project?.projectType ?? "NA"}</td>
                <td className="h-[5vh]">{project?.totalFund ?? "NA"}</td>
                <td className="h-[5vh]">{project?.txnAmount ?? "NA"}</td>
                <td className="h-[5vh]">{project?.fundLeft ?? "NA"}</td>
                <td className="h-[5vh]">{project?.expCode ?? "NA"}</td>
                <td className="h-[5vh]">{project?.billNo ?? "NA"}</td>
                <td className="h-[5vh]">{project?.billDetails ?? "NA"}</td>
                <td className="h-[5vh]">
                  <a
                    href={project?.fileUrl}
                    className="underline"
                    target="_blank"
                  >
                    Open
                  </a>
                </td>
                <td className="h-[5vh]">{project?.remarks ?? "NA"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  };

  return (
    <section className=" w-[85%]">
      <div className="w-[95%] mx-auto flex flex-col gap-5 mt-5 overflow-y-auto">
        <div className="flex justify-between items-center">
          <span className="text-4xl">Manage Projects</span>
        </div>

        {showNewProjectForm ? (
          newProjectForm()
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <button
                onClick={() => {
                  setShowNewProjectForm(true);
                }}
                className="bg-secondary py-2 px-5 text-white"
              >
                Add Project
              </button>
              <button
                className="bg-secondary py-2 px-5 text-white"
                onClick={getAllProjectsList}
              >
                Refresh
              </button>
              {projectList.length > 0 && (
                <ExportToExcel projectList={projectList} />
              )}
            </div>
            <div>
              {projectListLoading ? <div>Loading...</div> : projectListTable()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default projectmanager;
