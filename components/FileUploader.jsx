import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import "firebase/storage";

const FileUploader = ({
  label,
  setDownloadURL,
  id,
  className,
  buttonClass,
}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

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
  function handleFileUpload(event) {
    setFile(event.target.files[0]);
  }

  async function uploadFile() {
    if (!file) {
      console.log("No file selected");
      alert("No file selected");
      return;
    }
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageRef = ref(storage, "ABHAY_SHAH_ECE/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(`File available at: ${downloadURL}`);
        setDownloadURL(downloadURL); // Call setDownloadURL with the downloadURL
      }
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id}>{label}</label>
      <div className={className}>
        <input id={id} type="file" onChange={handleFileUpload} />
        <button type="button" className={buttonClass} onClick={uploadFile}>
          {progress == 100
            ? "Done"
            : progress > 0 && progress < 100
            ? Math.floor(progress) + "%"
            : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
