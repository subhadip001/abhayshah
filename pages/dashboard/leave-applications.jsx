import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const leaveapplications = () => {
  const auth = useContext(AuthContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [leaveapplications, setLeaveApplications] = useState([]);
  const [userLeaveapplications, setUserLeaveApplications] = useState([]);
  const username = auth?.username;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setSpinner(true);

    if (username !== "admin") {
      try {
        const res = await axios.post(
          "https://abhayasha.onrender.com/addLeaveApp",
          {
            appType: data["a-type"],
            appDesc: data["application"],
            days: data["n-days"],
            sDate: data["s-date"],
            eDate: data["e-date"],
            username: username,
          }
        );
        console.log(data["application"]);
        console.log(res.data);
        setSpinner(false);
        setIsSubmitted(true);
        getAllLeaveAppsByUsername();
      } catch (error) {
        console.log(error);
        setSpinner(false);
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
  const getAllLeaveAppsByUsername = async () => {
    console.log("called")
    if (username !== "admin") {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "https://abhayasha.onrender.com/getLeaveAppsByUsername",
          {
            username: username,
          }
        );
        console.log(res.data);
        setUserLeaveApplications(res.data);
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
    <div className="h-[85vh] w-[85%] overflow-y-auto">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        {username === "admin" ? (
          <span className="text-4xl">All Leave Applications</span>
        ) : (
          <span className="text-4xl">Create a Leave Application</span>
        )}
        {username !== "admin" ? (
          <div>
            <form
              className="flex flex-col gap-5 px-10 py-8 border-2"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <label htmlFor="a-type">Leave Type</label>
                  <select
                    className="capitalize border outline-none py-1 px-2"
                    name="a-type"
                    id="a-type"
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="casual">casual</option>
                    <option value="medical">medical</option>
                    <option value="vacation">vacation</option>
                    <option value="official">official</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="n-days">No. of Days</label>
                  <input
                    required
                    className="border outline-none py-1 px-2"
                    type="number"
                    name="n-days"
                    id="n-days"
                    placeholder="Number of days"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 w-[50%]">
                <div className="flex flex-col gap-3">
                  <label htmlFor="s-date">Starting Date</label>
                  <input
                    required
                    className="border outline-none py-1 px-2"
                    type="date"
                    name="s-date"
                    id="s-date"
                    placeholder="Number of days"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="e-date">Ending Date</label>
                  <input
                    required
                    className="border outline-none py-1 px-2"
                    type="date"
                    name="e-date"
                    id="e-date"
                    placeholder="Number of days"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="application">Reason</label>
                <textarea
                  className="w-full border-2 outline-none px-3 py-2"
                  onClick={() => {
                    setIsSubmitted(false);
                  }}
                  name="application"
                  id="application"
                  cols="30"
                  rows="5"
                  required
                ></textarea>

                <button className="flex justify-center items-center w-[10vw] bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-3 rounded font-semibold mt-3">
                  {spinner && <CgSpinner className="text-xl animate-spin" />}
                  {!spinner && !isSubmitted && "Submit"}
                  {!spinner && isSubmitted && "Done"}
                </button>
              </div>
            </form>
            <section className="my-10 flex flex-col">
              <span className="text-4xl">Previous Applications</span>
              {isLoading && <span className="text-center">Loading...</span>}
              {userLeaveapplications?.map((app, i) => {
                return (
                  <React.Fragment key={i}>
                    <section className="border-2 capitalize flex px-5 py-3 mt-4 justify-between">
                      <div className="flex flex-col gap-3">
                        <span>Leave Type : {app?.appType}</span>
                        <span>No. of Days : {app?.days}</span>
                        <div className="flex gap-2">
                          <span>
                            Starting Date : {app?.sDate?.slice(0, 10)}
                          </span>
                          <span>Ending Date : {app?.eDate?.slice(0, 10)}</span>
                        </div>
                      </div>
                      <div>
                        <span>Status : {app?.appStatus}</span>
                      </div>
                    </section>
                  </React.Fragment>
                );
              })}
            </section>
          </div>
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
                      <div className="mt-2 whitespace-pre-wrap bg-gray-100 py-5 px-5 w-[95%] mx-auto">
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
