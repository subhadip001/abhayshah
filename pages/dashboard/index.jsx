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
import { MdEdit } from "react-icons/md";

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
  const [data, setData] = useState();

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
      setFullname(data.fullname);
      setAbout(data.about);
      setInterest(data.areaOfInterest);
      setData(data);
      console.log(data);
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
            fullname: data.fullname,
            about: data.about,
            areaOfInterest: data.areaOfInterest,
            profession: data.profession,
            honors: data.honors,
            education: data.education,
            administrative: data.administrative,
            research: data.research,
            teaching: data.teaching,
            phdsupervision: data.phdsupervision,
            shortterm: data.shortterm,
            special: data.special,
            seminars: data.seminars,
            journal: data.journal,
            photo: downloadURL || data.photo,
          },
        }
      );
      console.log(res.data);
      setData(res.data);
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

  ///////////////////////////////////////////////////////////////////////////////////////
  // Educational Details
  ///////////////////////////////////////////////////////////////////////////////////////

  const [editingEducation, setEditingEducation] = useState(false);
  const [editedEducationIndex, setEditedEducationIndex] = useState(null);
  const [editedEducationItem, setEditedEducationItem] = useState({});
  const [addingEducation, setAddingEducation] = useState(false);

  const handleEditEducation = (index) => {
    setEditingEducation(true);
    setEditedEducationIndex(index);
    setEditedEducationItem(data.education[index]);
  };

  const handleSaveEditedEducation = () => {
    if (editedEducationIndex === null) {
      // Add a new education entry
      setData({
        ...data,
        education: [
          ...data.education,
          {
            degree: editedEducationItem.degree,
            subject: editedEducationItem.subject,
            university: editedEducationItem.university,
            yearStudied: editedEducationItem.yearStudied,
          },
        ],
      });
    } else {
      // Update an existing education entry
      const updatedEducation = [...data.education];
      updatedEducation[editedEducationIndex] = editedEducationItem;
      setData({ ...data, education: updatedEducation });
    }

    // Reset the state variables
    setEditingEducation(false);
    setEditedEducationIndex(null);
    setEditedEducationItem({});
  };

  const handleDeleteEducation = (index) => {
    const updatedEducation = data.education.filter((_, i) => i !== index);
    setData({ ...data, education: updatedEducation });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // Administrative Background
  ///////////////////////////////////////////////////////////////////////////////////////

  const [editingAdmin, setEditingAdmin] = useState(false);
  const [editedAdminIndex, setEditedAdminIndex] = useState(null);
  const [editedAdminItem, setEditedAdminItem] = useState({});

  const handleEditAdmin = (index) => {
    setEditingAdmin(true);
    setEditedAdminIndex(index);
    setEditedAdminItem(data.administrative[index]);
  };

  const handleSaveEditedAdmin = () => {
    if (editedAdminIndex === null) {
      // Add a new administrative entry
      setData({
        ...data,
        administrative: [
          ...data.administrative,
          {
            from: editedAdminItem.from,
            to: editedAdminItem.to,
            designation: editedAdminItem.designation,
            organisation: editedAdminItem.organisation,
            level: editedAdminItem.level,
          },
        ],
      });
    } else {
      // Update an existing administrative entry
      const updatedAdmin = [...data.administrative];
      updatedAdmin[editedAdminIndex] = editedAdminItem;
      setData({ ...data, administrative: updatedAdmin });
    }

    // Reset the state variables
    setEditingAdmin(false);
    setEditedAdminIndex(null);
    setEditedAdminItem({});
  };

  const handleDeleteAdmin = (index) => {
    const updatedAdmin = data.administrative.filter((_, i) => i !== index);
    setData({ ...data, administrative: updatedAdmin });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // Professional background
  ///////////////////////////////////////////////////////////////////////////////////////

  const [editingProfession, setEditingProfession] = useState(false);
  const [editedProfessionIndex, setEditedProfessionIndex] = useState(null);
  const [editedProfessionItem, setEditedProfessionItem] = useState({});

  const handleEditProfession = (index) => {
    setEditingProfession(true);
    setEditedProfessionIndex(index);
    setEditedProfessionItem(data.profession[index]);
  };

  const handleSaveEditedProfession = () => {
    if (editedProfessionIndex === null) {
      // Add a new professional entry
      setData({
        ...data,
        profession: [
          ...data.profession,
          {
            from: editedProfessionItem.from,
            to: editedProfessionItem.to,
            designation: editedProfessionItem.designation,
            organisation: editedProfessionItem.organisation,
          },
        ],
      });
    } else {
      // Update an existing professional entry
      const updatedProfession = [...data.profession];
      updatedProfession[editedProfessionIndex] = editedProfessionItem;
      setData({ ...data, profession: updatedProfession });
    }

    // Reset the state variables
    setEditingProfession(false);
    setEditedProfessionIndex(null);
    setEditedProfessionItem({});
  };

  const handleDeleteProfession = (index) => {
    const updatedProfession = data.profession.filter((_, i) => i !== index);
    setData({ ...data, profession: updatedProfession });
  };

  const handleAddProfession = () => {
    setEditingProfession(true);
    setEditedProfessionIndex(null);
    setEditedProfessionItem({});
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // Honors and Rewards
  ///////////////////////////////////////////////////////////////////////////////////////
  const [editingHonor, setEditingHonor] = useState(false);
  const [editedHonorIndex, setEditedHonorIndex] = useState(null);
  const [editedHonorItem, setEditedHonorItem] = useState({});

  const handleEditHonor = (index) => {
    setEditingHonor(true);
    setEditedHonorIndex(index);
    setEditedHonorItem(data.honors[index]);
  };

  const handleSaveEditedHonor = () => {
    if (editedHonorIndex === null) {
      // Add a new administrative entry
      setData({
        ...data,
        honors: [
          ...data.honors,
          {
            award: editedHonorItem.award,
            institute: editedHonorItem.institute,
            yearAwarded: editedHonorItem.yearAwarded,
          },
        ],
      });
    } else {
      // Update an existing administrative entry
      const updatedHonor = [...data.honors];
      updatedHonor[editedHonorIndex] = editedHonorItem;
      setData({ ...data, honors: updatedHonor });
    }

    // Reset the state variables
    setEditingHonor(false);
    setEditedHonorIndex(null);
    setEditedHonorItem({});
  };

  const handleDeleteHonor = (index) => {
    const updatedHonor = data.honors.filter((_, i) => i !== index);
    setData({ ...data, honors: updatedHonor });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // Sponsored Research
  ///////////////////////////////////////////////////////////////////////////////////////
  const [editingSponsor, setEditingSponsor] = useState(false);
  const [editedSponsorIndex, setEditedSponsorIndex] = useState(null);
  const [editedSponsorItem, setEditedSponsorItem] = useState({});

  const handleEditSponsor = (index) => {
    setEditingSponsor(true);
    setEditedSponsorIndex(index);
    setEditedSponsorItem(data.research[index]);
  };

  const handleSaveEditedSponsor = () => {
    if (editedSponsorIndex === null) {
      // Add a new administrative entry
      setData({
        ...data,
        research: [
          ...data.research,
          {
            scheme: editedHonorItem.award,
            sponsoringAgency: editedHonorItem.institute,
            otherFaculties: editedHonorItem.yearAwarded,
            yearSponsored: editedHonorItem.yearAwarded,
          },
        ],
      });
    } else {
      // Update an existing administrative entry
      const updatedSponsor = [...data.research];
      updatedSponsor[editedSponsorIndex] = editedSponsorItem;
      setData({ ...data, research: updatedSponsor });
    }

    // Reset the state variables
    setEditingSponsor(false);
    setEditedSponsorIndex(null);
    setEditedSponsorItem({});
  };

  const handleDeleteSponsor = (index) => {
    const updatedSponsor = data.research.filter((_, i) => i !== index);
    setData({ ...data, research: updatedSponsor });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // Memberships
  ///////////////////////////////////////////////////////////////////////////////////////
  const [editingMemberships, setEditingMemberships] = useState(false);
  const [editedMembershipsIndex, setEditedMembershipsIndex] = useState(null);
  const [editedMembershipsItem, setEditedMembershipsItem] = useState({});

  const handleEditMemberships = (index) => {
    setEditingMemberships(true);
    setEditedMembershipsIndex(index);
    setEditedMembershipsItem(data.research[index]);
  };

  const handleSaveEditedMemberships = () => {
    if (editedMembershipsIndex === null) {
      // Add a new administrative entry
      setData({
        ...data,
        research: [
          ...data.memberships,
          {
            field: editedMembershipsItem.field,
          },
        ],
      });
    } else {
      // Update an existing administrative entry
      const updatedMemberships = [...data.memberships];
      updatedMemberships[editedMembershipsIndex] = editedMembershipsItem;
      setData({ ...data, research: updatedMemberships });
    }

    // Reset the state variables
    setEditingMemberships(false);
    setEditedMembershipsIndex(null);
    setEditedMembershipsItem({});
  };

  const handleDeleteMemberships = (index) => {
    const updatedMemberships = data.memberships.filter((_, i) => i !== index);
    setData({ ...data, memberships: updatedMemberships });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // Teaching
  ///////////////////////////////////////////////////////////////////////////////////////
  const [editingTeaching, setEditingTeaching] = useState(false);
  const [editedTeachingIndex, setEditedTeachingIndex] = useState(null);
  const [editedTeachingItem, setEditedTeachingItem] = useState({});

  const handleEditTeaching = (index) => {
    setEditingTeaching(true);
    setEditedTeachingIndex(index);
    setEditedTeachingItem(data.teaching[index]);
  };

  const handleSaveEditedTeaching = () => {
    if (editedTeachingIndex === null) {
      // Add a new administrative entry
      setData({
        ...data,
        research: [
          ...data.teaching,
          {
            title: editedTeachingItem.title,
            courseCode: editedTeachingItem.courseCode,
            course: editedTeachingItem.course,
            semester: editedTeachingItem.semester,
          },
        ],
      });
    } else {
      // Update an existing administrative entry
      const updatedTeaching = [...data.teaching];
      updatedTeaching[editedTeachingIndex] = editedTeachingItem;
      setData({ ...data, research: updatedTeaching });
    }

    // Reset the state variables
    setEditingTeaching(false);
    setEditedTeachingIndex(null);
    setEditedTeachingItem({});
  };

  const handleDeleteTeaching = (index) => {
    const updatedTeaching = data.teaching.filter((_, i) => i !== index);
    setData({ ...data, teaching: updatedTeaching });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // PhD Supervision
  ///////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////
  // Short Term Courses
  ///////////////////////////////////////////////////////////////////////////////////////
  const [editingShortTerm, setEditingShortTerm] = useState(false);
  const [editedShortTermIndex, setEditedShortTermIndex] = useState(null);
  const [editedShortTermItem, setEditedShortTermItem] = useState({});

  const handleEditShortTerm = (index) => {
    setEditingShortTerm(true);
    setEditedShortTermIndex(index);
    setEditedShortTermItem(data.shortterm[index]);
  };

  const handleSaveEditedShortTerm = () => {
    if (editedShortTermIndex === null) {
      // Add a new administrative entry
      setData({
        ...data,
        research: [
          ...data.shortterm,
          {
            courseName: editedShortTermItem.courseName,
            sponsoredBy: editedShortTermItem.sponsoredBy,
            dateParticipated: editedShortTermItem.dateParticipated,
          },
        ],
      });
    } else {
      // Update an existing administrative entry
      const updatedShortTerm = [...data.shortterm];
      updatedShortTerm[editedShortTermIndex] = editedShortTermItem;
      setData({ ...data, shortterm: updatedShortTerm });
    }

    // Reset the state variables
    setEditingShortTerm(false);
    setEditedShortTermIndex(null);
    setEditedShortTermItem({});
  };

  const handleDeleteShortTerm = (index) => {
    const updatedShortTerm = data.shortterm.filter((_, i) => i !== index);
    setData({ ...data, ShortTerm: updatedShortTerm });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // Special
  ///////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////
  // Seminars
  ///////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////
  // Journals
  ///////////////////////////////////////////////////////////////////////////////////////

  return (
    <section className="h-full w-[85%]">
      <div className="w-[98%] h-[100vh] overflow-auto mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl font-semibold">Basic User Details</span>
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
                  setData({ ...data, fullname: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="about">Add your Designation : </label>
              <select
                onChange={(e) => {
                  setAbout(e.target.value);
                  setData({ ...data, about: e.target.value });
                }}
                defaultValue={about}
                name="about"
                id="about"
                className="border outline-none  px-3 py-2"
              >
                <option value="" disabled>
                  {about || <span className="text-gray-300">loading...</span>}
                </option>
                <option value="Professor">Professor</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="Ph.D">Ph.D</option>
              </select>
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
                  setData({ ...data, areaOfInterest: e.target.value });
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
          <button className="w-60 flex justify-center items-center mb-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {isLoading ? <CgSpinner className="animate-spin" /> : "Update"}
          </button>
        </form>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <span className="text-4xl font-semibold">Advanced User Details</span>
          <div>
            <div className="overflow-auto">
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold pb-5">
                  Professional Background
                </h1>
              </div>
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                    <th className="px-4 py-2 bg-gray-200">From</th>
                    <th className="px-4 py-2 bg-gray-200">To</th>
                    <th className="px-4 py-2 bg-gray-200">Designation</th>
                    <th className="px-4 py-2 bg-gray-200">Organisation</th>
                    <th className="px-4 py-2 bg-gray-200">Actions</th>
                    <th className="px-4 py-2 bg-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {data?.profession.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 border-b border-gray-200 py-10"
                    >
                      {editingProfession && editedProfessionIndex === index ? (
                        <>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedAdminItem.from}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedAdminItem({
                                  ...editedAdminItem,
                                  from: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedAdminItem.to}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedAdminItem({
                                  ...editedAdminItem,
                                  to: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedAdminItem.designation}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedAdminItem({
                                  ...editedAdminItem,
                                  designation: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedAdminItem.organisation}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedAdminItem({
                                  ...editedAdminItem,
                                  organisation: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={handleSaveEditedAdmin}
                            >
                              Save
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => {
                                setEditingAdmin(false);
                                setEditedAdminIndex(null);
                                setEditedAdminItem({});
                              }}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-4">{item.from}</td>
                          <td className="px-4 py-4">{item.to}</td>
                          <td className="px-4 py-4">{item.designation}</td>
                          <td className="px-4 py-4">{item.organisation}</td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleEditProfession(index)}
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDeleteProfession(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {editingProfession && editedProfessionIndex === null && (
                    <tr className="hover:bg-gray-100 border-b border-gray-200 py-10">
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedProfessionItem.from}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedProfessionItem({
                              ...editedProfessionItem,
                              from: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedProfessionItem.to}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedProfessionItem({
                              ...editedProfessionItem,
                              to: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedProfessionItem.designation}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedProfessionItem({
                              ...editedProfessionItem,
                              designation: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedProfessionItem.organisation}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedProfessionItem({
                              ...editedProfessionItem,
                              organisation: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={handleSaveEditedProfession}
                        >
                          Save
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setEditingProfession(false);
                            setEditedProfessionIndex(null);
                            setEditedProfessionItem({});
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setEditingProfession(true);
                    setEditedProfessionIndex(null);
                    setEditedProfessionItem({
                      to: "",
                      from: "",
                      designation: "",
                      organisation: "",
                    });
                  }}
                >
                  Add Professional Background
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-auto">
              <div className="flex flex-col items-start">
                <h4 className="text-2xl font-bold pb-5">Honors and Rewards</h4>
              </div>
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                    <th className="px-4 py-2 bg-gray-200">Award</th>
                    <th className="px-4 py-2 bg-gray-200">Institute</th>
                    <th className="px-4 py-2 bg-gray-200">Year Awarded</th>
                    <th className="px-4 py-2 bg-gray-200">Actions</th>
                    <th className="px-4 py-2 bg-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {data?.honors.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 border-b border-gray-200 py-10"
                    >
                      {editingHonor && editedHonorIndex === index ? (
                        <>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedHonorItem.award}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedHonorItem({
                                  ...editedHonorItem,
                                  award: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedHonorItem.institute}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedHonorItem({
                                  ...editedHonorItem,
                                  institute: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedHonorItem.yearAwarded}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedHonorItem({
                                  ...editedHonorItem,
                                  yearAwarded: e.target.value,
                                })
                              }
                            />
                          </td>

                          <td className="px-4 py-4">
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={handleSaveEditedHonor}
                            >
                              Save
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => {
                                setEditingHonor(false);
                                setEditedHonorIndex(null);
                                setEditedHonorItem({});
                              }}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-4">{item.award}</td>
                          <td className="px-4 py-4">{item.institute}</td>
                          <td className="px-4 py-4">{item.yearAwarded}</td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleEditHonor(index)}
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDeleteHonor(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {editingHonor && editedHonorIndex === null && (
                    <tr className="hover:bg-gray-100 border-b border-gray-200 py-10">
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedHonorItem.award}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedHonorItem({
                              ...editedHonorItem,
                              award: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedHonorItem.institute}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedHonorItem({
                              ...editedHonorItem,
                              institute: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedHonorItem.yearAwarded}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedHonorItem({
                              ...editedHonorItem,
                              yearAwarded: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={handleSaveEditedHonor}
                        >
                          Save
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setEditingHonor(false);
                            setEditedHonorIndex(null);
                            setEditedHonorItem({});
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setEditingHonor(true);
                    setEditedHonorIndex(null);
                    setEditedHonorItem({
                      award: "",
                      institute: "",
                      yearAwarded: "",
                    });
                  }}
                >
                  Add Honors and Rewards
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-auto">
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold pb-5">Educational Details</h1>
              </div>
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                    <th className="px-4 py-2 bg-gray-200">Degree</th>
                    <th className="px-4 py-2 bg-gray-200">Subject</th>
                    <th className="px-4 py-2 bg-gray-200">University</th>
                    <th className="px-4 py-2 bg-gray-200">Year Studied</th>
                    <th className="px-4 py-2 bg-gray-200">Actions</th>
                    <th className="px-4 py-2 bg-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {data?.education.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 border-b border-gray-200 py-10"
                    >
                      {editingEducation && editedEducationIndex === index ? (
                        <>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedEducationItem.degree}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedEducationItem({
                                  ...editedEducationItem,
                                  degree: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedEducationItem.subject}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedEducationItem({
                                  ...editedEducationItem,
                                  subject: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedEducationItem.university}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedEducationItem({
                                  ...editedEducationItem,
                                  university: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedEducationItem.yearStudied}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedEducationItem({
                                  ...editedEducationItem,
                                  yearStudied: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={handleSaveEditedEducation}
                            >
                              Save
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => {
                                setEditingEducation(false);
                                setEditedEducationIndex(null);
                                setEditedEducationItem({});
                              }}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-4">{item.degree}</td>
                          <td className="px-4 py-4">{item.subject}</td>
                          <td className="px-4 py-4">{item.university}</td>
                          <td className="px-4 py-4">{item.yearStudied}</td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleEditEducation(index)}
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDeleteEducation(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {editingEducation && editedEducationIndex === null && (
                    <tr className="hover:bg-gray-100 border-b border-gray-200 py-10">
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedEducationItem.degree}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedEducationItem({
                              ...editedEducationItem,
                              degree: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedEducationItem.subject}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedEducationItem({
                              ...editedEducationItem,
                              subject: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedEducationItem.university}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedEducationItem({
                              ...editedEducationItem,
                              university: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedEducationItem.yearStudied}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedEducationItem({
                              ...editedEducationItem,
                              yearStudied: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={handleSaveEditedEducation}
                        >
                          Save
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setEditingEducation(false);
                            setEditedEducationIndex(null);
                            setEditedEducationItem({});
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setEditingEducation(true);
                    setEditedEducationIndex(null);
                    setEditedEducationItem({
                      degree: "",
                      subject: "",
                      university: "",
                      yearStudied: "",
                    });
                  }}
                >
                  Add Education
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-auto">
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold pb-5">
                  Administrative Background
                </h1>
              </div>
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                    <th className="px-4 py-2 bg-gray-200">From</th>
                    <th className="px-4 py-2 bg-gray-200">To</th>
                    <th className="px-4 py-2 bg-gray-200">Designation</th>
                    <th className="px-4 py-2 bg-gray-200">Organisation</th>
                    <th className="px-4 py-2 bg-gray-200">Level</th>
                    <th className="px-4 py-2 bg-gray-200">Actions</th>
                    <th className="px-4 py-2 bg-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {data?.administrative.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 border-b border-gray-200 py-10"
                    >
                      {editingAdmin && editedAdminIndex === index ? (
                        <>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedAdminItem.from}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedAdminItem({
                                  ...editedAdminItem,
                                  from: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedAdminItem.to}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedAdminItem({
                                  ...editedAdminItem,
                                  to: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedAdminItem.designation}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedAdminItem({
                                  ...editedAdminItem,
                                  designation: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedAdminItem.organisation}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedAdminItem({
                                  ...editedAdminItem,
                                  organisation: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="text"
                              value={editedAdminItem.level}
                              className="border rounded py-1 px-2 w-full border-gray-400"
                              onChange={(e) =>
                                setEditedAdminItem({
                                  ...editedAdminItem,
                                  level: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={handleSaveEditedAdmin}
                            >
                              Save
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => {
                                setEditingAdmin(false);
                                setEditedAdminIndex(null);
                                setEditedAdminItem({});
                              }}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-4">{item.from}</td>
                          <td className="px-4 py-4">{item.to}</td>
                          <td className="px-4 py-4">{item.designation}</td>
                          <td className="px-4 py-4">{item.organisation}</td>
                          <td className="px-4 py-4">{item.level}</td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleEditAdmin(index)}
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDeleteAdmin(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {editingAdmin && editedAdminIndex === null && (
                    <tr className="hover:bg-gray-100 border-b border-gray-200 py-10">
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedAdminItem.from}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedAdminItem({
                              ...editedAdminItem,
                              from: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedAdminItem.to}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedAdminItem({
                              ...editedAdminItem,
                              to: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedAdminItem.designation}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedAdminItem({
                              ...editedAdminItem,
                              designation: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedAdminItem.organisation}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedAdminItem({
                              ...editedAdminItem,
                              organisation: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={editedAdminItem.level}
                          className="border rounded py-1 px-2 w-full border-gray-400"
                          onChange={(e) =>
                            setEditedAdminItem({
                              ...editedAdminItem,
                              level: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={handleSaveEditedAdmin}
                        >
                          Save
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setEditingAdmin(false);
                            setEditedAdminIndex(null);
                            setEditedAdminItem({});
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setEditingAdmin(true);
                    setEditedAdminIndex(null);
                    setEditedAdminItem({
                      to: "",
                      from: "",
                      designation: "",
                      organisation: "",
                      level: "",
                    });
                  }}
                >
                  Add Admin Background
                </button>
              </div>
            </div>
          </div>

          <button className="w-60 flex justify-center items-center mb-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {isLoading ? <CgSpinner className="animate-spin" /> : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Dashboard;
