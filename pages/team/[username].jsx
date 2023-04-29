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
import JournalPublications from "../../components/JournalPublications";
import ProfessionalBackground from "../../components/ProfessionalBackground";

const Username = () => {
  const router = useRouter();
  const username = router.query.username;
  const [user, setUser] = useState({});
  const [usernames, setUsernames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = useState("interest");

  const renderComponent = () => {
    switch (selected) {
      case "interest":
        return <AreaOfInterest />;
      case "education":
        return <EducationalDetails />;
      case "professional":
        return <ProfessionalBackground />;
      case "honors":
        return <HonorsAndAwards />;
      case "publications":
        return <JournalPublications />;
      default:
        return <AreaOfInterest />;
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
    <main className="w-[93%] mx-auto">
      <div className="h-[100vh]  mx-auto flex justify-center gap-5 items-center">
        <div className="w-[18%] h-[90%] bg-[#D4FCFF]">
          <ul className="text-center flex flex-col gap-2 w-[95%] mx-auto">
            {isLoading && <span className="">Loading...</span>}
            {!isLoading &&
              usernames?.map((data, i) => {
                return (
                  <div>
                    <Link
                      key={i}
                      className={`flex items-center justify-center ${
                        router.asPath === `/team/${data?.username}`
                          ? `underline`
                          : ``
                      }`}
                      href={`/team/${data?.username}`}
                    >
                      <li className="h-[calc(1.5rem+1.5vw)] flex justify-center items-center ">
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
            <Image
              src={Team}
              alt="Picture of the author"
              className="w-40 h-40"
            />
            <div className="px-10">
              <h1 className="text-3xl font-semibold py-2">Abhay Kumar Shah</h1>
              <h2 className="text-xl ">Assistant Professor</h2>
              <div className="py-3 text-blue-500">
                <div className="flex flex-row items-center">
                  <AiTwotoneMail className="text-xl font-semibold" />
                  <h2 className="text-xl font-normal py-1 px-2">
                    abhaysah[at]ece.iitr.ac.in
                  </h2>
                </div>
                <div className="flex flex-row items-center">
                  <BsFillTelephoneFill className="text-xl font-semibold " />
                  <h2 className="text-xl font-normal py-1 px-2">
                    01332-284943
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-row justify-between items-center pt-10 font-bold">
              <button
                className={`button ${
                  selected === "interest"
                    ? "bg-blue-300 px-8 py-2 rounded-md"
                    : "px-8 py-2"
                }`}
                onClick={() => setSelected("interest")}
              >
                Area of Interest
              </button>
              <button
                className={`button ${
                  selected === "education"
                    ? "bg-blue-300 px-8 py-2 rounded-md"
                    : "px-8 py-2"
                }`}
                onClick={() => setSelected("education")}
              >
                Educational Details
              </button>
              <button
                className={`button ${
                  selected === "professional"
                    ? "bg-blue-300 px-8 py-2 rounded"
                    : "px-8 py-2"
                }`}
                onClick={() => setSelected("professional")}
              >
                Professional Background
              </button>
              <button
                className={`button ${
                  selected === "honors"
                    ? "bg-blue-300 px-8 py-2 rounded-md"
                    : "px-8 py-2"
                }`}
                onClick={() => setSelected("honors")}
              >
                Honors and Awards
              </button>
              <button
                className={`${
                  selected === "publications"
                    ? "bg-blue-300 px-8 py-2 rounded-3xl"
                    : "px-8 py-2"
                }`}
                onClick={() => setSelected("publications")}
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
