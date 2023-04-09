import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const leaveapplications = () => {
  const auth = useContext(AuthContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leaveapplications, setLeaveApplications] = useState([]);
  const username = auth?.username;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setIsLoading(true);

    if (username !== "admin") {
      try {
        const res = await axios.post(
          "https://abhayasha.onrender.com/addLeaveApp",
          {
            appType: data["l-app"],
            appDesc: data["application"],
            username: username,
          }
        );
        console.log(data["application"]);
        console.log(res.data);
        setIsLoading(false);
        setIsSubmitted(true);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  const getLeaveApps = async () => {
    if (username === "admin") {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://abhayasha.onrender.com/getAllLeaveApps"
        );
        console.log(res.data);
        setLeaveApplications(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getLeaveApps();
  }, []);

  return (
    <div className="h-[100vh] w-[85%]">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl">Create a Leave Application</span>
        {username !== "admin" ? (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex gap-10 items-center">
              <div className="flex gap-2 items-center">
                <input
                  className="cursor-pointer scale-150"
                  type="radio"
                  name="l-app"
                  id="casual"
                  value="casual"
                  defaultChecked
                />
                <label className="cursor-pointer" htmlFor="casual">
                  Casual
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="cursor-pointer scale-150"
                  type="radio"
                  name="l-app"
                  id="medical"
                  value="medical"
                />
                <label className="cursor-pointer" htmlFor="medical">
                  Medical
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="cursor-pointer scale-150"
                  type="radio"
                  name="l-app"
                  id="vacation"
                  value="vacation"
                />
                <label className="cursor-pointer" htmlFor="vacation">
                  Vacation
                </label>
              </div>

              <div className="flex gap-2 items-center ">
                <input
                  className="cursor-pointer scale-150"
                  type="radio"
                  name="l-app"
                  id="official"
                  value="official"
                />
                <label className="cursor-pointer" htmlFor="official">
                  Official
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                className="w-full border-2 outline-none"
                onClick={() => {
                  setIsSubmitted(false);
                }}
                name="application"
                id="application"
                cols="30"
                rows="15"
                required
              ></textarea>
              <button className="bg-[#3B82F6] flex justify-center item-center px-2 py-1 text-white w-20">
                {isLoading && <CgSpinner className="text-xl animate-spin" />}
                {!isLoading && !isSubmitted && "Submit"}
                {!isLoading && isSubmitted && "Done"}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-col gap-10 h-[80vh] overflow-y-auto">
              {leaveapplications?.map((data, i) => {
                return (
                  <div
                    key={i}
                    className="card border-2 py-4 px-3 flex flex-col gap-5 bg-gray-200"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold">
                        {data?.appType}
                      </span>
                      <div className="mt-2 whitespace-pre-wrap">
                        {data?.appDesc}
                      </div>
                    </div>
                    <span className="text-xs">
                      <i>- by {data?.appOwner}</i>
                    </span>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-center item-center">
                  Loading...
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default leaveapplications;
