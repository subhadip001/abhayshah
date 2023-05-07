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
        <div className="block w-[15%] h-[100vh]">
          <div className="flex flex-col h-[100vh] bg-[#efefef]">
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
                  router.asPath === "/dashboard/filemanager" ? `underline` : ``
                }`}
                href={"/dashboard/filemanager"}
              >
                Honors
              </Link>
              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/education" ? `underline` : ``
                }`}
                href={"/dashboard/education"}
              >
                Education
              </Link>
              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/profession" ? `underline` : ``
                }`}
                href={"/dashboard/profession"}
              >
                Profession
              </Link>
              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/administrative"
                    ? `underline`
                    : ``
                }`}
                href={"/dashboard/administrative"}
              >
                Administrative
              </Link>
              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/research" ? `underline` : ``
                }`}
                href={"/dashboard/research"}
              >
                Research
              </Link>

              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/teaching" ? `underline` : ``
                }`}
                href={"/dashboard/teaching"}
              >
                Teaching
              </Link>

              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/phds" ? `underline` : ``
                }`}
                href={"/dashboard/phds"}
              >
                PHD Supervision
              </Link>

              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/short" ? `underline` : ``
                }`}
                href={"/dashboard/short"}
              >
                Short Term Courses
              </Link>

              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/lectures" ? `underline` : ``
                }`}
                href={"/dashboard/lectures"}
              >
                Special Lectures
              </Link>

              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/seminars" ? `underline` : ``
                }`}
                href={"/dashboard/seminars"}
              >
                Seminars
              </Link>

              <Link
                className={`inline-block ${
                  router.asPath === "/dashboard/journal" ? `underline` : ``
                }`}
                href={"/dashboard/journal"}
              >
                Journal
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

              {username === "admin" && (
                <Link
                  className={`inline-block ${
                    router.asPath === "/dashboard/postmanager"
                      ? `underline`
                      : ``
                  }`}
                  href={"/dashboard/postmanager"}
                >
                  Profession
                </Link>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
