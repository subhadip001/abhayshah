import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { AiTwotoneMail } from "react-icons/ai";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import AreaOfInterest from "../../components/AreaOfInterest";
import EducationalDetails from "../../components/EducationalDetails";
import HonorsAndAwards from "../../components/HonorsAndAwards";
import ProfessionalBackground from "../../components/ProfessionalBackground";
import Sponsored from "../../components/Sponsored";
import Adminstrative from "../../components/Adminstrative";
import Membership from "../../components/Membership";
import Teaching from "../../components/Teaching";
import Phd from "../../components/Phds";
import ShortTerm from "../../components/ShortTerm";
import Special from "../../components/Special";
import Seminars from "../../components/Seminars";
import Journal from "../../components/Journal";
import axiosClient, { axiosClientDev } from "@/utils/axiosClient";

const Username = () => {
  const router = useRouter();
  const username = router.query.username;
  const [user, setUser] = useState({});
  const [usernames, setUsernames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRight, setIsLoadingRight] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsAlumni, setShowOptionsAlumni] = useState(false);
  const [photo, setPhoto] = useState("");
  const [profession, setProfession] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const optionsRef = useRef(null);

  const [area, setArea] = useState("");
  const [educational, setEducational] = useState("");

  const [selected, setSelected] = useState("interest");

  const renderComponent = () => {
    return (
      <div className="flex flex-col gap-10 my-5">
        {user?.areaOfInterest && <AreaOfInterest data={user?.areaOfInterest} />}
        {user?.profession?.length !== 0 && (
          <ProfessionalBackground data={user?.profession} />
        )}
        {user?.honors?.length !== 0 && <HonorsAndAwards data={user?.honors} />}
        {user?.education?.length !== 0 && (
          <EducationalDetails data={user?.education} />
        )}
        {user?.administrative?.length !== 0 && (
          <Adminstrative data={user?.administrative} />
        )}
        {user?.research?.length !== 0 && <Sponsored data={user?.research} />}
        {user?.memberships?.length !== 0 && (
          <Membership data={user?.memberships} />
        )}
        {user?.teaching?.length !== 0 && <Teaching data={user?.teaching} />}
        {user?.phdsupervision?.length !== 0 && (
          <Phd data={user?.phdsupervision} />
        )}
        {user?.shortterm?.length !== 0 && <ShortTerm data={user?.shortterm} />}
        {user?.special?.length !== 0 && <Special data={user?.special} />}
        {user?.seminars?.length !== 0 && <Seminars data={user?.seminars} />}
        {user?.journal?.length !== 0 && <Journal data={user?.journal} />}
      </div>
    );
  };

  const getUsernames = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get("/userfullnames");
      const users = res.data;
      setUsernames(res.data);
      console.log(users);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsernames();
  }, []);

  const getUser = async () => {
    setIsLoadingRight(true);
    try {
      const res = await axios.get(
        `https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/userdetails/${username}`
      );
      console.log(res.data);
      setUser(res.data);
      setIsLoadingRight(false);
    } catch (error) {
      console.log(error);
      setIsLoadingRight(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [username]);

  const handleOutsideClick = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
      setShowOptionsAlumni(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const Options = () => {
    return (
      <div
        ref={optionsRef}
        className="flex absolute z-20 bg-white border-2 flex-col w-[18rem] h-[30vh] overflow-y-auto py-1 text-blue-800"
      >
        <Link
          className={`text-center ${
            selected === "interest" ? "bg-blue-100 px-3 py-1" : "py-1 px-3"
          }`}
          href={`/team/${username}/#interest`}
          onClick={() => {
            setSelected("interest");
            setShowOptions(false);
          }}
        >
          Area of Interest
        </Link>
        <Link
          className={`text-center ${
            selected === "professional" ? "bg-blue-100 px-3 py-1" : "py-1 px-3"
          }`}
          href={`/team/${username}/#professional`}
          onClick={() => {
            setSelected("professional");
            setShowOptions(false);
          }}
        >
          Professional Background
        </Link>
        <Link
          className={`text-center ${
            selected === "honors" ? "bg-blue-100 px-3 py-1" : "py-1 px-3"
          }`}
          href={`/team/${username}/#honors`}
          onClick={() => {
            setSelected("honors");
            setShowOptions(false);
          }}
        >
          Honors and Awards
        </Link>
        <Link
          className={`text-center ${
            selected === "educational" ? "bg-blue-100 px-3 py-1" : "py-1 px-3"
          }`}
          href={`/team/${username}/#educational`}
          onClick={() => {
            setSelected("educational");
            setShowOptions(false);
          }}
        >
          Educational Details
        </Link>
        <Link
          className={`text-center ${
            selected === "adnmistrative" ? "bg-blue-100 px-3 py-1" : "py-1 px-3"
          }`}
          href={`/team/${username}/#adminBack`}
          onClick={() => {
            setSelected("adnmistrative");
            setShowOptions(false);
          }}
        >
          Adminstrative Background
        </Link>

        <Link
          className={`text-center ${
            selected === "sponsored" ? "bg-blue-100 px-3 py-1" : "px-3 py-1"
          }`}
          href={`/team/${username}/#sponsored`}
          onClick={() => {
            setSelected("sponsored");
            setShowOptions(false);
          }}
        >
          Sponsored Research Projects
        </Link>
        <Link
          className={`text-center ${
            selected === "memberships" ? "bg-blue-100 px-3 py-1" : "px-3 py-1"
          }`}
          href={`/team/${username}/#memberships`}
          onClick={() => {
            setSelected("memberships");
            setShowOptions(false);
          }}
        >
          Memberships
        </Link>

        <Link
          className={`text-center ${
            selected === "teaching" ? "bg-blue-100 px-3 py-1" : "px-3 py-1"
          }`}
          href={`/team/${username}/#teaching`}
          onClick={() => {
            setSelected("teching");
            setShowOptions(false);
          }}
        >
          Teching Engagements
        </Link>
        <Link
          className={`text-center ${
            selected === "phd" ? "bg-blue-100 px-3 py-1" : "px-3 py-1"
          }`}
          href={`/team/${username}/#phd`}
          onClick={() => {
            setSelected("phd");
            setShowOptions(false);
          }}
        >
          PhDs Supervised
        </Link>
        <Link
          className={`text-center ${
            selected === "participate" ? "bg-blue-100 px-3  py-1" : "px-3 py-1"
          }`}
          href={`/team/${username}/#participate`}
          onClick={() => {
            setSelected("participate");
            setShowOptions(false);
          }}
        >
          Participate in Short term Courses
        </Link>

        <Link
          className={`text-center ${
            selected === "special" ? "bg-blue-100 px-3 py-1" : "py-1 px-3"
          }`}
          href={`/team/${username}/#special`}
          onClick={() => {
            setSelected("special");
            setShowOptions(false);
          }}
        >
          Special Lectures Delivered
        </Link>
        <Link
          className={`text-center ${
            selected === "participation" ? "bg-blue-100 px-3 py-1" : "py-1 px-3"
          }`}
          href={`/team/${username}/#participation`}
          onClick={() => {
            setSelected("participation");
            setShowOptions(false);
          }}
        >
          Participation in Seminars
        </Link>
        <Link
          className={`text-center ${
            selected === "journal" ? "bg-blue-100 px-3 py-1" : "px-3 py-1"
          }`}
          href={`/team/${username}/#journal`}
          onClick={() => {
            setSelected("journal");
            setShowOptions(false);
          }}
        >
          Journal Publications
        </Link>
      </div>
    );
  };

  return (
    <main className="w-full">
      <div className="h-[120vh] flex justify-center items-center">
        <div className="w-[20%] h-[120vh]">
          <ul className="text-left flex flex-col gap-5 w-[93%] mx-auto">
            <div
              id="Professors"
              className="text-left flex flex-col w-full mx-auto"
            >
              <span className="text-[#000] font-semibold px-5 py-2 text-xl">
                Professor
              </span>
              {isLoading && (
                <span className="px-5 h-10 block bg-[#eaeaea] animate-pulse"></span>
              )}
              {!isLoading &&
                usernames?.map((data, i) => {
                  return (
                    <React.Fragment key={data + i}>
                      {data?.about === "Professor" && (
                        <Link
                          key={i}
                          className={`flex items-left justify-start px-5 py-2 hover:bg-[#f3f3f3]  ${
                            router.asPath.includes(
                              `/team/${data?.username}`
                            ) === true
                              ? `bg-[#eaeaea]`
                              : ``
                          }`}
                          href={`/team/${data?.username}`}
                        >
                          <li className="h-[90%] w-full flex justify-between items-center">
                            <span> {data?.fullname}</span>
                            <small className="text-gray-800 capitalize">
                              {data?.typeOfUser}
                            </small>
                          </li>
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
            <hr />
            <div id="Ph.Ds" className="text-left flex flex-col w-full mx-auto">
              <span className="text-[#000] font-semibold px-5 py-2 text-xl">
                Ph.D
              </span>
              {isLoading && (
                <div className="flex flex-col gap-2">
                  <span className="px-5 h-10 block bg-[#eaeaea] animate-pulse"></span>
                  <span className="px-5 h-10 block bg-[#eaeaea] animate-pulse"></span>
                </div>
              )}
              {!isLoading &&
                usernames?.map((data, i) => {
                  return (
                    <React.Fragment key={data + i}>
                      {data?.about === "Ph.D" && (
                        <Link
                          key={i}
                          className={`flex items-left justify-start px-5 py-2 hover:bg-[#f3f3f3]  ${
                            router.asPath.includes(
                              `/team/${data?.username}`
                            ) === true
                              ? `bg-[#eaeaea]`
                              : ``
                          }`}
                          href={`/team/${data?.username}`}
                        >
                          <li className="h-[90%] w-full flex justify-between items-center ">
                            <span> {data?.fullname}</span>
                            <small className="text-gray-800 capitalize">
                              {data?.typeOfUser}
                            </small>
                          </li>
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
            <hr />
            <div
              id="M.Techs"
              className="text-left flex flex-col w-full mx-auto"
            >
              <span className="text-[#000] font-semibold px-5 py-2 text-xl">
                M.Tech
              </span>
              {isLoading && (
                <div className="flex flex-col gap-2">
                  <span className="px-5 h-10 block bg-[#eaeaea] animate-pulse"></span>
                  <span className="px-5 h-10 block bg-[#eaeaea] animate-pulse"></span>
                </div>
              )}
              {!isLoading &&
                usernames?.map((data, i) => {
                  return (
                    <React.Fragment key={data + i}>
                      {data?.about === "M.Tech" && (
                        <Link
                          key={i}
                          className={`flex items-left justify-start px-5 py-2 hover:bg-[#f3f3f3]  ${
                            router.asPath.includes(
                              `/team/${data?.username}`
                            ) === true
                              ? `bg-[#eaeaea]`
                              : ``
                          }`}
                          href={`/team/${data?.username}`}
                        >
                          <li className="h-[90%] w-full flex justify-between items-center ">
                            <span> {data?.fullname}</span>
                            <small className="text-gray-800 capitalize">
                              {data?.typeOfUser}
                            </small>
                          </li>
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
            <hr />
            <div
              id="B.Techs"
              className="text-left flex flex-col w-full mx-auto"
            >
              <span className="text-[#000] font-semibold px-5 py-2 text-xl">
                B.Tech
              </span>
              <div className=" h-[90] w-full flex justify-between items-center">
                <div>
                  <button
                    onClick={() => {
                      setShowOptionsAlumni(!showOptionsAlumni);
                    }}
                    className="capitalize text-xl flex w-full h-[90%] justify-between items-center px-5 py-2 gap-36"
                  >
                    Alumni
                    {showOptionsAlumni ? (
                      <SlArrowUp className="mt-[0.3rem]" />
                    ) : (
                      <SlArrowDown className="mt-[0.3rem]" />
                    )}
                  </button>
                </div>
                <span></span>
              </div>
              {isLoading && (
                <div className="flex flex-col gap-2">
                  <span className="px-5 h-10 block bg-[#eaeaea] animate-pulse"></span>
                  <span className="px-5 h-10 block bg-[#eaeaea] animate-pulse"></span>
                </div>
              )}
              {!isLoading &&
                showOptionsAlumni &&
                usernames?.map((data, i) => {
                  return (
                    <React.Fragment key={data + i}>
                      {data?.about === "B.Tech" && (
                        <Link
                          key={i}
                          className={`flex items-left justify-start px-5 py-2 hover:bg-[#f3f3f3]  ${
                            router.asPath.includes(
                              `/team/${data?.username}`
                            ) === true
                              ? `bg-[#eaeaea]`
                              : ``
                          }`}
                          href={`/team/${data?.username}`}
                        >
                          <li className="h-[90%] w-full flex justify-between items-center ">
                            <span> {data?.fullname}</span>
                            <small className="text-gray-800 capitalize">
                              {data?.typeOfUser}
                            </small>
                          </li>
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
          </ul>
        </div>
        <div className="w-[80vw] mx-auto h-[100%]">
          <div className="flex flex-col h-[50vh] w-full relative">
            <div className="cover flex h-[calc(10vw+5rem)] w-full">
              <img
                src="https://www.iitr.ac.in/assets/56f4da26ed956730309fa1488611ee0f13b0ac95ebb1bc9b5d210e31ff70e79c_iitr175.jpg"
                className="h-full w-full object-cover"
                alt="back_img"
                draggable="false"
              />
            </div>
            <div className="wrapper flex gap-3 min-w-[calc(26vw+10rem)] h-[calc(12vw+4rem)] left-[13%] top-[20%] absolute bg-transparent">
              <div className="wrapper w-[calc(12vw+4rem)] h-[calc(12vw+4rem)] bg-slate-200">
                {isLoadingRight ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <CgSpinner className="animate-spin text-4xl" />
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={
                      user?.photo ||
                      "https://static.wixstatic.com/media/2c1c3e_e49ffc1dd0d94d3dbb56b1f745ac6b59~mv2.png/v1/fill/w_336,h_336,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/blank%20profile.png"
                    }
                    alt=""
                    draggable="false"
                  />
                )}
              </div>
              <div className="text-blue-500 mt-auto text-[calc(1vw+0.25rem)]">
                <div className="flex flex-row items-center">
                  <AiTwotoneMail className="font-semibold" />
                  <a
                    href={`mailto:${user?.email}`}
                    className="font-normal py-1 px-2"
                  >
                    {user?.email || "NA"}
                  </a>
                </div>
                <div className="flex flex-row items-center">
                  <BsFillTelephoneFill className="font-semibold " />
                  <h2 className="font-normal py-1 px-2">
                    {user?.phone || "NA"}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[95%] mx-auto">
            <div className="flex gap-10 text-xl">
              <span className="">Find : </span>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowOptions(!showOptions);
                  }}
                  className="capitalize text-xl flex w-[18rem] justify-center gap-5 py-1 item-center border-2"
                >
                  {selected}
                  {showOptions ? (
                    <SlArrowUp className="mt-[0.3rem]" />
                  ) : (
                    <SlArrowDown className="mt-[0.3rem]" />
                  )}
                </button>
                {showOptions && <Options />}
              </div>
            </div>
            <hr className="w-full h-[0.2px] mt-4 bg-slate-700" />
            <div className="content mt-5 overflow-y-auto h-[60vh]">
              {isLoadingRight ? (
                <span className="mt-5 mx-auto flex text-2xl items-center justify-center gap-2">
                  <CgSpinner className="animate-spin" />
                </span>
              ) : (
                renderComponent()
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Username;
