import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  userData: [],
  getList: () => {},
});

const UserContextProvider = (props) => {
  const [userData, setUserData] = useState([]);

  const getList = async () => {
    try {
      const res = await axios.get(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/userdetails"
      );
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        getList: getList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
