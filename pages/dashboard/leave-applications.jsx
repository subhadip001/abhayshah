import React, { useState } from "react";

const leaveapplications = () => {
  const [formData, setFormData] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setFormData(data);
  };
  return (
    <div className="h-[100vh] w-[85%]">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl">Leave Applications</span>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex gap-10 items-center">
            <div className="flex gap-2 items-center">
              <input
                className="cursor-pointer scale-150"
                type="radio"
                name="l-app"
                id="casual"
                value="casual"
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
              name="application"
              id="application"
              cols="30"
              rows="15"
            ></textarea>
            <button className="bg-[#3B82F6] px-2 py-1 text-white w-20">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default leaveapplications;
