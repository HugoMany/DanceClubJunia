import React from 'react';

function Title({ firstPart, secondPart }) {
  return (
    <div>
      <h1 >
        <p style={{ color: '#FDD93B' }}>{firstPart}</p>
        <p style={{ color: 'white' }}>{secondPart}</p><br></br>
      </h1>
    </div>
  );
}

export default Title;
