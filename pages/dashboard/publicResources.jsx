import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const PublicResouces = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const username = auth?.username;

  const getMyResources = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://api.subhadipmandal.engineer/abhay/getAllPublicResorces"
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
    getMyResources();
  }, []);

  return (
    <section className="h-[100vh] w-[85%]">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl">All Resources</span>
        <div className="flex flex-col gap-10 h-[80vh] overflow-y-auto">
          {resources?.map((data, i) => {
            return (
              <div
                key={i}
                className="card border-2 py-4 px-5 flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      {data?.docname}
                    </span>
                    <span className="text-xs">
                      <i>- by {data?.docOwnerName}</i>
                    </span>
                  </div>
                  <p className="text-gray-700">{data?.docDesc}</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs">
                    <i>posted on : {data?.docDate.slice(0, 10)}</i>
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
          {isLoading && (
            <div className="flex justify-center item-center">Loading...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PublicResouces;
