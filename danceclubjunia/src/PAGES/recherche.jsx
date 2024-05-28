import React, { useState } from 'react';
import axios from 'axios';

// Liste de tous les tags possibles pour l'autocomplétion.
const listeDeTags = ['danse', 'yoga', 'peinture', 'cuisine', 'programmation', /* ... */];

function Recherche() {
  const [tag, setTag] = useState('');
  const [resultats, setResultats] = useState([]);

  const handleChange = async (event) => {
    setTag(event.target.value);

    if (event.target.value !== '') {
      try {
        const response = await axios.get(`https://your-api-url/courses?tag=${event.target.value}`);
        setResultats(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setResultats([]);
    }
  };

  return (
    <div>
      <input type="text" value={tag} onChange={handleChange} list="tags" />
      <datalist id="tags">
        {listeDeTags.map((tag, index) => (
          <option key={index} value={tag} />
        ))}
      </datalist>
      {resultats.map((resultat, index) => (
        <div key={index}>{resultat}</div>
      ))}
    </div>
  );
}

export default Recherche;