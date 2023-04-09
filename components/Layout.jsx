import { useRouter } from "next/router";
import Footer from "./footer/Footer";
import NavBar from "./navBar/NavBar";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/store/AuthContext";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const router = useRouter();
  const auth = useContext(AuthContext);

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
            router.asPath.includes("/dashboard") ? `flex` : ``
          }`}
        >
          <Sidebar />
          {children}
        </main>
        {!router.asPath.includes("/dashboard") && <Footer />}
      </>
    );
  }
}
