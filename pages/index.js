import Head from "next/head";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

import Image from "next/image";
import HeroImage from "./../public/hero-image.png";
import NewsImage from "./../public/news.png";

export default function Home() {
  const auth = useContext(AuthContext);
  const username = auth.username;
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const getProblems = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://abhayasha.onrender.com/getProblems");
      console.log(res.data);
      setProblems(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProblems();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("visited", "true");
    setShowPopup(false);
  };

  const handleClose = () => {
    localStorage.setItem("visited", "true");
    setShowPopup(false);
  };

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) {
      setShowPopup(true);
    }
  }, []);

  const Popup = ({ className }) => {
    return (
      <div>
        <div className={className}>
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">
              Why are you visiting this page?
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-gray-700">Reason:</span>
                <textarea
                  className="form-textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows="3"
                  placeholder="Enter your reason here"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                ></textarea>
              </label>
              <div className="flex justify-end">
                <button
                  className="mr-4 text-gray-600 hover:text-gray-800 font-medium"
                  type="button"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white rounded-lg px-4 py-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Abhay Shah | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="px-28 py-10">
          <div className="flex flex-row">
            <Image src={HeroImage} alt="Hero Image" className="" />
            <div className="px-20">
              <h1 className="text-4xl font-thin mt-10">WELCOME!</h1>
              <p className="text-4xl font-bold py-5">Abhay Kumar Sah</p>
              <p className="text-2xl">Assistant Professor</p>
              <p className="text-xl text-[#0E66C9]">
                Department of Electronics & Communication Engineering, IIT
                Roorkee
              </p>

              <p className="py-10">
                I joined the department in March 2020. Prior to that, I was a
                Lead Architect at Radisys India Pvt. Ltd. Bangalore. I obtained
                my Ph.D. from the Electrical Department at Indian Institute of
                Technology Kanpur in 2017. My interests are broadly in the areas
                of Wireless Communication, 5G and beyond Systems, Next
                Generation Massive MIMO Systems, Intelligent Wireless Systems,
                Applications of AI and Deep Learning{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="py-20 px-32">
          <div>
            <h1 className="text-[#191919] text-3xl font-bold ">NEWS</h1>
            <div className="w-16 h-1 bg-blue-500 text pt-1">&nbsp;</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="mt-10 rounded-2xl shadow-2xl bg-[#dfdfdf]">
              <Image src={NewsImage} className="w-80 h-80 rounded-t-2xl" />
              <div className="py-5 w-80 px-5">
                <p className="text-2xl font-bold">Internal Meeting</p>
                <p className="text-xl text-[#272727]">10 Feb, 2023</p>
                <p>
                  We are working with Semiconductor Research Corporation (SRC)
                  on Machine Learning augmented Compact Models.
                </p>
              </div>
            </div>
            <div className="mt-10 rounded-2xl shadow-2xl bg-[#dfdfdf]">
              <Image src={NewsImage} className="w-80 h-80 rounded-t-2xl" />
              <div className="py-5 w-80 px-5">
                <p className="text-2xl font-bold">Internal Meeting</p>
                <p className="text-xl text-[#272727]">10 Feb, 2023</p>
                <p>
                  We are working with Semiconductor Research Corporation (SRC)
                  on Machine Learning augmented Compact Models.
                </p>
              </div>
            </div>
            <div className="mt-10 rounded-2xl shadow-2xl bg-[#dfdfdf]">
              <Image src={NewsImage} className="w-80 h-80 rounded-t-2xl" />
              <div className="py-5 w-80 px-5">
                <p className="text-2xl font-bold">Internal Meeting</p>
                <p className="text-xl text-[#272727]">10 Feb, 2023</p>
                <p>
                  We are working with Semiconductor Research Corporation (SRC)
                  on Machine Learning augmented Compact Models.
                </p>
              </div>
            </div>
            <div className="mt-10 rounded-2xl shadow-2xl bg-[#dfdfdf]">
              <Image src={NewsImage} className="w-80 h-80 rounded-t-2xl" />
              <div className="py-5 w-80 px-5">
                <p className="text-2xl font-bold">Internal Meeting</p>
                <p className="text-xl text-[#272727]">10 Feb, 2023</p>
                <p>
                  We are working with Semiconductor Research Corporation (SRC)
                  on Machine Learning augmented Compact Models.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-32 py-20">
          <div>
            <h1 className="text-[#191919] text-3xl font-bold ">EVENTS</h1>
            <div className="w-16 h-1 bg-blue-500 text pt-1">&nbsp;</div>
          </div>
          <div>
            <div className="flex flex-row items-center">
              <div className="py-10">
                <h2 className="text-xl py-1">14</h2>
                <p className="text-lg font-bold">MAR</p>
              </div>
              <div className="px-12">
                <h2 className="text-2xl font-bold">Short Term Course</h2>
                <p className="py-1">
                  Training on Remote Sensing and GIS Technology for
                  Environmental Monitoring, Planning and Management Under the
                  aegis of Continuing Education Centre.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="py-10">
                <h2 className="text-xl py-1">14</h2>
                <p className="text-lg font-bold">MAR</p>
              </div>
              <div className="px-12">
                <h2 className="text-2xl font-bold">Short Term Course</h2>
                <p className="py-1">
                  Training on Remote Sensing and GIS Technology for
                  Environmental Monitoring, Planning and Management Under the
                  aegis of Continuing Education Centre.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="py-10">
                <h2 className="text-xl py-1">14</h2>
                <p className="text-lg font-bold">MAR</p>
              </div>
              <div className="px-12">
                <h2 className="text-2xl font-bold">Short Term Course</h2>
                <p className="py-1">
                  Training on Remote Sensing and GIS Technology for
                  Environmental Monitoring, Planning and Management Under the
                  aegis of Continuing Education Centre.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="py-10">
                <h2 className="text-xl py-1">14</h2>
                <p className="text-lg font-bold">MAR</p>
              </div>
              <div className="px-12">
                <h2 className="text-2xl font-bold">Short Term Course</h2>
                <p className="py-1">
                  Training on Remote Sensing and GIS Technology for
                  Environmental Monitoring, Planning and Management Under the
                  aegis of Continuing Education Centre.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-32 pb-20">
          <div>
            <h1 className="text-[#191919] text-3xl font-bold">QUESTION</h1>
            <div className="w-16 h-1 bg-blue-500 text pt-1">&nbsp;</div>
          </div>
          <div className="my-10 mx-20">
            <h2 className="text-2xl font-bold pb-5 text-[#191919]">
              What is your department?
            </h2>
            <input className="w-full bg-gray-200 border-blue-600 h-10 border rounded-lg active:border-green-600 px-2 "></input>
            <button className="h-10 bg-blue-500 px-20 my-10 rounded-lg hover:bg-blue-600 transition-all">
              Submit
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
