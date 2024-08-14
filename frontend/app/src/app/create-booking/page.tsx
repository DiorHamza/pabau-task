"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface BookingFormData {
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

export default function NewBooking() {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    service: "",
    doctor_name: "",
    start_time: "",
    end_time: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://host.docker.internal:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);

      if (response.ok) {
        alert("Booking inserted successfully!");
        router.push("/"); 
      } else {
        alert("Failed to insert booking.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">New Booking</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Service</label>
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Doctor Name</label>
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">End Time</label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}