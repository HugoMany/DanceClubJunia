import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IS_ADMIN, IS_CONNECT, IS_PROF } from "../const/const";
import { Link, redirect } from 'react-router-dom';
import AdminRequire from './adminRequire';
import React, { useState, useEffect } from 'react';
import TeacherRequire from './teacherRequire';
import isConnected from './isConnected';

const MenuDeroulant = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isConnectedVar, setIsConnected] = useState(false);



  useEffect(() => {
    AdminRequire(false).then(setIsAdmin);
    TeacherRequire(false).then(setIsTeacher);
    isConnected(false).then(setIsConnected);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        {
          isAdmin && <MenuItem key="admin" onClick={handleClose} component={Link} to="/admin">Admin</MenuItem>
        }
       
         {isConnectedVar ? (
            [
                <MenuItem key="profile" onClick={handleClose} component={Link} to="/profil">Profile</MenuItem>,
                <MenuItem key="logout" onClick={handleClose} component={Link} to="/connexion">Logout</MenuItem>
            ]
        ) : (
            [
                <MenuItem key="connexion" onClick={handleClose} component={Link} to="/connexion">Connexion</MenuItem>
            ]
        )}
        {
        isTeacher && <MenuItem key="prof" onClick={handleClose} component={Link} to="/prof">Prof</MenuItem>}
      </Menu>
    </div>
  );
};

export default MenuDeroulant;