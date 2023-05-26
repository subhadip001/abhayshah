import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const ResearchProjects = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeNav, setActiveNav] = useState(1);
  const auth = useContext(AuthContext);
  const username = auth?.username;

  const getProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://abhayasha.onrender.com/getAllProjects"
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
              All(28)
            </span>
            <span
              onClick={() => {
                setActiveNav(2);
              }}
              className={activeNav === 2 ? activeTabClass : tabClass}
            >
              Research projects(10){" "}
            </span>
            <span
              onClick={() => {
                setActiveNav(3);
              }}
              className={activeNav === 3 ? activeTabClass : tabClass}
            >
              Consultancy projects(8)
            </span>
            <span
              onClick={() => {
                setActiveNav(4);
              }}
              className={activeNav === 4 ? activeTabClass : tabClass}
            >
              Institute/SRIC funded(6)
            </span>
            <span
              onClick={() => {
                setActiveNav(5);
              }}
              className={activeNav === 5 ? activeTabClass : tabClass}
            >
              Others(4)
            </span>
          </nav>
          <div className="flex items-center w-[30%]">
            <input placeholder="Search Project" className="px-3 py-1 w-full outline-none" type="text" />
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <div className="flex flex-col gap-10 h-[85vh] overflow-y-auto">
          <div className="flex flex-wrap justify-between">
            {resources?.map((data, i) => {
              return (
                <div
                  key={i}
                  className="card border-2 py-4 px-3 flex flex-col gap-5 rounded-xl w-[30%] mb-5"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">
                      {data?.docname}
                    </span>
                    <p className="text-gray-700">{data?.docDesc}</p>
                  </div>
                  <span className="text-xs">
                    <i>- by {data?.docOwner}</i>
                  </span>
                  <a
                    href={data?.docLink}
                    target="_blank"
                    className="text-center bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold mt-auto"
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
      </div>
    </section>
  );
};

export default ResearchProjects;
