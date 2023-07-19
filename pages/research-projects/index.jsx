import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const ResearchProjects = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeNav, setActiveNav] = useState(1);
  const [query, setQuery] = useState("");
  const auth = useContext(AuthContext);
  const username = auth?.username;

  const getProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getAllProjects"
      );
      console.log(res.data);
      setResources(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const search = (data) => {
    return data.filter(
      (item) =>
        item?.docname?.toLowerCase().includes(query) ||
        item?.docDate?.split("-").reverse().join("/").includes(query) ||
        item?.docDesc?.toLowerCase().includes(query)
    );
  };

  const activeTabClass = "font-bold py-3 px-5 text-white cursor-pointer";
  const tabClass = "py-3 px-5 text-white cursor-pointer";

  return (
    <section className="h-[100vh]">
      <div className="bg-brand">
        <div className="w-[90%] mx-auto flex align-center justify-between">
          <nav className="flex align-center justify-center">
            <span
              onClick={() => {
                setActiveNav(1);
              }}
              className={activeNav === 1 ? activeTabClass : tabClass}
            >
              All ({resources?.length})
            </span>
            {resources.filter((project) => project.projectType === "Research")
              .length !== 0 && (
              <span
                onClick={() => {
                  setActiveNav(2);
                }}
                className={activeNav === 2 ? activeTabClass : tabClass}
              >
                Research projects (
                {
                  resources.filter(
                    (project) => project.projectType === "Research"
                  ).length
                }
                )
              </span>
            )}
            {resources.filter(
              (project) => project.projectType === "Consultancy"
            ).length !== 0 && (
              <span
                onClick={() => {
                  setActiveNav(3);
                }}
                className={activeNav === 3 ? activeTabClass : tabClass}
              >
                Consultancy projects (
                {
                  resources.filter(
                    (project) => project.projectType === "Consultancy"
                  ).length
                }
                )
              </span>
            )}
            {resources.filter(
              (project) => project.projectType === "Institute/SRIC_funded"
            ).length !== 0 && (
              <span
                onClick={() => {
                  setActiveNav(4);
                }}
                className={activeNav === 4 ? activeTabClass : tabClass}
              >
                Institute/SRIC funded (
                {
                  resources.filter(
                    (project) => project.projectType === "Institute/SRIC_funded"
                  ).length
                }
                )
              </span>
            )}
            {resources.filter((project) => project.projectType === "Others")
              .length !== 0 && (
              <span
                onClick={() => {
                  setActiveNav(5);
                }}
                className={activeNav === 5 ? activeTabClass : tabClass}
              >
                Others (
                {
                  resources.filter(
                    (project) => project.projectType === "Others"
                  ).length
                }
                )
              </span>
            )}
          </nav>
          <div className="flex items-center w-[30%] h-[90%] bg-white my-auto">
            <FiSearch className="w-[8%]" />
            <input
              placeholder="Search using title / description / date"
              className="px-2 py-1 w-full outline-none"
              type="text"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        {activeNav === 1 ? (
          <div className="flex flex-col gap-10 h-[85vh] overflow-y-auto">
            <div className="flex flex-wrap justify-between">
              {search(resources)?.map((data, i) => {
                return (
                  <div
                    key={i}
                    className="card border-2 py-3 px-5 flex flex-col gap-5 w-[100%] mb-5"
                  >
                    <span className="text-lg font-semibold">
                      {data?.docname}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Funding Agency - {data?.fundingAgency}
                      </span>
                      <span className="text-gray-700">
                        Project Number - {data?.projectNumber}
                      </span>
                      <span className="text-gray-700">
                        SL No. - {data?.serialNumber}
                      </span>
                    </div>
                    <span className="">
                      Description - <small>{data?.docDesc}</small>
                    </span>
                    <div className="flex justify-between items-center">
                      <span>
                        Timeline -{" "}
                        {data?.sDate.slice(0, 10) +
                          "  to  " +
                          data?.eDate.slice(0, 10)}{" "}
                      </span>
                      <a
                        href={data?.docLink}
                        target="_blank"
                        className="text-center bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold"
                      >
                        Open File
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            {isLoading && (
              <div className="flex justify-center item-center">Loading...</div>
            )}
          </div>
        ) : activeNav === 2 ? (
          <div className="flex flex-col gap-10 h-[85vh] overflow-y-auto">
            <div className="flex flex-wrap justify-between">
              {search(resources)?.map((data, i) => {
                return (
                  <React.Fragment key={data + i}>
                    {data?.projectType === "Research" && (
                      <div className="card border-2 py-3 px-5 flex flex-col gap-5 w-[100%] mb-5">
                        <span className="text-lg font-semibold">
                          {data?.docname}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">
                            Funding Agency - {data?.fundingAgency}
                          </span>
                          <span className="text-gray-700">
                            Project Number - {data?.projectNumber}
                          </span>
                          <span className="text-gray-700">
                            SL No. - {data?.serialNumber}
                          </span>
                        </div>
                        <span className="">
                          Description - <small>{data?.docDesc}</small>
                        </span>
                        <div className="flex justify-between items-center">
                          <span>
                            Timeline -{" "}
                            {data?.sDate.slice(0, 10) +
                              "  to  " +
                              data?.eDate.slice(0, 10)}{" "}
                          </span>
                          <a
                            href={data?.docLink}
                            target="_blank"
                            className="text-center bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold"
                          >
                            Open File
                          </a>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {isLoading && (
              <div className="flex justify-center item-center">Loading...</div>
            )}
          </div>
        ) : activeNav === 3 ? (
          <div className="flex flex-col gap-10 h-[85vh] overflow-y-auto">
            <div className="flex flex-wrap justify-between">
              {search(resources)?.map((data, i) => {
                return (
                  <React.Fragment key={data + i}>
                    {data?.projectType === "Consultancy" && (
                      <div
                        key={i}
                        className="card border-2 py-3 px-5 flex flex-col gap-5 w-[100%] mb-5"
                      >
                        <span className="text-lg font-semibold">
                          {data?.docname}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">
                            Funding Agency - {data?.fundingAgency}
                          </span>
                          <span className="text-gray-700">
                            Project Number - {data?.projectNumber}
                          </span>
                          <span className="text-gray-700">
                            SL No. - {data?.serialNumber}
                          </span>
                        </div>
                        <span className="">
                          Description - <small>{data?.docDesc}</small>
                        </span>
                        <div className="flex justify-between items-center">
                          <span>
                            Timeline -{" "}
                            {data?.sDate.slice(0, 10) +
                              "  to  " +
                              data?.eDate.slice(0, 10)}{" "}
                          </span>
                          <a
                            href={data?.docLink}
                            target="_blank"
                            className="text-center bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold"
                          >
                            Open File
                          </a>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {isLoading && (
              <div className="flex justify-center item-center">Loading...</div>
            )}
          </div>
        ) : activeNav === 4 ? (
          <div className="flex flex-col gap-10 h-[85vh] overflow-y-auto">
            <div className="flex flex-wrap justify-between">
              {search(resources)?.map((data, i) => {
                return (
                  <React.Fragment key={data + i}>
                    {data?.projectType === "Institute/SRIC_funded" && (
                      <div className="card border-2 py-3 px-5 flex flex-col gap-5 w-[100%] mb-5">
                        <span className="text-lg font-semibold">
                          {data?.docname}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">
                            Funding Agency - {data?.fundingAgency}
                          </span>
                          <span className="text-gray-700">
                            Project Number - {data?.projectNumber}
                          </span>
                          <span className="text-gray-700">
                            SL No. - {data?.serialNumber}
                          </span>
                        </div>
                        <span className="">
                          Description - <small>{data?.docDesc}</small>
                        </span>
                        <div className="flex justify-between items-center">
                          <span>
                            Timeline -{" "}
                            {data?.sDate.slice(0, 10) +
                              "  to  " +
                              data?.eDate.slice(0, 10)}{" "}
                          </span>
                          <a
                            href={data?.docLink}
                            target="_blank"
                            className="text-center bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold"
                          >
                            Open File
                          </a>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {isLoading && (
              <div className="flex justify-center item-center">Loading...</div>
            )}
          </div>
        ) : activeNav === 4 ? (
          <div className="flex flex-col gap-10 h-[85vh] overflow-y-auto">
            <div className="flex flex-wrap justify-between">
              {search(resources)?.map((data, i) => {
                return (
                  <React.Fragment key={data + i}>
                    {data?.projectType === "Others" && (
                      <div className="card border-2 py-3 px-5 flex flex-col gap-5 w-[100%] mb-5">
                        <span className="text-lg font-semibold">
                          {data?.docname}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">
                            Funding Agency - {data?.fundingAgency}
                          </span>
                          <span className="text-gray-700">
                            Project Number - {data?.projectNumber}
                          </span>
                          <span className="text-gray-700">
                            SL No. - {data?.serialNumber}
                          </span>
                        </div>
                        <span className="">
                          Description - <small>{data?.docDesc}</small>
                        </span>
                        <div className="flex justify-between items-center">
                          <span>
                            Timeline -{" "}
                            {data?.sDate.slice(0, 10) +
                              "  to  " +
                              data?.eDate.slice(0, 10)}{" "}
                          </span>
                          <a
                            href={data?.docLink}
                            target="_blank"
                            className="text-center bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold"
                          >
                            Open File
                          </a>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {isLoading && (
              <div className="flex justify-center item-center">Loading...</div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default ResearchProjects;
