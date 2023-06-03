import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Team = ({ users }) => {
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.push("/team/admin");
    return;
  }, []);

  return <></>;
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

export default Team;
