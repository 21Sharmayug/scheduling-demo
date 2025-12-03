"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "next/navigation";  
export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("General");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [msg, setMsg] = useState("");

  const router = useRouter(); 

  async function submit(e: any) {
    e.preventDefault();
    setMsg("Submitting...");

    try {
      await addDoc(collection(db, "appointments"), {
        id: nanoid(),
        name,
        phone,
        department,
        date,
        time,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setMsg("Appointment submitted successfully!");
      setName("");
      setPhone("");
      setDepartment("General");
      setDate("");
      setTime("10:00 AM");
    } catch (err) {
      console.error(err);
      setMsg("Error occurred!");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold text-center mb-4">Book Appointment</h1>

        <form onSubmit={submit} className="space-y-4">

          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Department 1</option>
            <option>Department 2</option>
            <option>Department 3</option>
            <option>Department 4</option>
            <option>Department 5</option>
            <option>Department 6</option>
          </select>

          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>09:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>02:00 PM</option>
            <option>04:00 PM</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {msg && <p className="mt-4 text-center text-green-600">{msg}</p>}

        <button
          type="button"
          onClick={() => router.push("/employee")}
          className="w-full bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-800 transition mt-6"
        >
          Go to Employee Dashboard
        </button>

      </div>
    </div>
  );
}
