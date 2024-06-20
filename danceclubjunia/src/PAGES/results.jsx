import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const { searchResults } = location.state || { searchResults: [] };

    return (
        <div className="coursesList">
            <h3>Search Results</h3>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((course, index) => (
                        <a key={index} href = {"cours/"+ course.courseID} >
                            <h4>{course.title}</h4>
                            <p>{course.description}</p>
                            <p>Tags: {course.tags.join(', ')}</p>
                        </a>
                    ))}
                </ul>
            ) : (
                <p>No courses found with the given tags.</p>
            )}
        </div>
    );
}

export default Results;
