import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import "firebase/storage";
import React, { useContext, useState } from "react";
import { CgSpinner } from "react-icons/cg";

//

const filemanager = () => {
  const auth = useContext(AuthContext);
  const [docname, setDocname] = useState("");
  const [docDesc, setDocDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [fileTab, setFileTab] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setIsLoading(true);
    if (fileTab === 1) {
      try {
        const res = await axios.post(
          "https://abhayasha.onrender.com/addResource",
          {
            username: auth.username,
            docname: docname,
            docType: data["d-type"],
            docDesc: docDesc,
            docLink: downloadURL,
          }
        );
        console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else if (fileTab === 2) {
      try {
        const res = await axios.post(
          "https://abhayasha.onrender.com/addPublications",
          {
            username: auth.username,
            docname: docname,
            docDesc: docDesc,
            docLink: downloadURL,
          }
        );
        console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else if (fileTab === 3) {
      try {
        const res = await axios.post(
          "https://abhayasha.onrender.com/addProjects",
          {
            username: auth.username,
            docname: docname,
            docDesc: docDesc,
            docLink: downloadURL,
          }
        );
        console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  function handleFileUpload(event) {
    setFile(event.target.files[0]);
  }

  const firebaseConfig = {
    apiKey: "AIzaSyARVarzHCVuEfMFpL2aN9p-8bIn6ITk-q8",
    authDomain: "abheyshahpersonalproject.firebaseapp.com",
    databaseURL: "https://abheyshahpersonalproject-default-rtdb.firebaseio.com",
    projectId: "abheyshahpersonalproject",
    storageBucket: "abheyshahpersonalproject.appspot.com",
    messagingSenderId: "769083347589",
    appId: "1:769083347589:web:12069c4614006777e38fec",
    measurementId: "G-D159Y5Z10B",
  };

  async function uploadFile() {
    // Initialize Firebase

    if (!file) {
      console.log("No file selected");
      return;
    }
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageRef = ref(storage, "ABHAY_SHAH_ECE/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get upload progress as a percentage
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setProgress(progress);
      },
      (error) => {
        // Handle upload errors
        console.log(error);
      },
      async () => {
        // Handle successful upload
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(`File available at ::${downloadURL}`);
        setDownloadURL(downloadURL);
        // download the file from the link
        //download_file();
      }
    );
  }

  return (
    <section className="h-[100vh] w-[85%]">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl">Upload Files</span>
        <div className="flex justify-between item-center gap-2">
          <div
            onClick={() => {
              setFileTab(1);
            }}
            className={`flex h-[7vh] w-[30%] justify-center items-center ${
              fileTab === 1 ? `bg-[#3B82F6] text-white` : `bg-gray-200`
            } cursor-pointer`}
          >
            Resources
          </div>
          <div
            onClick={() => {
              setFileTab(2);
            }}
            className={`flex h-[7vh] w-[30%] justify-center items-center ${
              fileTab === 2 ? `bg-[#3B82F6] text-white` : `bg-gray-200`
            } cursor-pointer`}
          >
            Publications
          </div>
          <div
            onClick={() => {
              setFileTab(3);
            }}
            className={`flex h-[7vh] w-[30%] justify-center items-center ${
              fileTab === 3 ? `bg-[#3B82F6] text-white` : `bg-gray-200`
            } cursor-pointer`}
          >
            Projects
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullname">Document Name : </label>
              <input
                type="text"
                name="docname"
                id="docname"
                required
                placeholder="Enter Document name"
                className="border outline-none  px-3 py-2"
                value={docname}
                onChange={(e) => {
                  setDocname(e.target.value);
                }}
              />
            </div>
            {fileTab === 1 && (
              <div className="flex gap-10 items-center">
                <div className="flex gap-2 items-center">
                  <input
                    className="cursor-pointer scale-150"
                    type="radio"
                    name="d-type"
                    id="public"
                    value="public"
                    defaultChecked
                  />
                  <label className="cursor-pointer" htmlFor="public">
                    Public
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    className="cursor-pointer scale-150"
                    type="radio"
                    name="d-type"
                    id="private"
                    value="private"
                  />
                  <label className="cursor-pointer" htmlFor="private">
                    Private
                  </label>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="about">Document Description : </label>
              <textarea
                type="text"
                name="docDesc"
                id="docDesc"
                required
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
              <label htmlFor="doc">Attach Document : </label>
              <div className="flex gap-2">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  id="doc"
                  required
                  placeholder="Document"
                  className="border outline-none  px-3 py-2"
                />
                <button
                  onClick={uploadFile}
                  type="button"
                  className="bg-[#3B82F6] px-2 py-1 text-white flex justify-center items-center"
                >
                  {false ? <CgSpinner className="animate-spin" /> : "Upload"}
                </button>
              </div>
            </div>
            {progress > 0 && <p>Upload progress: {progress}%</p>}
            {downloadURL && <p>File uploaded successfully!</p>}
          </div>
          {downloadURL && (
            <button className="bg-[#3B82F6] py-3 text-white w-[30%] flex justify-center items-center">
              {isLoading ? (
                <CgSpinner className="animate-spin" />
              ) : (
                "Add to Resources"
              )}
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default filemanager;
