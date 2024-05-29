import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>My App</h1>
      <ul>
        {data.map(user => (
          <li key={user.userID}>{user.firstname} {user.surname}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
