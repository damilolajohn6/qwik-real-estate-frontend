"use client";

import React, { useEffect, useState } from "react";

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  reason: string;
  message: string;
  createdAt: string;
}

const AgentContactPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/admin/contacts");
        const data = await res.json();
        setContacts(data.contacts || []);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Submitted Contact Forms</h1>

      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <p>No contact submissions found.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white border p-4 rounded shadow-sm"
            >
              <div className="font-semibold text-lg text-red-500">
                {contact.firstName} {contact.lastName}
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
                <p>
                  <strong>Phone:</strong> {contact.phoneNumber || "N/A"}
                </p>
                <p>
                  <strong>Reason:</strong> {contact.reason}
                </p>
                <p>
                  <strong>Message:</strong> {contact.message}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Submitted on: {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentContactPage;
