import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { URL_DB } from '../const/const';

function Recherche() {
    const [searchQuery, setSearchQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${URL_DB}guest/getAllCourses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();

                if (Array.isArray(data.courses)) {
                    const parsedCourses = data.courses.map(course => {
                        return {
                            ...course,
                            tags: JSON.parse(course.tags.replace(/'/g, '"'))
                        };
                    });

                    setCourses(parsedCourses);
                    const allTags = Array.from(new Set(parsedCourses.flatMap(course => course.tags)));
                    setSuggestions(allTags);
                } else {
                    setErrorMessage('Invalid data format received from the server.');
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(`Error: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            setErrorMessage(`Network error: ${error.message}`);
        }
    };

    const handleSearch = () => {
        const filteredCourses = courses.filter(course =>
            course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        navigate('/results', { state: { searchResults: filteredCourses } });
    };

    return (
        <div className='searchCourses'>
            {/* <h2>Search Courses by Tags</h2> */}
            <Autocomplete
                freeSolo
                options={suggestions}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Entrer un tag pour rechercher des cours"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                )}
                onInputChange={(event, newInputValue) => {
                    setSearchQuery(newInputValue);
                }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
            <span class="material-symbols-outlined">
search
</span>
            </Button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default Recherche;
