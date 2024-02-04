import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/bazar365_logo.png";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import AppContext from "../Context/AppContext";
import { useContext } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

// const Sublink = ({ title, to, setSelected }) => {
//   return (
//     <MenuItem onClick={() => setSelected(title)} className="sublink-item">
//       <Link to={to}>{title}</Link>
//     </MenuItem>
//   );
// };

// const ItemWithSublinks = ({ title, to, icon, selected, setSelected, sublinks }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [sublinksVisible, setSublinksVisible] = useState(false);

//   const toggleSublinks = () => {
//     setSublinksVisible(!sublinksVisible);
//   };

//   return (
//     <>
//       <MenuItem
//         active={selected === title}
//         style={{
//           color: colors.grey[100],
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//         onClick={() => {
//           toggleSublinks();
//           setSelected(title);
//         }}
//         icon={icon}
//       >

//         <Typography>
//           {title}
//         {sublinks && (
//           <IconButton className="sublink-toggle" onClick={toggleSublinks}>
//             {sublinksVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//           </IconButton>
//         )}
//         </Typography>

//         <Link to={to} />

//       </MenuItem>

//       {sublinksVisible && sublinks && sublinks.length > 0 && (
//         <Menu>
//           {sublinks.map((sublink, index) => (
//             <Sublink key={index} {...sublink} setSelected={setSelected} />
//           ))}
//         </Menu>

//       )}
//     </>
//   );
// };

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const { employee } = useContext(AppContext);
  // console.log("🚀 ~ SideBar ~ employee:", employee)

  if (!employee) {
    return null;
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          position: "fixed",
          width: "265px"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            // onClick={() => setIsCollapsed(!isCollapsed)}
            // icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            // style={{
            //   margin: "10px 0 20px 0",
            //   color: colors.grey[100],
            // }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {/* <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton> */}
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={ Logo }
                  // style={{ cursor: "pointer", borderRadius: "20%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color="green"
                  fontSize="25px"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {/* BAZAR365 */}
                </Typography>
                {/* <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography> */}
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>
            
            {/* <ItemWithSublinks
            title="Manage Team"
            // to="/Employees"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            sublinks={[
              {
                title: "All Employees",
                to: "/Employees",
              },
              {
                title: "Invite Employee",
                to: "/InviteEmployees",
              },
              // Add more sublinks as needed
            ]}
          /> */}
          <SubMenu
            title="Manage Team"
            // to="/Employees"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}>
           
            <Item 
              title="All Employees"
              to="/Employees"
              selected={selected}
              setSelected={setSelected}/> 
            <Item 
              title="Invite Employee"
              to="/InviteEmployees"
              selected={selected}
              setSelected={setSelected}/> 
          </SubMenu>
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;
