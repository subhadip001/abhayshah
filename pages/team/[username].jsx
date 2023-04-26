import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Username = ({ users }) => {
  const router = useRouter();
  const username = router.query.username;
  const [user, setUser] = useState({});
  const [usernames, setUsernames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="w-[18%] h-[90%] bg-[#f0f0f077]">
          <ul className="text-center flex flex-col gap-2 w-[95%] mx-auto">
            {usernames?.map((data, i) => {
              return (
                <Link
                  key={i}
                  className={`flex items-center justify-center border-2 ${
                    router.asPath === `/team/${data?.username}`
                      ? `bg-[#5c97f7bb] text-white`
                      : ``
                  }`}
                  href={`/team/${data?.username}`}
                >
                  <li className="h-[calc(1.5rem+1.5vw)] flex justify-center items-center ">
                    <span> {data?.fullname}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        {isLoading ? (
          <div className="w-[75%] mx-auto h-[90%]">
            <div className="h-[30%] relative">
              <div className="block w-[calc(8vw+10rem)] animate-pulse h-[calc(8vw+10rem)] top-[calc(3.5rem-1.5vw)] left-14 bg-[#CECECE] absolute z-30"></div>
            </div>
            <div className="h-[70%] animate-pulse bg-[#E7E7E7]"></div>
          </div>
        ) : (
          <div className="w-[75%] mx-auto h-[90%]">
            <div className="h-[30%] relative">
              {user?.fullname}
              <div className="block w-[calc(8vw+10rem)] aspect-square top-[calc(3.5rem-1.5vw)] left-14 bg-[#CECECE] absolute z-30">
                <img
                  src={user?.photo}
                  loading="lazy"
                  className="object-cover aspect-square w-full"
                  alt=""
                />
              </div>
            </div>
            <div className="h-[70%] bg-[#E7E7E7]">Descriptions</div>
          </div>
        )}
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
