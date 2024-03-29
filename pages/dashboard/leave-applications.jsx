import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CgSpinner } from "react-icons/cg";

const leaveapplications = () => {
  const auth = useContext(AuthContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [leaveapplications, setLeaveApplications] = useState([]);
  const [showLeaveCounter, setShowLeaveCounter] = useState(false);
  const [leaveCounterList, setLeaveCounterList] = useState([]);
  const [userLeaveapplications, setUserLeaveApplications] = useState([]);
  const username = auth?.username;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setSpinner(true);
    const start = new Date(data["s-date"]);
    const end = new Date(data["e-date"]);
    const timeDifference = Math.abs(end - start);
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (username !== "admin") {
      try {
        const res = await axios.post(
          "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/addLeaveApp",
          {
            appType: data["a-type"],
            appDesc: data["application"],
            days: days,
            sDate: data["s-date"],
            eDate: data["e-date"],
            username: username,
            fullName: auth?.fullname,
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
          "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getAllLeaveApps"
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
    if (username !== "admin") {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getLeaveAppsByUsername",
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

  const updateLeaveAppStatusHandler = useCallback(
    async (uname, id, updatedStatus, days) => {
      if (username === "admin") {
        const res = await axios.post(
          "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/updateApplicationStatus",
          {
            username: uname,
            appId: id,
            status: updatedStatus,
            days: days,
          }
        );
        console.log(res.data);
        getLeaveApps();
      }
    },
    []
  );

  const getLeaveCounterList = async () => {
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getLeavesLeftForAll",
        {
          username: username,
        }
      );
      console.log(res.data);
      setLeaveCounterList(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleResetLeaveCounter = async (sUsername) => {
    try {
      const res = await axios.post(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/resetTotalLeavesByAdmin",
        {
          username: username,
          studentUsername: sUsername,
        }
      );
      console.log(res.data);
      getLeaveCounterList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaveApps();
    getAllLeaveAppsByUsername();
  }, []);

  return (
    <div className="h-[90vh] w-[85%] overflow-y-auto">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        {username === "admin" ? (
          <div className="flex item-center justify-between">
            <span className="text-4xl">
              {showLeaveCounter ? "Leave Counter" : "All Leave Applications"}
            </span>
            <button
              onClick={() => {
                setShowLeaveCounter(!showLeaveCounter);
                getLeaveCounterList();
              }}
              className="text-xl px-3 py-2 bg-secondary text-white"
            >
              {showLeaveCounter ? "Close" : "Show Leave Counter"}
            </button>
          </div>
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
                <div className="grid grid-cols-2 gap-5">
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
              {!isLoading &&
                userLeaveapplications
                  ?.slice(0)
                  .reverse()
                  .map((app, i) => {
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
                              <span>
                                Ending Date : {app?.eDate?.slice(0, 10)}
                              </span>
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
            {!showLeaveCounter ? (
              <div className="flex flex-col gap-10">
                {isLoading && <span className="text-center">Loading...</span>}
                {!isLoading && leaveapplications?.length === 0 && (
                  <span className="text-center">No Applications found</span>
                )}
                {!isLoading &&
                  leaveapplications
                    ?.slice(0)
                    .reverse()
                    .map((app, i) => {
                      return (
                        <React.Fragment key={i}>
                          <section className="border-2 capitalize flex px-5 py-3 justify-between">
                            <div className="flex flex-col gap-3">
                              <span>Name : {app?.appOwnerName}</span>
                              <span>Leave Type : {app?.appType}</span>
                              <span>No. of Days : {app?.days}</span>
                              <div className="flex gap-3">
                                <span>
                                  Starting Date : {app?.sDate?.slice(0, 10)}
                                </span>
                                <span>
                                  Ending Date : {app?.eDate?.slice(0, 10)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between w-[25%]">
                              {app?.appDesc?.length > 120 ? (
                                <span>
                                  Reason : {app?.appDesc.slice(0, 120)}...
                                </span>
                              ) : (
                                <span>Reason : {app?.appDesc}</span>
                              )}
                            </div>
                            <div className="flex flex-col justify-center gap-5">
                              {app?.appStatus === "Pending" ? (
                                <>
                                  <button
                                    onClick={() => {
                                      updateLeaveAppStatusHandler(
                                        app?.appOwner,
                                        app?._id,
                                        "Accepted",
                                        app?.days
                                      );
                                    }}
                                    className="px-3 py-1 font-semibold text-green-500 transition-all hover:text-white border border-green-500 hover:bg-green-500"
                                  >
                                    Acccept
                                  </button>
                                  <button
                                    onClick={() => {
                                      updateLeaveAppStatusHandler(
                                        app?.appOwner,
                                        app?._id,
                                        "Rejected",
                                        0
                                      );
                                    }}
                                    className="px-3 py-1 font-semibold text-red-500 border border-red-500 hover:bg-red-500 transition-all hover:text-white"
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : app?.appStatus === "Accepted" ? (
                                <>
                                  <button className="px-3 py-1 font-semibold text-white bg-green-500 cursor-not-allowed">
                                    Acccepted
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className="px-3 py-1 font-semibold text-white bg-red-500 cursor-not-allowed">
                                    Rejected
                                  </button>
                                </>
                              )}
                            </div>
                          </section>
                        </React.Fragment>
                      );
                    })}
              </div>
            ) : (
              <>
                {isLoading && <span className="text-center">Loading...</span>}
                {!isLoading &&
                  leaveCounterList
                    .slice(0)
                    .reverse()
                    .map((app, i) => {
                      return (
                        <React.Fragment key={i}>
                          {app?.username !== "admin" && (
                            <section className="border-2 capitalize flex px-5 py-3 justify-between">
                              <div className="flex flex-col gap-3">
                                <span>Name : {app?.fullname}</span>
                                <span>
                                  Leaves Taken : {app?.totalLeavesTaken}
                                </span>
                                <span>Leaves Left : {app?.leavesLeft}</span>
                              </div>
                              <div className="flex justify-center items-center">
                                <button
                                  className="px-3 py-1 font-semibold text-red-500 border border-red-500 hover:bg-red-500 transition-all hover:text-white"
                                  onClick={() => {
                                    handleResetLeaveCounter(app?.username);
                                  }}
                                >
                                  Reset Leaves
                                </button>
                              </div>
                            </section>
                          )}
                        </React.Fragment>
                      );
                    })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default leaveapplications;
