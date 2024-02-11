// import avatar from "../../../assets/img/avatar.svg";
import AvaterImg from "../assets/avater.jpg"
import "../assets/css/profile-menu.css";
// import AppContext from "../../../Context/AppContext";
import AppContext from "../Context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import React, {useState, useEffect, useRef} from 'react';

import { useLevels } from "../Utils/useLevels";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { IconButton } from "@mui/material";

function ProfileMenu() {

  const [open, setOpen] = useState(false);

  const {logout} = useContext(AppContext)

  const { admin, cs, cx, executive, operationEmployee } = useLevels();

  const handleLogOut = () => {
    logout()
    navigate("/login")
  }
  
const navigate = useNavigate()

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <div className="App">
      <div ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          {/* <img width="30" src={AvaterImg}></img> */}
          <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        </div>

        <div className={`dropdown-menu ${open? 'activedropdown' : 'inactivedropdown'}`} >
          {/* <h3>The Kiet<br/><span>Website Designer</span></h3> */}
          <ul>
          <div className="dropdown-menu-text">
          {admin && (
            <DropdownItem text = {"Change Password"} onClick={() => navigate(`/ChangePassword`)} className="text-black"/>
            )}
            </div>
            {/* <DropdownItem text = {"Edit Profile"}/>
            <DropdownItem text = {"Settings"}/> */}
            <div className="logout">
            <DropdownItem text = {"Logout"} onClick={handleLogOut}/>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem' onClick={props.onClick}>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

export default ProfileMenu;