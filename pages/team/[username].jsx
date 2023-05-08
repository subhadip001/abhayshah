import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Team from "./../../public/imageteam.png";

import { AiTwotoneMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";

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

const Username = () => {
  const router = useRouter();
  const username = router.query.username;
  const [user, setUser] = useState({});
  const [usernames, setUsernames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [photo, setPhoto] = useState("");
  const [profession, setProfession] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [area, setArea] = useState("");
  const [educational, setEducational] = useState("");

  const [selected, setSelected] = useState("interest");

  const renderComponent = () => {
    switch (selected) {
      case "interest":
        return <AreaOfInterest data={user?.areaOfInterest} />;
      case "professional":
        return <ProfessionalBackground data={user?.profession} />;
      case "honors":
        return <HonorsAndAwards data={user?.honors} />;
      case "educational":
        return <EducationalDetails data={user?.education} />;
      case "adnmistrative":
        return <Adminstrative data={user?.administrative} />;
      case "sponsored":
        return <Sponsored data={user?.research} />;
      // case "publications":
      //   return <JournalPublications data={user?.research} />;
      case "memberships":
        return <Membership data={user?.memberships} />;
      case "teching":
        return <Teaching data={user?.teaching} />;
      case "phd":
        return <Phd data={user?.phdsupervision} />;
      case "participate":
        return <ShortTerm data={user?.shortterm} />;
      case "special":
        return <Special data={user?.special} />;
      case "participation":
        return <Seminars data={user?.seminars} />;
      case "journal":
        return <Journal data={user?.journal} />;
      default:
        return <AreaOfInterest data={user.areaOfInterest} />;
    }
  };

  const getUsernames = async () => {
    try {
      const res = await axios.get(
        "https://abhayasha.onrender.com/userfullnames"
      );
      const users = res.data;
      setUsernames(res.data);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsernames();
  }, []);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://abhayasha.onrender.com/userdetails/${username}`
      );
      //console.log(res.data);
      setUser(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [username]);

  return (
    <main className="w-[93%]">
      <div className="h-[120vh]  flex justify-center gap-5 items-center">
        <div className="w-[20%] h-[120vh] bg-blue-100">
          <ul className="text-left flex flex-col gap-2 w-[95%] mx-auto">
            {isLoading && <span className="px-10 pt-4">Loading...</span>}
            {!isLoading &&
              usernames?.map((data, i) => {
                return (
                  <div>
                    <Link
                      key={i}
                      className={`flex items-left justify-start px-10 pt-4 ${
                        router.asPath === `/team/${data?.username}`
                          ? `underline`
                          : ``
                      }`}
                      href={`/team/${data?.username}`}
                    >
                      <li className="h-[90%] flex justify-center items-center ">
                        <span> {data?.fullname}</span>
                      </li>
                    </Link>
                  </div>
                );
              })}
          </ul>
        </div>
        <div className="w-[75%] mx-auto h-[90%]">
          {/*<div className="h-[30%] relative">
            {user?.fullname}
            <div className="block w-[calc(8vw+10rem)] h-[calc(8vw+10rem)] top-[calc(3.5rem-1.5vw)] left-14 bg-[#CECECE] absolute z-30">
              {user?.username}
            </div>
          </div>
            <div className="h-[70%] bg-[#E7E7E7]">Descriptions</div>*/}
          <div className="flex flex-row">
            <div className="pb-5">
              <Image
                src={user?.photo}
                alt="Picture of the author"
                className="w-40 h-40 rounded-2xl"
                width={160} // Set the width in pixels (40 * 4)
                height={160} // Set the height in pixels (40 * 4)
              />
            </div>
            <div className="px-10">
              <h1 className="text-3xl font-semibold py-2">
                {" "}
                {user?.fullname}{" "}
              </h1>
              <h2 className="text-xl ">{user?.about}</h2>
              <div className="py-3 text-blue-500">
                <div className="flex flex-row items-center">
                  <AiTwotoneMail className="text-xl font-semibold" />
                  <h2 className="text-xl font-normal py-1 px-2">
                    {user?.email}
                  </h2>
                </div>
                <div className="flex flex-row items-center">
                  <BsFillTelephoneFill className="text-xl font-semibold " />
                  <h2 className="text-xl font-normal py-1 px-2">
                    {user?.phone}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-row justify-between items-center pt-2 text-blue-800">
              <button
                className={`button ${
                  selected === "interest"
                    ? "bg-blue-100 px-3 py-1"
                    : "py-1 px-3"
                }`}
                onClick={() => setSelected("interest")}
              >
                Area of Interest
              </button>
              <button
                className={`button ${
                  selected === "professional"
                    ? "bg-blue-100 px-3 py-1"
                    : "py-1 px-3"
                }`}
                onClick={() => setSelected("professional")}
              >
                Professional Background
              </button>
              <button
                className={`button ${
                  selected === "honors" ? "bg-blue-100 px-3 py-1" : "py-1 px-3"
                }`}
                onClick={() => setSelected("honors")}
              >
                Honors and Awards
              </button>
              <button
                className={`${
                  selected === "educational"
                    ? "bg-blue-100 px-3 py-1"
                    : "py-1 px-3"
                }`}
                onClick={() => setSelected("educational")}
              >
                Educational Details
              </button>
              <button
                className={`button ${
                  selected === "adnmistrative"
                    ? "bg-blue-100 px-3 py-1"
                    : "py-1 px-3"
                }`}
                onClick={() => setSelected("adnmistrative")}
              >
                Adminstrative Background
              </button>
            </div>
            <div className="flex flex-row justify-between items-center pt-2 text-blue-800">
              <button
                className={`button ${
                  selected === "sponsored"
                    ? "bg-blue-100 px-3 py-1"
                    : "px-3 py-1"
                }`}
                onClick={() => setSelected("sponsored")}
              >
                Sponsored Research Projects
              </button>
              <button
                className={`button ${
                  selected === "memberships"
                    ? "bg-blue-100 px-3 py-1"
                    : "px-3 py-1"
                }`}
                onClick={() => setSelected("memberships")}
              >
                Memberships
              </button>

              <button
                className={`${
                  selected === "teching" ? "bg-blue-100 px-3 py-1" : "px-3 py-1"
                }`}
                onClick={() => setSelected("teching")}
              >
                Teching Engagements
              </button>
              <button
                className={`button ${
                  selected === "phd" ? "bg-blue-100 px-3 py-1" : "px-3 py-1"
                }`}
                onClick={() => setSelected("phd")}
              >
                PhDs Supervised
              </button>
              <button
                className={`button ${
                  selected === "participate"
                    ? "bg-blue-100 px-3  py-1"
                    : "px-3 py-1"
                }`}
                onClick={() => setSelected("participate")}
              >
                Participate in Short term Courses
              </button>
            </div>
            <div className="flex flex-row justify-start items-start pt-2 text-blue-800">
              <button
                className={`${
                  selected === "special" ? "bg-blue-100 px-3 py-1" : "py-1 px-3"
                }`}
                onClick={() => setSelected("special")}
              >
                Special Lectures Delivered
              </button>
              <button
                className={`${
                  selected === "participation"
                    ? "bg-blue-100 px-3 py-1 mx-6"
                    : "py-1 px-3 mx-6"
                }`}
                onClick={() => setSelected("participation")}
              >
                Participation in Seminars
              </button>
              <button
                className={`${
                  selected === "journal" ? "bg-blue-100 px-3 py-1" : "px-3 py-1"
                }`}
                onClick={() => setSelected("journal")}
              >
                Journal Publications
              </button>
            </div>
            <div className="w-full h-[0.2px] mt-4 bg-slate-700"></div>
            <div className="content mt-5">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

// export async function getStaticPaths() {
//   if (process.env.SKIP_BUILD_STATIC_GENERATION) {
//     return {
//       paths: [],
//       fallback: "false",
//     };
//   }

//   const res = await axios.get("https://abhayasha.onrender.com/userfullnames");
//   const users = await res.data;

//   const paths = users.map((user) => ({
//     params: { username: user.username },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps() {
//   const res = await axios.get("https://abhayasha.onrender.com/userfullnames");
//   const users = await res.data;
//   console.log(users);
//   return {
//     props: {
//       users,
//     },
//   };
// }

export default Username;
