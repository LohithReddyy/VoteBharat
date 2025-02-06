import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function Votes() {
  const [voteData, setVoteData] = useState([]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/votes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setVoteData(response.data.voteResults);
      } catch (error) {
        console.error("Error fetching vote data:", error);
      }
    };

    fetchVotes();
  }, []);

  const chartData = {
    labels: voteData.map((party) => party.name),
    datasets: [
      {
        label: "Total Votes",
        data: voteData.map((party) => party.voteCount),
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#E91E63"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Vote Analytics</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Bar data={chartData} />
      </div>

      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Vote Details</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Party Name</th>
              <th className="border border-gray-300 px-4 py-2">Symbol</th>
              <th className="border border-gray-300 px-4 py-2">Total Votes</th>
            </tr>
          </thead>
          <tbody>
            {voteData.map((party) => (
              <tr key={party.name} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{party.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={`http://localhost:5000/${party.symbol}`} alt={party.name} className="h-10 w-10 object-contain"/>
                </td>
                <td className="border border-gray-300 px-4 py-2">{party.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Votes;
