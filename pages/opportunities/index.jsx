import React, { useState } from "react";
import FileUploader from "@/components/FileUploader";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import YearPicker from "@/components/YearPicker";

const Opportunities = () => {
  const [projType, setProjType] = useState("lab");
  const [downloadURL, setDownloadURL] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navClass = "px-3 py-1 bg-gray-200 cursor-pointer";
  const activeNavClass = "px-3 py-1 bg-blue-600 text-white";

  const handleSendMail = async (
    nameOfStudent,
    branch,
    programme,
    yog,
    message
  ) => {
    try {
      const res = await axios.post(
        "https://api.subhadipmandal.engineer/abhay/send-email",
        {
          fileUrl: downloadURL,
          recipientEmail: "mnhacker2001@gmail.com",
          nameOfStudent,
          branch,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    console.log(downloadURL);
    setSpinner(true);
    try {
      const res = await axios.post(
        "https://api.subhadipmandal.engineer/abhay/postOppRequest",
        {
          nameOfStudent: data["name"],
          branch: data["branch"],
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
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="fullname"
                name="name"
                placeholder="Type your full name"
                required
                className="inline-block w-[98%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="fullname">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                placeholder="Type your branch name"
                className="inline-block w-[98%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullname">Programme</label>
              <input
                type="text"
                id="programme"
                name="programme"
                placeholder="Type your programme name"
                className="inline-block w-[98%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <YearPicker
                id="yog"
                name="yog"
                title={"Year of Graduation"}
                classname={
                  "inline-block w-[98%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
                }
              />
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <label htmlFor="cv">Upload CV</label>
            <FileUploader
              className={
                "inline-block w-[85%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              }
              setDownloadURL={setDownloadURL}
              id={"cv"}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message">Message</label>
            <textarea
              type="message"
              id="message"
              placeholder="Type message"
              name="message"
              className="inline-block w-[95%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
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
      <section className="h-screen flex flex-col gap-5 w-[80%] mx-auto my-10">
        <nav className="flex gap-5 uppercase">
          <span
            className={projType === "lab" ? activeNavClass : navClass}
            onClick={() => {
              setProjType("lab");
            }}
          >
            lab based projects
          </span>
          <span
            className={projType === "btech" ? activeNavClass : navClass}
            onClick={() => {
              setProjType("btech");
            }}
          >
            b.tech projects
          </span>
          <span
            className={projType === "mtech" ? activeNavClass : navClass}
            onClick={() => {
              setProjType("mtech");
            }}
          >
            m.tech projects
          </span>
        </nav>
        <div className="h-[90vh] border-2"></div>
      </section>
    </div>
  );
};

export default Opportunities;
