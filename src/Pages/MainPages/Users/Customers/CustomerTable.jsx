
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../Components/common/Header";
import { useTheme } from "@mui/material";
import { getItems } from "./customerService"; // Import your service function
import TableImage from "../../../../Components/table/TableImage";
import EditTableButton from "../../../../Components/table/EditTableButton"
import Table from "../../../../Components/table/Table";
import TableHeadingRow from "../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../Components/table/TableHeading";
import TextCell from "../../../../Components/table/TextCell";
import TableButtonCell from "../../../../Components/table/TableButtonCell";
import ViewTableButton from "../../../../Components/table/ViewTableButton";
import TableBody from "../../../../Components/table/TableBody";
import TableRow from "../../../../Components/table/TableRow";
import ViewDetailsButton from "../../../../Components/common/ViewDetailsButton";
import { useNavigate } from "react-router-dom";
import { useLevels } from "../../../../Utils/useLevels";
function CustomerTable({
  customers,
  setIsEditModalOpen,
  setSelectedCustomer,
  setPage,
  page,
  setLimit,
  limit,
  columns
}) {
  const navigate = useNavigate();
  const { admin, cs, cx, executive, operationEmployee, marketing } =
    useLevels();

  const handleNextPageChange = () => {
    setPage(page + 1);
  };

  const handlePreviousPageChange = () => {
    setPage(page - 1);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState([]);

  
  return (
    <Box m="0px">
      <Header 
      subtitle="List of Employees for Future Reference" 
      />
      <Box
      m="40px 0 0 0"
      height="75vh"

      width="150vh"
      overflowX="scroll"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          // width:  "1000px",
          // marginLeft: "265px",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          // color: `${colors.black} !important`,
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.greenAccent[600],
          borderBottom: "none",
          fontSize: "14px"
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.greenAccent[600],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
      >

          <DataGrid
          rows={customers}
          columns={columns} // Use columns prop
          components={{ Toolbar: GridToolbar }}
          className="custom-data-grid"
          style={{ overflowX: "auto" }}
        />
      </Box>
    </Box>
  );
}

export default CustomerTable;
