import { URL_DB } from '../../../const/const';
import { useState, useEffect } from 'react';

export const fetchAllCourses = async () => {
    let data = null;

    try {
      //Recup TOKEN dans le local storage
      const token = localStorage.getItem('token');
      if (!token) return { valid: false };

        const response = await fetch(URL_DB + 'guest/getAllCourses', {
          method: 'GET',
          headers: {
                    'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.courses)
            data=data.courses;

        } else {
            console.error('Erreur lors de la récupération des prof');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des prof', error);
    }
    finally {
        return data
    }
};

export const fetchAllUser = async () => {
    let data = null;

    try {
      const token = localStorage.getItem('token');
      if (!token) return { valid: false };
        const response = await fetch(URL_DB + 'admin/getAllStudents', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.students)
            data=data.users;

        } else {
            console.error('Erreur lors de la récupération des prof');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des prof', error);
    }
    finally {
        return data
    }
};
export const fetchAllProf = async () => {
    let data = null;
    try {
      const token = localStorage.getItem('token');
      if (!token) return { valid: false };
        const response = await fetch(URL_DB + 'admin/getAllTeachers', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
            const data = await response.json();
            data=data.teachers;


        } else {
            console.error('Erreur lors de la récupération des prof');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des prof', error);
    }
    finally {
        return data
    }
};
export const fetchAllPayments = async () => {
    let data = null;
    try {
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };
        const response = await fetch(`${URL_DB}admin/getPayments?startDate=2024-01-06&endDate=2027-05-01`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const result = await response.json();
            data = result.payments;
        } else {
            console.error('Erreur lors de la récupération des paiements');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des paiements', error);
    }
    finally {
        return data;
    }
};

