import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const OppsApps = () => {
  const auth = useContext(AuthContext);
  const username = auth.username;
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  const buttonClass =
    "flex justify-center ml-auto items-center w-[10vw] bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-3 rounded font-semibold mt-3";

  const getAllApps = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://abhay-sah-api.subhadipmandal.engineer/getAllOppsReqs",
        {
          username,
        }
      );
      console.log(res.data);
      setApplications(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getAllApps();
  }, []);

  return (
    <div className="h-[85vh] w-[85%] overflow-y-auto">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl">All Opportunities Applications</span>

        <div className="flex flex-col gap-10">
          {isLoading ? (
            <span className="text-center">Loading...</span>
          ) : (
            applications
              ?.slice(0)
              .reverse()
              .map((app, i) => {
                return (
                  <React.Fragment key={i}>
                    <section className="border-2 capitalize flex px-5 py-3 justify-between">
                      <div className="flex flex-col gap-3">
                        <span>Name : {app?.nameOfStudent}</span>
                        <span>Branch : {app?.branch}</span>
                        <div className="flex gap-3">
                          <span>Date : {app?.dateOfNews?.slice(0, 10)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between w-[50%]">
                        {app?.appDesc?.length > 120 ? (
                          <span>Message : {app?.message.slice(0, 120)}...</span>
                        ) : (
                          <span>Message : {app?.message}</span>
                        )}
                      </div>
                      <div className="flex items-end">
                        <a
                          className={buttonClass}
                          href={app?.cvLink}
                          target="_blank"
                        >
                          Open
                        </a>
                      </div>
                    </section>
                  </React.Fragment>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default OppsApps;
