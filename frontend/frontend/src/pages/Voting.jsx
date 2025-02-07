import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Voting() {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(""); // Ensure this holds a valid ID
  const [hasVoted, setHasVoted] = useState(false);
  const [userName, setUserName] = useState("");
  const aadharNumber = localStorage.getItem("aadharNumber");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ aadharNumber }),
        });

        const data = await response.json();
        if (response.ok) {
          setHasVoted(data.hasVoted);
          setUserName(data.name);
        } else {
          toast.error(data.message || "Failed to fetch user details");
        }
      } catch (error) {
        toast.error("Error fetching user details");
      }
    };

    const fetchParties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/parties");
        const data = await response.json();
        setParties(data);
      } catch (error) {
        toast.error("Failed to fetch parties");
      }
    };

    if (aadharNumber) {
      fetchUserDetails();
    }
    fetchParties();
  }, [aadharNumber]);

  const handleVote = async () => {
    if (!selectedParty || selectedParty.trim() === "") {
      toast.error("Please select a party");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadharNumber, partyId: selectedParty }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Vote cast successfully! Results will be declared soon.");
        setHasVoted(true);
      } else {
        toast.error(data.message || "Voting failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-6">Welcome, {userName || "Voter"}!</h1>

      {hasVoted ? (
        <div className="text-center text-lg text-green-600 font-semibold">
          <p>✅ Thanks for voting! Results will be announced soon.</p>
        </div>
      ) : (
        <>
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
                      src={`http://localhost:5000/${party.symbol}`}
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
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Voting;
