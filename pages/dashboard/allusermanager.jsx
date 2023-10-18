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


    const DeleteButton = ({ entryId }) => {
      const handleDelete = async () => {
        console.log(entryId)
          try {
              const response = await axiosClient.post('/deleteuser', { 
                id: entryId 
              });
              console.log(entryId)
              if (response.data.success) { 
                  alert('Entry deleted successfully!');
              } else { 
                  alert('Error deleting entry');
              }
          } catch (error) {
              console.error('Error connecting to the server', error); 
              alert('Error connecting to the server');
          }
      };
  
      return (
          <button onClick={handleDelete} className="flex justify-center ml-auto items-center w-[10vw] bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-3 rounded font-semibold">Delete User</button>
      );
  };

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
                <div className="flex flex-col gap-5  border-2 px-5 py-3">
                  <div className="flex flex-col gap-2 ">
                    <span className="text-2xl font-semibold">{user?.fullname} ({user?.username})</span>
                    <span className="text-lg">{user?.password}</span>
                  </div>
                  <DeleteButton entryId={user?.username} />
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
