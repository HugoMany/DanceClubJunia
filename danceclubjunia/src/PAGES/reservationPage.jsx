import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../elements/header';

function ReservationPage() {
  const [course, setCourse] = useState(null);
  const [studentId, setStudentId] = useState(''); // State pour stocker l'ID de l'étudiant
  const [isReserved, setIsReserved] = useState(false); // State pour suivre si la réservation a été effectuée

  // Fonction pour gérer la réservation d'un étudiant sur un cours
  const reserveCourse = async () => {
    try {
      // Effectuer la requête API pour réserver l'étudiant sur le cours
      const response = await axios.post('/api/reserve-course', {
        courseId: course.courseId,
        studentId: studentId
      });
      // Vérifier si la réservation a été réussie
      if (response.status === 200) {
        setIsReserved(true);
      } else {
        // Gérer les erreurs de réservation
        console.error('Erreur lors de la réservation');
      }
    } catch (error) {
      // Gérer les erreurs de requête API
      console.error('Erreur lors de la requête API', error);
    }
  };

  // Fonction pour charger les détails du cours depuis l'API
  const loadCourseDetails = async () => {
    try {
      // Effectuer la requête API pour obtenir les détails du cours
      const response = await axios.get('/api/course-details');
      // Mettre à jour l'état du cours avec les données de l'API
      setCourse(response.data);
    } catch (error) {
      // Gérer les erreurs de requête API
      console.error('Erreur lors de la requête API', error);
    }
  };

  // Effectuer le chargement initial des détails du cours au montage du composant
  useEffect(() => {
    loadCourseDetails();
  }, []);

  // Afficher un message de confirmation une fois que la réservation a été effectuée avec succès
  const reservationConfirmation = isReserved ? <p>Réservation effectuée avec succès !</p> : null;

  // Afficher les détails du cours et le bouton de réservation
  return (
    <div>
      <Header title="Reservation"></Header>
      {course && (
        <div>
          <h2>{course.title}</h2>
          <p>Type: {course.type}</p>
          <p>Duration: {course.duration}</p>
          {/* Afficher d'autres détails du cours si nécessaire */}
          <input type="text" placeholder="Entrez votre ID étudiant" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <button onClick={reserveCourse}>Réserver</button>
          {reservationConfirmation}
        </div>
      )}
    </div>
  );
}

export default ReservationPage;
