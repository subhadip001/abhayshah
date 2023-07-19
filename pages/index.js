import Head from "next/head";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

import Image from "next/image";
import HeroImage from "./../public/hero-image.jpg";

export default function Home() {
  const auth = useContext(AuthContext);
  const username = auth.username;
  const [problems, setProblems] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");

  const getProblems = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getProblems"
      );
      console.log(res.data);
      setProblems(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getNews = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getAllNews"
      );
      console.log(res.data);
      setNews(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getEvents = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://b60upcmqnc.execute-api.ap-south-1.amazonaws.com/prod/abhay/getAllEvents"
      );
      console.log(res.data);
      setEvents(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProblems();
    getNews();
    getEvents();
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

  function formatNewsDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "short" };
    const date = new Date(dateString);
    const formattedDay = date.toLocaleString("en-US", { day: "2-digit" });
    const formattedMonth = date.toLocaleString("en-US", { month: "short" });

    return (
      <>
        <div className="py-10">
          <h2 className="text-xl py-1">{formattedDay}</h2>
          <p className="text-lg font-bold">{formattedMonth}</p>
        </div>
      </>
    );
  }

  const CardSkeleton = () => {
    return (
      <div
        role="status"
        className="max-w-sm border-gray-200 shadow animate-pulse dark:border-gray-700 w-[25vw]"
      >
        <div className="flex items-center justify-center w-[25vw] h-80 mb-4 bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>

        <span className="sr-only">Loading...</span>
      </div>
    );
  };

  const Popup = ({ className }) => {
    return (
      <div>
        <div className={className}>
          <div className="bg-white p-8 w-[50vw]">
            <h2 className="text-lg font-bold mb-4">
              Why are you visiting this page?
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-gray-700">Name:</span>

                <input
                  className="form-textarea mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50  p-2"
                  rows="3"
                  placeholder="Enter your name"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Institution:</span>

                <input
                  className="form-textarea mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                  rows="3"
                  placeholder="Enter your institution"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Reason:</span>

                <textarea
                  className="form-textarea mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50  p-2"
                  rows="3"
                  placeholder="Enter your reason here"
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
                  className="bg-blue-500 text-white px-4 py-2"
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
      <main className="">
        <div className="py-20 flex flex-col gap-20 back-image">
          <h1 className="mx-auto w-[80%] text-4xl font-thin mt-1 text-center">
            WELCOME!
          </h1>
          <div className="flex bg-[#d2d2d22c] backdrop-blur-xs px-10 py-5 border-2 border-[#dcdcdc9c] mx-auto w-[80%] flex-row sm:flex-col items-center justify-between">
            <div className="">
              <Image src={HeroImage} alt="Hero Image" className="h-full" />
            </div>
            <div className="w-[70%]">
              <p className="text-4xl font-bold py-5">Abhay Kumar Sah</p>
              <p className="text-2xl">Assistant Professor</p>
              <p className="text-xl text-[#0E66C9] font-semibold">
                Department of Electronics & Communication Engineering, IIT
                Roorkee
              </p>

              <p className="py-10 font-semibold">
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
            <h1 className="text-[#191919] text-3xl font-bold">NEWS</h1>
            <div className="w-16 h-1 bg-blue-500 text pt-1">&nbsp;</div>
          </div>
          <div className="flex flex-row justify-between mt-10">
            {isLoading && <CardSkeleton />}
            {news?.map((data, i) => {
              return (
                <div key={i} className="bg-[#dfdfdf] w-[25vw]">
                  <img src={data?.photoLink} className="w-[25vw] h-80" />
                  <div className="py-5 w-80 px-5">
                    <p className="text-2xl font-bold">{data?.title}</p>
                    <p className="text-xl text-[#272727]">
                      {formatNewsDate(data?.dateOfNews)}
                    </p>
                    <p>{data?.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-32 py-20">
          <div>
            <h1 className="text-[#191919] text-3xl font-bold ">EVENTS</h1>
            <div className="w-16 h-1 bg-blue-500 text pt-1">&nbsp;</div>
          </div>
          <div>
            {events?.map((data, i) => {
              return (
                <div key={i} className="flex flex-row items-center">
                  {formatDate(data?.eventDate)}
                  <div className="px-12">
                    <h2 className="text-2xl font-bold">{data?.title}</h2>
                    <p className="py-1">{data?.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-32 pb-20">
          <div>
            <h1 className="text-[#191919] text-3xl font-bold">QUESTION</h1>
            <div className="w-16 h-1 bg-blue-500 text pt-1">&nbsp;</div>
          </div>
          <div className="my-10 mx-20">
            <h2 className="text-2xl font-bold pb-5 text-[#191919]">
              {problems[1]?.question}
            </h2>
            <input className="w-full bg-gray-200 border-blue-600 h-10 border active:border-green-600 px-2 "></input>
            <button className="h-10 bg-blue-500 px-20 my-10 hover:bg-blue-600 transition-all">
              Submit
            </button>
          </div>
        </div>
        {showPopup && (
          <Popup
            className={
              "fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
            }
          />
        )}
      </main>
    </>
  );
}
