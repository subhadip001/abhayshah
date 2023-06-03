import React, { useState } from "react";
import FileUploader from "@/components/FileUploader";

const Opportunities = () => {
  const [projType, setProjType] = useState("lab");
  const [downloadURL, setDownloadURL] = useState("");
  const navClass = "px-3 py-1 bg-gray-200 cursor-pointer";
  const activeNavClass = "px-3 py-1 bg-blue-600 text-white";

  return (
    <div className="flex flex-col gap-5">
      <form action="" className="w-[80%] mx-auto border-2">
        <div className="flex flex-col justify-center gap-5 w-[90%] mx-auto my-10">
          <div className="flex items-center gap-5">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="fullname"
              placeholder="Type your full name"
              required
              className="inline-block w-[100%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
            />
          </div>
          <div className="flex items-center gap-5">
            <label htmlFor="fullname">Branch</label>
            <input
              type="text"
              id="branch"
              placeholder="Type your branch name"
              className="inline-block w-[98%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
            />
          </div>
          <div className="flex items-center gap-5">
            <label htmlFor="cv">Upload CV</label>
            <FileUploader
              className={
                "inline-block w-[85%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              }
              setDownloadURL={setDownloadURL}
              id={"cv"}
            />
          </div>
          <div className="flex items-center gap-5">
            <label htmlFor="password">Message</label>
            <textarea
              type="password"
              id="password"
              placeholder="Type password"
              className="inline-block w-[95%] outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
            />
          </div>

          <button className="h-[5vh] w-[10%] ml-auto text-center bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold">
            Submit
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
