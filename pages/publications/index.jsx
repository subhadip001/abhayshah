import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Publications = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeNav, setActiveNav] = useState(1);
  const [query, setQuery] = useState("");
  const auth = useContext(AuthContext);
  const username = auth?.username;

  const getPublications = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://abhayasha.onrender.com/getAllPublications"
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
    getPublications();
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
              All({resources.length})
            </span>
            {resources.filter(
              (project) => project?.publicationType === "Conferences"
            ).length !== 0 && (
              <span
                onClick={() => {
                  setActiveNav(2);
                }}
                className={activeNav === 2 ? activeTabClass : tabClass}
              >
                Conferences(
                {
                  resources.filter(
                    (project) => project?.publicationType === "Conferences"
                  ).length
                }
                )
              </span>
            )}
            {resources.filter(
              (project) => project?.publicationType === "Chapters"
            ).length !== 0 && (
              <span
                onClick={() => {
                  setActiveNav(3);
                }}
                className={activeNav === 3 ? activeTabClass : tabClass}
              >
                Chapters(
                {
                  resources.filter(
                    (project) => project?.publicationType === "Chapters"
                  ).length
                }
                )
              </span>
            )}
            {resources.filter(
              (project) => project?.publicationType === "Journals"
            ).length !== 0 && (
              <span
                onClick={() => {
                  setActiveNav(4);
                }}
                className={activeNav === 4 ? activeTabClass : tabClass}
              >
                Journals(
                {
                  resources.filter(
                    (project) => project?.publicationType === "Journals"
                  ).length
                }
                )
              </span>
            )}
            {resources.filter(
              (project) => project?.publicationType === "Patents"
            ).length !== 0 && (
              <span
                onClick={() => {
                  setActiveNav(5);
                }}
                className={activeNav === 5 ? activeTabClass : tabClass}
              >
                Patents(
                {
                  resources.filter(
                    (project) => project?.publicationType === "Patents"
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
            <div className="flex flex-col flex-wrap justify-between">
              {search(resources)?.map((data, i) => {
                return (
                  <div
                    key={i}
                    className="card border-2 py-4 px-3 flex flex-col gap-5 rounded-xl w-full mb-5 mr-10"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold">
                        {data?.docname}
                      </span>
                      <p className="text-gray-700">{data?.docDesc}</p>
                    </div>
                    <span className="text-xs">
                      <i>- by {data?.docOwnerName}</i>
                    </span>
                    <a
                      href={data?.docLink}
                      target="_blank"
                      className="text-center w-[10%] ml-auto bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold mt-auto"
                    >
                      Open File
                    </a>
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
            <div className="flex flex-col flex-wrap justify-between">
              {search(resources)?.map((data, i) => {
                return (
                  <React.Fragment key={data + i}>
                    {data?.publicationType === "Conferences" && (
                      <div
                        key={i}
                        className="card border-2 py-4 px-3 flex flex-col gap-5 rounded-xl w-full mb-5 mr-10"
                      >
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold">
                            {data?.docname}
                          </span>
                          <p className="text-gray-700">{data?.docDesc}</p>
                        </div>
                        <span className="text-xs">
                          <i>- by {data?.docOwnerName}</i>
                        </span>
                        <a
                          href={data?.docLink}
                          target="_blank"
                          className="text-center w-[10%] ml-auto bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold mt-auto"
                        >
                          Open File
                        </a>
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
                    {data?.projectType === "Chapters" && (
                      <div
                        key={i}
                        className="card border-2 py-4 px-3 flex flex-col gap-5 rounded-xl w-full mb-5 mr-10"
                      >
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold">
                            {data?.docname}
                          </span>
                          <p className="text-gray-700">{data?.docDesc}</p>
                        </div>
                        <span className="text-xs">
                          <i>- by {data?.docOwnerName}</i>
                        </span>
                        <a
                          href={data?.docLink}
                          target="_blank"
                          className="text-center w-[10%] ml-auto bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold mt-auto"
                        >
                          Open File
                        </a>
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
                    {data?.projectType === "Journals" && (
                      <div
                        key={i}
                        className="card border-2 py-4 px-3 flex flex-col gap-5 rounded-xl w-full mb-5 mr-10"
                      >
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold">
                            {data?.docname}
                          </span>
                          <p className="text-gray-700">{data?.docDesc}</p>
                        </div>
                        <span className="text-xs">
                          <i>- by {data?.docOwnerName}</i>
                        </span>
                        <a
                          href={data?.docLink}
                          target="_blank"
                          className="text-center w-[10%] ml-auto bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold mt-auto"
                        >
                          Open File
                        </a>
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
                    {data?.projectType === "Patents" && (
                      <div
                        key={i}
                        className="card border-2 py-4 px-3 flex flex-col gap-5 rounded-xl w-full mb-5 mr-10"
                      >
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-semibold">
                            {data?.docname}
                          </span>
                          <p className="text-gray-700">{data?.docDesc}</p>
                        </div>
                        <span className="text-xs">
                          <i>- by {data?.docOwnerName}</i>
                        </span>
                        <a
                          href={data?.docLink}
                          target="_blank"
                          className="text-center w-[10%] ml-auto bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold mt-auto"
                        >
                          Open File
                        </a>
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

export default Publications;
