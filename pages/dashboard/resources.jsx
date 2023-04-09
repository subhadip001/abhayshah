import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const username = auth?.username;

  const getMyResources = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://abhayasha.onrender.com/getResourcesByUsername",
        {
          username: username,
        }
      );
      console.log(res.data);
      setResources(res.data);
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
        <span className="text-4xl">My Resources</span>
        <div className="flex flex-col gap-10 h-[80vh] overflow-y-auto">
          {resources?.map((data, i) => {
            return (
              <>
                <div className="card border-2 py-4 px-3 flex flex-col gap-5 bg-gray-200">
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">
                      {data?.docname}
                    </span>
                    <p className="text-gray-700">{data?.docDesc}</p>
                  </div>
                  <a
                    href={data?.docLink}
                    target="_blank"
                    className="w-[7%] text-center bg-[#3B82F6] text-white py-1"
                  >
                    Open File
                  </a>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Resources;
