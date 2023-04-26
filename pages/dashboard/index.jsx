import Sidebar from "@/components/TeamSidebar";
import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import "firebase/storage";
import { CgSpinner } from "react-icons/cg";

const Dashboard = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [fullname, setFullname] = useState("");
  const [about, setAbout] = useState("");
  const [interest, setInterest] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
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
            photo: downloadURL,
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
            <div className="flex flex-col gap-2">
              <label htmlFor="doc">Update Photo : </label>
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
                  {"Upload"}
                </button>
              </div>
              <div className="flex gap-3">
                {progress > 0 && <p>Upload progress: {progress}%</p>}
                {downloadURL && <p>File uploaded successfully!</p>}
              </div>
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
