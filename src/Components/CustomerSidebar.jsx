import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import DropArrow from "./Icons/DropArrow";
import DashboardIcon from "../Components/Icons/DashboardIcon";
import RequirementIcon from "../Components/Icons/RequirementIcon";
import EmployeeIcon from "../Components/Icons/EmployeeIcon";
import CatalogIcon from "../Components/Icons/Catalog";
import AddressIcon from "./Icons/AddressIcon";
import OrderIcon from "../Components/Icons/OrderIcon"; 
import AppContext from "../Context/AppContext";
import SideBar from "./SideBar";

function CustomerSideBar({ sidebarOpen, closeSidebar }) {
  const { employee } = useContext(AppContext);

  if (!employee) {
    return null;
  }

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isEmployeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const [isCustomerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [isCatalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [isProductListDropdownOpen, setProductListDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isDeliveryDropdownOpen, setDeliveryDropdownOpen] = useState(false);
  const [isAddressDropdownOpen, setAddressDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [isDropdownOpenGeneral, setDropdownOpenGeneral] = useState(false);
  const [isOrderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [isSalesDropdownOpen, setSalesDropdownOpen] = useState(false);
  const [isOrderListDropdownOpen, setOrderListDropdownOpen] = useState(false);

  return (
    
    <div className="sideBar bg-[#fffff] border-r-2 border-[#ECECEC] h-screen w-[250px] flex flex-col fixed left-0 z-50">
      {/* <Link className="h-[78px] border-b-2 border-[#ECECEC]" to="#">
        <img className="ml-8 logo w-[150px] h-[77px]" src={Logo} alt="" />
      </Link> */}
      <div className=" h-screen bg-gray-200 flex flex-col fixed left-[251px] z-50 h-3/5 w-[300px] mt-[-2px]">
      <div className="menu flex flex-col gap-4 ml-8 mt-6 mb-8">
        <h1 className=" my-2 text-lg font-semibold text-[#313649]">Customer Details</h1>
        <NavLink to={"/"}>
          <h1 className=" flex items-center gap-2 text font-semibold text-[#313649] bg-[rgba(62,161,117,0.3)] text-[#3ea175] text-[#2e4a66] font-semibold cursor-pointer mb-[0px] p-2 rounded-[10px] text-lg">
            {/* <DashboardIcon className="h-5 w-5" /> */}
            Dashboard
          </h1>
        </NavLink>


        <NavLink to={"/requirement"}>
          <h1 className="  flex items-center gap-2 text font-semibold text-[#313649] text-lg">
            {/* <RequirementIcon className="-ml-1 h-6 w-6" /> */}
            Requirement
          </h1>
        </NavLink>
      </div>
      </div>
    </div>

    
  );
}

export default CustomerSideBar;
