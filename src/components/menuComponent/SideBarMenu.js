import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './SideBarMenu.css';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {MenuItemsList} from './MenuItemsList';
import {List, ListItem, ListItemIcon, ListItemText, Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';

export function SideBarMenu (props){

  let user = JSON.parse(localStorage.getItem('user'));

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/login");
  }

  const list = (anchor) => (
    <div
      className={anchor === 'top' || anchor === 'bottom' ? "upDownMenuDiv":"sideMenuDiv"}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
        <ListItem button key="userInfo">
          <Box className="avatarProfileImageBox">
            <Avatar  alt="Remy Sharp" src={user.profileImage}  style={{width: 48, height: 48, backgroundColor: "#f3f3f3" }} />
          </Box>
          <ListItemText
            className = "userProfileData"
            primary={user.firstName + " " +user.lastName}
            secondary={user.firstName.email}
          />
        </ListItem>
      </List>

      <Divider />

      <div className="menuItemsDiv">
        <List>
          <MenuItemsList itemslist={props.menuList} history={props.history} />
        </List>
      </div>

      <Divider />

      <div className="logoutDiv">
        <List>
        <Box className="logoutText" onClick={handleLogout}>
          <ListItemIcon><ExitToAppIcon /> Logout</ListItemIcon>
        </Box>
      </List>
      </div>

    </div>
  );

  const menuSide=props.side;

  return(

    <div>
      <React.Fragment key={menuSide}>
        <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer(menuSide, true)} edge="start">
          <MenuIcon />
        </IconButton>

        <SwipeableDrawer
          anchor={menuSide}
          open={state[menuSide]}
          onClose={toggleDrawer(menuSide, false)}
          onOpen={toggleDrawer(menuSide, true)}
        >
          {list(menuSide)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );

}
