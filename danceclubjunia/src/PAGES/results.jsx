import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../elements/header';
import '../css/admin.css';
import { Button, Card, CardContent, Typography } from '@mui/material';
import '../css/resultat.css';

function Results() {
    const location = useLocation();
    const { searchResults } = location.state || { searchResults: [] };

    return (
        <div className="coursesList">
            <Header></Header>
            <h3>Search Results</h3>
            {searchResults.length > 0 ? (
                <div>
                    {searchResults.map((course, index) => (
                        <div className='resultCase' key={index}>
                            <a href={"cours/" + course.courseID}>
                                <Card sx={{ marginBottom: 2 }}>
                                    <CardContent>
                                        <Typography variant="h5">{course.title}</Typography>
                                        <Typography color="textSecondary">
                                            Start Date: {new Date(course.startDate).toLocaleDateString()}
                                        </Typography>
                                        <Typography color="textSecondary">Location: {course.location}</Typography>
                                        <Typography color="textSecondary">Tags: {course.tags.join(', ')}</Typography>
                                    </CardContent>
                                </Card>
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No courses found with the given tags.</p>
            )}
        </div>
    );
}

export default Results;
