import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory} from "react-router-dom";
import { ChildFriendly } from "@mui/icons-material";


const Header = ({ children, hasHiddenAuthButtons }) => {
   const history= useHistory();
   const res=localStorage.getItem("username")
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        <Stack direction="row" spacing={2}>
          {hasHiddenAuthButtons &&
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={()=>history.push("/")}
        >
          Back to explore
        </Button>}
        {!res && !hasHiddenAuthButtons 
        && (<><Button variant="text" onClick={()=>history.push('/login')}>LOGIN</Button>
           <Button variant="contained" onClick={()=>history.push('/register')}>REGISTER</Button>
            </>)}
         {res && !hasHiddenAuthButtons 
         && (<><Avatar alt={res} src="avatar.png" >{res}</Avatar>
         <p className="username-text">{res}</p>
         <Button variant="contained" onClick={()=>{localStorage.clear();window.location.reload()}}>LOGOUT</Button>
         </>)}   
        </Stack>
      </Box>
    );
};

export default Header;
