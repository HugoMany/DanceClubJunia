import React, { useState } from 'react';

const API_URL = 'http://90.110.227.143/api/teacher/searchStudent';

const GetStudentID = ({ setUserID }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const searchStudent = async () => {
    try {
      const response = await fetch(`${API_URL}?firstname=${firstName}&surname=${lastName}`);
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
    </div>
  );
};

export default GetStudentID;
