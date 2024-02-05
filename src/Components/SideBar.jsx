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

import AdjustIcon from '@mui/icons-material/Adjust';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import SettingsIcon from '@mui/icons-material/Settings';
import WebIcon from '@mui/icons-material/Web';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
          width: "280px"
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
                  src={Logo}
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
                setSelected={setSelected} />
              <Item
                title="Invite Employee"
                to="/InviteEmployees"
                selected={selected}
                setSelected={setSelected} />
            </SubMenu>

            <SubMenu
              title="Customers"
              // to="/Employees"
              icon={<PeopleAltIcon />}
              selected={selected}
              setSelected={setSelected}>

              <Item
                title="All Customers"
                to="/Customers"
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Leader Customer"
                to="/ViewLeaderCustomerByPlasticPoints"
                selected={selected}
                setSelected={setSelected} />
            </SubMenu>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Catalog
            </Typography>

            <SubMenu
              title="Product List"
              // to="/Employees"
              icon={<ProductionQuantityLimitsIcon />}
              selected={selected}
              setSelected={setSelected}>
              <Item
                title="All Product"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Product By Category"
                to="/InviteEmployees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Product By Sub-Category"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Brand"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Quick Ads"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
            </SubMenu>

            <SubMenu
              title="Category"
              // to="/Employees"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}>

              <Item
                title="All Category"
                to="/Employees"
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Featured Category"
                to="/InviteEmployees"
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Sub-Category"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Sub Sub-Category"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
            </SubMenu>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Sales
            </Typography>

            <SubMenu
              title="Order Information"
              // to="/Employees"
              icon={<AttachMoneyIcon />}
              selected={selected}
              setSelected={setSelected}>
              <Item
                title="Order List"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Pending Order List"
                to="/InviteEmployees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Processing Order List"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Ready for Delivery Order List"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Delivered Order List"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Canceled Order List"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
            </SubMenu>

            <SubMenu
              title="Delivery Information"
              // to="/Employees"
              icon={<DeliveryDiningIcon />}
              selected={selected}
              setSelected={setSelected}>
              <Item
                title="Delivery Area"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Delivery Zone"
                to="/InviteEmployees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Delivery Fee"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Delivery Slot"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
            </SubMenu>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Settings
            </Typography>

            <SubMenu
              title="Settings"
              // to="/Employees"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}>
              <Item
                title="Package"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Package Product"
                to="/InviteEmployees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Promo Code"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Promo Code Type"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Promo Code by Number"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Payment Type"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Plastic Type"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
            </SubMenu>

            <SubMenu
              title="Address"
              // to="/Employees"
              icon={<LocationOnIcon />}
              selected={selected}
              setSelected={setSelected}>
              <Item
                title="Division"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="District"
                to="/InviteEmployees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Area"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
            </SubMenu>

            <SubMenu
              title="Website Content"
              // to="/Employees"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}>
              <Item
                title="Home Slider"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Home Banner"
                to="/InviteEmployees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="App Setting"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Offer Card"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="FAQ"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Social Link"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Terms And Condition"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Promotion FAQ"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Promotion Card"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Achievement"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Article"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Footer Information"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Scroll Text"
                to="/Employees"
                // icon={<AdjustIcon fontSize="small" />}
                selected={selected}
                setSelected={setSelected} />
            </SubMenu>

            <Item
              title="Requirement"
              to="/InviteEmployees"
              icon={<FileCopyIcon />}
              selected={selected}
              setSelected={setSelected} />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;
