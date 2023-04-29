import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Team = ({ users }) => {
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="w-[93%] mx-auto">
      <div className="h-[150vh]  mx-auto flex justify-center gap-5 items-center">
        <div className="w-[18%] h-[90%] bg-[#D4FCFF]">
          <ul className="text-center flex flex-col gap-2 w-[95%] mx-auto">
            <li className="h-[100%] flex justify-center items-center ">
              Abhay Shah (Proff)
            </li>
            {users.map((data, i) => {
              return (
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
              );
            })}
            {isLoading && <li>Loading...</li>}
          </ul>
        </div>
        <div className="w-[75%] mx-auto h-[110%]"></div>
      </div>
    </main>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { id: "20118091" } },
//       { params: { id: "20118092" } },
//       { params: { id: "20118092" } },
//     ],
//     fallback: false, // can also be true or 'blocking'
//   };
// }

export async function getStaticProps() {
  const res = await axios.get("https://abhayasha.onrender.com/userfullnames");
  const users = await res.data;
  console.log(users);
  return {
    props: {
      users,
    },
  };
}

export default Team;
