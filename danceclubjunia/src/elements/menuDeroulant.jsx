import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IS_ADMIN, IS_CONNECT, IS_PROF } from "../const/const";
import { Link, redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { URL_DB } from '../const/const';





const MenuDeroulant = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isAdminVar, setIsAdmin] = useState(false);
  const [isTeacherVar, setIsTeacher] = useState(false);
  const [isConnectedVar, setIsConnected] = useState(false);



  useEffect(() => {
    testValidyAndTypeOfToken()
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  function testValidyAndTypeOfToken(redirect = true) {
    const token = localStorage.getItem('token');
    if (!token) return { valid: false };
    const url = `${URL_DB}auth/verifyToken`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Token is valid") {
          setIsConnected(true);
          if (data.userType === "admin") {
            console.log("Vous êtes bien un admin");
            setIsAdmin(true);
          }
          else if (data.userType === "teacher") {
            console.log("Vous êtes bien un prof");
            setIsTeacher(true);
          }
          else if (data.userType === "student") {
            console.log("Vous êtes bien un étudiant");
          }
          else {
            console.error("Vous n'êtes pas un utilisateur valide");
          }

        }
        else {
          setIsConnected(false);
          setIsAdmin(false);
          setIsTeacher(false);
          if (redirect) {
            window.location.replace("/connexion");
          }
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du token', error);
      });
  }



  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <button>
          {isConnectedVar ? (
            <span class="material-symbols-outlined">
              person
            </span>

          ) : (
            <span class="material-symbols-outlined">
              login
            </span>
          )}
        </button>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >

        {isAdminVar ? (
          [
            <MenuItem key="admin" onClick={handleClose} component={Link} to="/admin">Admin</MenuItem>

          ]
        ) : (
          [
          ]
        )}

        {isConnectedVar ? (
          [
            <MenuItem key="profile" onClick={handleClose} component={Link} to="/profil">Profile</MenuItem>,
            <MenuItem key="logout" onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
          ]
        ) : (
          [
            <MenuItem key="connexion" onClick={handleClose} component={Link} to="/connexion">Connexion</MenuItem>
          ]
        )}
        {(isTeacherVar||isAdminVar) ? (
          [
            <MenuItem key="prof" onClick={handleClose} component={Link} to="/prof">Prof</MenuItem>

          ]
        ) : (
          [

          ]
        )}
      </Menu>
    </div>
  );
};

export default MenuDeroulant;