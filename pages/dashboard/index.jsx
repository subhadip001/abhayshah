import Sidebar from "@/components/TeamSidebar";
import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const Dashboard = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [fullname, setFullname] = useState("");
  const [about, setAbout] = useState("");
  const [interest, setInterest] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!auth.username) {
    if (typeof window !== "undefined") {
      if (router.asPath.includes("/dashboard")) {
        router.push("/");
      }
    }
  }

  const getDetails = async () => {
    console.log(auth.username);
    try {
      const res = await axios.post(
        "https://abhayasha.onrender.com/getUserdetailsByUsername",
        {
          username: auth.username,
        }
      );
      const data = res.data;
      console.log(data);
      setFullname(data.fullname);
      setAbout(data.about);
      setInterest(data.areaOfInterest);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://abhayasha.onrender.com/updateUserdetails",
        {
          username: auth.username,
          data: {
            fullname: fullname,
            about: about,
            areaOfInterest: interest,
          },
        }
      );
      console.log(res.data);
      setFullname(res.data.fullname);
      setAbout(res.data.about);
      setInterest(res.data.areaOfInterest);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <section className="h-[100vh] w-[85%]">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl">User Details</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Enrollment No : </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enrollment no"
                className="border outline-none cursor-not-allowed px-3 py-2"
                value={auth.username}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="fullname">Full Name : </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter full name"
                className="border outline-none  px-3 py-2"
                value={fullname}
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="about">Add your Designation : </label>
              <input
                type="text"
                name="about"
                id="about"
                value={about}
                placeholder="Enter your experience/designation"
                className="border outline-none px-3 py-2"
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="interest">Area of Interest : </label>
              <input
                type="text"
                name="interest"
                id="interest"
                value={interest}
                placeholder="Enter your interest"
                className="border outline-none px-3 py-2"
                onChange={(e) => {
                  setInterest(e.target.value);
                }}
              />
            </div>
          </div>
          <button className="bg-[#3B82F6] px-2 py-1 text-white w-20 flex justify-center items-center">
            {isLoading ? <CgSpinner className="animate-spin" /> : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Dashboard;
