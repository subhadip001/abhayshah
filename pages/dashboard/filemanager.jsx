import { AuthContext } from "@/store/AuthContext";
import React, { useContext, useState } from "react";

const filemanager = () => {
  const auth = useContext(AuthContext);
  const [docname, setDocname] = useState("");
  const [docDesc, setDocDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [docLink, setDocLink] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {

      const res = await axios.post("https://abhayasha.onrender.com/addResource", {
        username: auth.username,
        docname: docname,
        docDesc: docDesc,
        docLink: "",
      });
      console.log(res.data);

      setDocname("");
      setDocDesc("");
      setFile(null);
      setDocLink(link);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <section className="h-[100vh] w-[85%]">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl">Upload Resource Files</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullname">Document Name : </label>
              <input
                type="text"
                name="docname"
                id="docname"
                placeholder="Enter Document name"
                className="border outline-none  px-3 py-2"
                value={docname}
                onChange={(e) => {
                  setDocname(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="about">Document Description : </label>
              <textarea
                type="text"
                name="docDesc"
                id="docDesc"
                cols={30}
                rows={5}
                value={docDesc}
                placeholder="Enter a description"
                className="border outline-none px-3 py-2"
                onChange={(e) => {
                  setDocDesc(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="fullname">Attach Document : </label>
              <input
                type="file"
                name="docname"
                id="docname"
                placeholder="Document"
                className="border outline-none  px-3 py-2"
              />
            </div>
          </div>
          <button className="bg-[#3B82F6] px-2 py-1 text-white w-20 flex justify-center items-center">
            {isLoading ? <CgSpinner className="animate-spin" /> : "Add"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default filemanager;
