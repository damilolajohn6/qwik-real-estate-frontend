"use client";

import React, { useRef } from "react";

const GetInTouchForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);

    const data = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      phoneNumber: form.get("phoneNumber"),
      reason: form.get("reason"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");

      alert("Message sent successfully!");

      formRef.current?.reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 md:p-12 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4 leading-tight">
          Start the Conversation That Moves You Forward
        </h2>
        <p className="text-gray-700 mb-10 text-base sm:text-lg">
          Whether you&apos;re ready to make a move or just exploring your
          options, our team is here to listen, guide, and deliver. Let us know
          how we can help you take the next step with confidence.
        </p>

        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full border-b border-gray-300 focus:border-red-500 focus:outline-none py-3 text-lg placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full border-b border-gray-300 focus:border-red-500 focus:outline-none py-3 text-lg placeholder-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className="w-full border-b border-gray-300 focus:border-red-500 focus:outline-none py-3 text-lg placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number (Optional)"
                className="w-full border-b border-gray-300 focus:border-red-500 focus:outline-none py-3 text-lg placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              id="reason"
              name="reason"
              placeholder="Reason"
              required
              className="w-full border-b border-gray-300 focus:border-red-500 focus:outline-none py-3 text-lg placeholder-gray-500"
            />
          </div>

          <div>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows={4}
              required
              className="w-full border-b border-gray-300 focus:border-red-500 focus:outline-none py-3 text-lg resize-none placeholder-gray-500"
            ></textarea>
          </div>

          <div className="flex justify-end sm:justify-start">
            <button
              type="submit"
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
            >
              Let&apos;s Connect
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default GetInTouchForm;
