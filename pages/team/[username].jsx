import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Username = () => {
  const router = useRouter();
  const username = router.query.username;
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserList = async () => {
    console.log("working team");
    setIsLoading(true);
    try {
      const res = await axios.get("https://abhayasha.onrender.com/userdetails");
      //console.log(res.data);
      setUserList(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="h-[100vh] flex mx-auto">
      <div className="w-[15%] bg-[#D4FCFF]">
        <ul className="text-center">
          {userList.map((data, i) => {
            return (
              <li
                key={i}
                className="h-[calc(1.5rem+1.5vw)] flex items-center justify-center"
              >
                <Link
                  className={`inline-block ${
                    router.asPath === `/team/${data.username}`
                      ? `underline`
                      : ``
                  }`}
                  href={`/team/${data.username}`}
                >
                  {data.fullname}
                </Link>
              </li>
            );
          })}
          {isLoading && <li>Loading...</li>}
        </ul>
      </div>
      <div className="w-[85%]">
        <div className="h-[30%] relative">
          {username}
          <div className="block w-[calc(8vw+10rem)] h-[calc(8vw+10rem)] top-[calc(3.5rem-1.5vw)] left-14 bg-[#CECECE] absolute z-30">
            pp
          </div>
        </div>
        <div className="h-[70%] bg-[#E7E7E7]">lower</div>
      </div>
    </div>
  );
};

export default Username;
