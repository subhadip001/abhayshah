import { AuthContext } from "@/store/AuthContext";
import axiosClient, { axiosClientDev } from "@/utils/axiosClient";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AllUserManager = () => {
  const auth = useContext(AuthContext);
  const username = auth.username;
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const buttonClass =
    "flex justify-center ml-auto items-center w-[10vw] bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-3 rounded font-semibold";

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.post("/getUserdetailsForAdmin", {
        username,
      });
      console.log(res.data);
      setUsers(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="h-[85vh] w-[85%] overflow-y-auto">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl">All Users</span>

        <div className="flex flex-col gap-10">
          {isLoading ? (
            <div className="flex justify-center items-center">
              
                <span className="sr-only">Loading...</span>
              
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {users?.map((user) => (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2 border-2 px-5 py-3">
                    <span className="text-2xl font-semibold">{user.fullname} ({user.username})</span>
                    <span className="text-lg">{user.password}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUserManager;
