import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Parties() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    // Fetch parties from backend
    const fetchParties = async () => {
      try {
        const response = await fetch('/api/parties');
        const data = await response.json();
        setParties(data);
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch parties', 'error');
      }
    };

    fetchParties();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-6">Political Parties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parties.map(party => (
          <div 
            key={party.id} 
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">{party.name}</h2>
            <p className="mb-4">{party.description}</p>
            <img 
              src={party.logo} 
              alt={`${party.name} Logo`} 
              className="w-32 h-32 object-contain mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Parties;