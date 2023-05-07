import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import iitr from "../../public/iitr.png";
import { AuthContext } from "@/store/AuthContext";

const NavBar = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  return (
    <div className="bg-white h-[13vh] flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center text-black text-xl gap-10 h-[12vh] justify-around">
        <Image
          className="scale-[0.5] ml-2 mt-3"
          src={iitr}
          alt={"iitr"}
          priority={true}
        />
        <Link
          className={`inline-block mt-7 hover:underline ${
            router.asPath === "/" ? `underline` : ``
          }`}
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={`inline-block mt-7 hover:underline ${
            router.asPath.includes("/team") ? `underline` : ``
          }`}
          href={"/team/admin"}
        >
          Team
        </Link>

        <Link
          className={`inline-block mt-7 hover:underline ${
            router.asPath === "/publications" ? `underline` : ``
          }`}
          href={"/publications"}
        >
          Publications
        </Link>
        <Link
          className={`inline-block mt-7 hover:underline ${
            router.asPath === "/research-projects" ? `underline` : ``
          }`}
          href={"/research-projects"}
        >
          Research Projects
        </Link>
        {auth.username !== null ? (
          <Link
            className={`inline-block mt-7 hover:underline ${
              router.asPath.includes("/dashboard") ? `underline` : ``
            }`}
            href={"/dashboard"}
          >
            Dashboard ({auth.username})
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="w-[10%]">
        {auth.token ? (
          <span
            className="bg-white mt-7 text-blue-500 text-[2vh] h-[35px] w-[55%] flex items-center justify-center font-semibold cursor-pointer"
            onClick={() => {
              auth.logout();
            }}
          >
            Log out
          </span>
        ) : (
          <Link
            className="bg-white mt-7 text-blue-500 text-[2vh] h-[35px] w-[55%] flex items-center justify-center font-semibold"
            href={"/login"}
          >
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
