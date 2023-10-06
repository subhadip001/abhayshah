import React, { useEffect, useState } from "react";
import FileUploader from "@/components/FileUploader";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import YearPicker from "@/components/YearPicker";

const Opportunities = () => {
  const [projType, setProjType] = useState("LAB_BASED_PROJECTS");
  const [downloadURL, setDownloadURL] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [adminOppList, setAdminOppList] = useState([]);
  const navClass = "px-3 py-1 bg-gray-200 cursor-pointer";
  const activeNavClass = "px-3 py-1 bg-blue-600 text-white";

  const handleSendMail = async (
    nameOfStudent,
    branch,
    institute,
    email,
    contact,
    programme,
    yog,
    message
  ) => {
    try {
      const res = await axios.post(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/send-email",
        {
          fileUrl: downloadURL,
          recipientEmail: "mnhacker2001@gmail.com",
          nameOfStudent,
          branch,
          institute,
          email,
          contact,
          programme,
          yog,
          message,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminOppList = async () => {
    try {
      const res = await axios.get(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getAdminOpps"
      );
      console.log(res.data);
      setAdminOppList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminOppList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    console.log(downloadURL);
    setSpinner(true);
    try {
      const res = await axios.post(
        // "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/postOppRequest",
        "http://localhost:8000/abhay/postOppRequest",
        {
          nameOfStudent: data["name"],
          branch: data["branch"],
          institute:data["institute"],
          email:["email"],
          contact:["contact"],
          programme: data["programme"],
          yog: data["yog"],
          cvLink: downloadURL,
          message: data["message"],
        }
      );
      console.log(res.data);
      setSpinner(false);
      setIsSubmitted(true);
      handleSendMail(
        data["name"],
        data["branch"],
        data["programme"],
        data["institute"],
        data["email"],
        data["contact"],
        data["yog"],
        data["message"]
      );
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <form
        action=""
        onSubmit={handleSubmit}
        onChange={() => {
          setIsSubmitted(false);
        }}
        className="w-[80%] mx-auto border-2"
      >
        <div className="flex flex-col justify-center gap-5 w-[90%] mx-auto my-10">
          <span className="text-2xl font-semibold mb-5 ">
            Submit your details here. In case of any releveant opportunity, you
            will be contacted.
          </span>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="fullname"
                name="name"
                placeholder="Type your full name"
                required
                className="inline-block w-full outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="fullname">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                placeholder="Type your branch name"
                className="inline-block w-full outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="institute">Institute</label>
              <input
                type="text"
                id="institute"
                name="institute"
                placeholder="Type your Institute name"
                className="inline-block w-full outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Type your email"
                required
                className="inline-block w-full outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                placeholder="Type your contact number"
                className="inline-block w-full outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
          </div>


          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullname">Programme</label>
              <input
                type="text"
                id="programme"
                name="programme"
                placeholder="Type your programme name"
                className="inline-block w-full outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>

            <div className="flex flex-col gap-1 justify-center">
              <YearPicker
                id="yog"
                name="yog"
                title={"Year of Graduation"}
                classname={
                  "w-full justify-between flex flex-col outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
                }
              />
            </div>
            <div className="flex gap-1 items-center">
              <FileUploader
                label={"Upload CV"}
                className={"w-full flex justify-between items-center"}
                buttonClass={
                  "bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-3 rounded font-semibold"
                }
                setDownloadURL={setDownloadURL}
                id={"cv"}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message">Message</label>
            <textarea
              type="message"
              id="message"
              placeholder="Type message"
              name="message"
              className="inline-block w-full outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
            />
          </div>

          <button
            type="submit"
            className="flex justify-center ml-auto items-center w-[10vw] bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-3 rounded font-semibold mt-3"
          >
            {spinner && <CgSpinner className="text-xl animate-spin" />}
            {!spinner && !isSubmitted && "Submit"}
            {!spinner && isSubmitted && "Done"}
          </button>
        </div>
      </form>
      <div className="bg-brand text-2xl font-semibold p-5 w-[100%] pl-[10%] mt-5 text-white">List of Open Positions and Opportunity</div>
      <section className="flex flex-col gap-5 w-[80%] mx-auto my-10">
        <nav className="flex gap-5 uppercase">
          <span
            className={
              projType === "LAB_BASED_PROJECTS" ? activeNavClass : navClass
            }
            onClick={() => {
              setProjType("LAB_BASED_PROJECTS");
            }}
          >
            lab based projects
          </span>
          <span
            className={
              projType === "BTECH_PROJECTS" ? activeNavClass : navClass
            }
            onClick={() => {
              setProjType("BTECH_PROJECTS");
            }}
          >
            b.tech projects
          </span>
          <span
            className={
              projType === "MTECH_PROJECTS" ? activeNavClass : navClass
            }
            onClick={() => {
              setProjType("MTECH_PROJECTS");
            }}
          >
            m.tech projects
          </span>
        </nav>
        <div className="">
          <div className="flex flex-col gap-5 w-[100%] mx-auto my-5">
            {adminOppList
              ?.filter((opp) => opp?.typeOfOpp === projType)
              .map((opp, i) => {
                return (
                  <div key={i} className="flex flex-col gap-5 border-2 p-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-2xl font-semibold">
                        {opp?.title}
                      </span>
                      <span className="text-lg font-semibold">
                        {opp?.description}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Opportunities;
