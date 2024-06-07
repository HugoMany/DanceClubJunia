import React, { useState } from 'react';

const API_URL = 'http://90.110.227.143/api/teacher/searchStudent';

const GetStudentID = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userID, setUserID] = useState(null);

  const searchStudent = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };
      const response = await fetch(`${API_URL}?firstname=${firstName}&surname=${lastName}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        
    });
      const data = await response.json();
      if (data.success && data.students.length > 0) {
        setUserID(data.students[0].userID);
      } else {
        setUserID(null);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={searchStudent}>Search</button>
      {userID && <p>User ID: {userID}</p>}
    </div>
  );
};

export default GetStudentID;
