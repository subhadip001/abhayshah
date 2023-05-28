import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

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
          <div className="flex items-center w-[30%] h-[90%] bg-white my-auto">
            <FiSearch className="w-[8%]" />
            <input
              placeholder="Search using title"
              className="px-2 py-1 w-full outline-none"
              type="text"
            />
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
                  className="card border-2 py-3 px-5 flex flex-col gap-5 w-[100%] mb-5"
                >
                  <span className="text-lg font-semibold">{data?.docname}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      Funding Agency - Name of Agency
                    </span>
                    <span className="text-gray-700">
                      Project Number - number
                    </span>
                    <span className="text-gray-700">SL No. - Number</span>
                  </div>
                  <span className="">
                    Description - <small> Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum.</small>
                  </span>
                  <div className="flex justify-between items-center">
                    <span>Timeline - Starting date - Ending Date</span>
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
      </div>
    </section>
  );
};

export default ResearchProjects;
