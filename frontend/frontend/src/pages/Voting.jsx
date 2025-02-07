import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Voting() {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await fetch('/api/parties');
        const data = await response.json();
        setParties(data);
      } catch (error) {
        toast.error('Failed to fetch parties');
      }
    };

    fetchParties();
  }, []);

  const handleVote = async () => {
    if (!selectedParty) {
      toast.error('Please select a party');
      return;
    }

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({ partyId: selectedParty })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Vote cast successfully! Results will be declared soon.');
      } else {
        toast.error(data.message || 'Voting failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-6">Cast Your Vote</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parties.map(party => (
          <div 
            key={party.id} 
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer 
              ${selectedParty === party.id ? 'border-4 border-blue-500' : ''}`}
            onClick={() => setSelectedParty(party.id)}
          >
            <h2 className="text-xl font-bold mb-4">{party.name}</h2>
            <img 
              src={party.logo} 
              alt={`${party.name} Logo`} 
              className="w-32 h-32 object-contain mx-auto"
            />
          </div>
        ))}
      </div>
      <button 
        onClick={handleVote}
        className="mt-6 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Submit Vote
      </button>
      <ToastContainer />
    </div>
  );
}

export default Voting;