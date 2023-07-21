import { useRouter } from "next/router";
import Footer from "./footer/Footer";
import NavBar from "./navBar/NavBar";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/store/AuthContext";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  // if (!auth.username) {
  //   if (typeof window !== "undefined") {
  //     if (router.asPath.includes("/dashboard")) {
  //       router.push("/");
  //     }
  //   }
  // }

  if (router.asPath === "/login" || router.asPath === "/signup") {
    return (
      <>
        <main>{children}</main>
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <main
          className={`w-full ${
            router.asPath.includes("/dashboard") ? `h-[90vh] flex` : ``
          }`}
        >
          <Sidebar />
          {children}
        </main>
        {router.asPath === "/" && <Footer />}
      </>
    );
  }
}
