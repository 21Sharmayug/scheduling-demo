"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc as docRef,
  updateDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Appointment {
  id: string;
  name: string;
  phone: string;
  department: string;
  date: string;
  time: string;
  status: string;
}

export default function EmployeePanel() {
  const [pending, setPending] = useState<Appointment[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "appointments"),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Appointment[] = [];

      snapshot.forEach((d: QueryDocumentSnapshot<DocumentData>) => {
        const data = d.data();

        list.push({
          id: d.id,
          name: data.name ?? "",
          phone: data.phone ?? "",
          department: data.department ?? "",
          date: data.date ?? "",
          time: data.time ?? "",
          status: data.status ?? "",
        });
      });

      setPending(list);
    });

    return () => unsubscribe();
  }, []);

  async function accept(app: Appointment) {
    await updateDoc(docRef(db, "appointments", app.id), {
      status: "accepted",
    });

    const message = `Your appointment for ${app.department} on ${app.date} at ${app.time} has been confirmed.`;
    window.open(
      `https://wa.me/${app.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
        message
      )}`
    );
  }

  async function reject(app: Appointment) {
    await updateDoc(docRef(db, "appointments", app.id), {
      status: "rejected",
    });

    const message = `Sorry! Your appointment for ${app.department} on ${app.date} at ${app.time} is unavailable.`;
    window.open(
      `https://wa.me/${app.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
        message
      )}`
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Pending Appointments
      </h1>

      {pending.length === 0 && (
        <p className="text-center text-gray-600">No pending appointments.</p>
      )}

      <div className="grid gap-4 max-w-lg mx-auto">
        {pending.map((app) => (
          <div
            key={app.id}
            className="bg-white shadow-md p-5 rounded-lg border"
          >
            <p className="text-lg font-semibold">{app.name}</p>
            <p className="text-gray-700">{app.phone}</p>
            <p className="text-sm mt-1">Department: {app.department}</p>
            <p className="text-sm">Date: {app.date}</p>
            <p className="text-sm">Time: {app.time}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => accept(app)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded-md"
              >
                Accept
              </button>
              <button
                onClick={() => reject(app)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
