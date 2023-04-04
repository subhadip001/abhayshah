import { AuthContext } from "@/store/AuthContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const Dashboard = () => {
    const router = useRouter();
    const auth = useContext(AuthContext);
    const [fullname, setFullname] = useState("")
    const [about, setAbout] = useState("")
    const [interest, setInterest] = useState("")

    if (!auth.username) {
        if (typeof window !== "undefined") {
            router.push("/");
        }
    }

    return (
        <section className="h-[100vh]">
            <form className='flex flex-col w-[50%] mx-auto'>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        placeholder="Enter full name"
                        onChange={(e) => { setFullname(e.target.value) }}
                    />
                    <input
                        type="text"
                        name="about"
                        id="about"
                        placeholder="Enter your experience/designation"
                        onChange={(e) => { setAbout(e.target.value) }}
                    />
                    <input
                        type="text"
                        name="interest"
                        id="interest"
                        placeholder="Enter your interest"
                        onChange={(e) => { setInterest(e.target.value) }}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </section>
    );
};

export default Dashboard;
