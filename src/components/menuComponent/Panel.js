import React from 'react';
import './Panel.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {SideBarMenu} from './SideBarMenu';


export function Panel (props){

    return (
      <div className="panelDiv">
        <CssBaseline />
        <AppBar className="panelAppBar">
         <Toolbar className="toolbarPanel">
           <SideBarMenu side="left" menuList={props.menuList} history={props.history} />
           <Typography variant="h6" noWrap>
             Advolang
           </Typography>
         </Toolbar>
       </AppBar>
      </div>
    );
}