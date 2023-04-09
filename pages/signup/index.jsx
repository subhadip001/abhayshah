import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CgSpinner } from "react-icons/cg";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading , setIsLoading] = useState(false)

  const router = useRouter();

  const auth = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    if (password !== confirm) {
      console.log("confirm password doesnot match");
      return;
    }

    try {
      const res = await axios.post("https://abhayasha.onrender.com/signup", {
        username: username,
        fullname: fullname,
        email: email,
        password: password,
      });

      console.log(res);
      setIsLoading(false)
      router.push("/login");
    } catch (error) {
      setIsLoading(false)
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="h-[100vh] flex m-auto flex-col gap-2 justify-center my-auto">
        <form
          className="flex mx-auto w-[25rem] flex-col justify-around gap-5"
          onSubmit={handleSubmit}
        >
          <span className="text-[2.5rem] text-blue-500 w-[90%] mx-auto">
            Sign Up
          </span>
          <div className="flex flex-col justify-center gap-5 w-[90%] mx-auto">
            <div className="flex flex-col">
              <label htmlFor="username">Enrollment Number</label>
              <input
                type="text"
                id="username"
                placeholder="Type username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="inline-block outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                placeholder="Type your full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="inline-block outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Type email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="inline-block outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Type password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="inline-block outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                placeholder="Confirm password"
                value={confirm}
                required
                onChange={(e) => setConfirm(e.target.value)}
                className="inline-block outline-none leading-6 py-1 px-2 border border-gray-500 mt-1"
              />
            </div>
            <button
              className="bg-blue-500 h-10 text-white font-semibold"
              type="submit"
            >
              {isLoading ? (
                <CgSpinner className="text-xl animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          </div>
          <Link className="w-[90%] mx-auto" href="/login">
            Already user ? Sign in !
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
