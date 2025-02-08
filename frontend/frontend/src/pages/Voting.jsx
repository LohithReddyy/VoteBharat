import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function Voting() {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState("");
  const [hasVoted, setHasVoted] = useState(null); // Set to `null` initially to prevent UI flicker
  const aadharNumber = localStorage.getItem("aadharNumber");

  // ✅ Define fetchParties function in the outer scope
  const fetchParties = async () => {
    try {
      const response = await fetch("https://votebharat.onrender.com/api/parties");
      const data = await response.json();
      setParties(data);
    } catch (error) {
      toast.error("Failed to fetch parties");
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("https://votebharat.onrender.com/user/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ aadharNumber }),
        });

        const data = await response.json();
        if (response.ok) {
          setHasVoted(data.hasVoted);
        } else {
          toast.error(data.message || "Failed to fetch user details");
        }
      } catch (error) {
        toast.error("Error fetching user details");
      }
    };

    if (aadharNumber) {
      fetchUserDetails();
    }
  }, [aadharNumber]);

  // ✅ Now fetchParties is accessible here
  useEffect(() => {
    if (hasVoted === false) {
      fetchParties();
    }
  }, [hasVoted]);

  const handleVote = async () => {
    if (!selectedParty || selectedParty.trim() === "") {
      toast.error("Please select a party");
      return;
    }

    try {
      const response = await fetch("https://votebharat.onrender.com/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadharNumber, partyId: selectedParty }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Vote cast successfully! Results will be declared soon.");
        setHasVoted(true);
      } else {
        toast.error(data.message || "Voting failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  if (hasVoted === null) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      {hasVoted ? (
        <div className="text-4xl text-green-600 font-semibold mt-24">
          <p>✅ Thanks for voting! Results will be announced soon.</p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-3xl mx-auto">
  <table className="table-auto w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-300 px-4 py-2">Select</th>
        <th className="border border-gray-300 px-4 py-2">Party</th>
        <th className="border border-gray-300 px-4 py-2">Logo</th>
      </tr>
    </thead>
    <tbody>
      {parties.map((party) => (
        <tr key={party._id} className="text-center">
          <td className="border border-gray-300 px-4 py-2">
            <input
              type="radio"
              name="party"
              value={party._id}
              onChange={(e) => setSelectedParty(e.target.value)}
              checked={selectedParty === party._id}
            />
          </td>
          <td className="border border-gray-300 px-4 py-2">{party.name}</td>
          <td className="border border-gray-300 px-4 py-2">
            <img
              src={`https://votebharat.onrender.com/${party.symbol}`}
              alt={`${party.name} Logo`}
              className="w-16 h-16 object-contain mx-auto"
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <button
    onClick={handleVote}
    className="mt-6 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
  >
    Submit Vote
  </button>
</div>

        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Voting;
