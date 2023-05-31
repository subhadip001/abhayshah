import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const Sidebar = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const username = auth.username;

  return (
    <>
      {router.asPath.includes("/dashboard") && (
        <div className="block w-[15%] h-[100vh] static">
          <div className="flex flex-col h-full bg-[#efefef]">
            <ul className="text-center flex flex-col gap-5 mt-5">
              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard" ? `underline` : ``
                }`}
                href={"/dashboard"}
              >
                User details
              </Link>
              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/leave-applications"
                    ? `underline`
                    : ``
                }`}
                href={"/dashboard/leave-applications"}
              >
                Leave Applications
              </Link>

              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/publicResources"
                    ? `underline`
                    : ``
                }`}
                href={"/dashboard/publicResources"}
              >
                All public Resources
              </Link>
              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/resources" ? `underline` : ``
                }`}
                href={"/dashboard/resources"}
              >
                My Resources
              </Link>
              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/filemanager" ? `underline` : ``
                }`}
                href={"/dashboard/filemanager"}
              >
                File Manager
              </Link>
              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/postmanager" ? `underline` : ``
                }`}
                href={"/dashboard/postmanager"}
              >
                Post Manager
              </Link>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
