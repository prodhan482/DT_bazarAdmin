// import { useEffect, useState } from "react";

// import Table from "../../../../Components/table/Table";
// import TableHeadingRow from "../../../../Components/table/TableHeadingRow";
// import TableHeading from "../../../../Components/table/TableHeading";
// import TextCell from "../../../../Components/table/TextCell";
// import TableButtonCell from "../../../../Components/table/TableButtonCell";
// import ViewTableButton from "../../../../Components/table/ViewTableButton";
// import EditTableButton from "../../../../Components/table/EditTableButton";
// import DeleteTableButton from "../../../../Components/table/DeleteTableButton";
// import TableImage from "../../../../Components/table/TableImage";
// import ImageCell from "../../../../Components/table/ImageCell";
// import TableBody from "../../../../Components/table/TableBody"
// import TableRow from "../../../../Components/table/TableRow"
// import ViewDetailsText from "../../../../Components/common/ViewDetailsText";
// import { useNavigate } from "react-router-dom";


// function ProductByCategoryTable({ 

//   category, 
//   setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
//   setSelectedCategory, 

// }) {
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(20);

//   const totalPages = Math.ceil(category.length / limit);
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;
//   const currentItems = category.slice(startIndex, endIndex);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const navigate = useNavigate();
  
//   return (
//     <div className="w-full "> 
//       <div className="overflow-x-scroll">
//     <Table>
      
//       <TableHeadingRow>
//         <TableHeading text="Image" />
//         <TableHeading text="Name" />
//         <TableHeading text="Precedence" />
//         {/* <TableHeading text="SQL Id" />
//         <TableHeading text="Product Count" />
//         <TableHeading text="Level" /> */}
//         <TableHeading text="Active" />
//         <TableHeading text="Discount" />
//         <TableHeading text="Discount Type" />
//         <TableHeading text="Discount Amount" />
//       </TableHeadingRow>
//       <TableBody>
//       {currentItems.map(category => (
//           <TableRow key={category._id} item={category}>
//             <ImageCell>
//               <TableImage img={category.image} />
//             </ImageCell>
//             <ViewDetailsText
//                 label={category.name}
//                 onClick={() =>  navigate(`/ViewProductByCategory/${category._id}`)}
//               />
//             <TextCell text={category.precedence} />
//             {/* <TextCell text={category.sqlId} />
//             <TextCell text={category.productCount} />
//             <TextCell text={category.level} /> */}
//             <TextCell text={`${category.isActive}`} />
//             <TextCell text={`${category.isDiscount}`} />
//             <TextCell text={category.discountType} />
//             <TextCell text={category.discountAmount} />
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//     </div>

//     <div className="flex justify-center items-center px-10 relative fixed">
//       {Array.from({ length: totalPages }).map((_, index) => (
//         <button
//           className={`${index + 1 === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
//             } py-2 px-4 rounded`}
//           onClick={() => handlePageChange(index + 1)}
//         >
//           {index + 1}
//         </button>
//       ))}
//        </div>
//     </div>

//   );
// }

// export default ProductByCategoryTable;


import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../Components/common/Header";
import { useTheme } from "@mui/material";
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
function ProductByCategoryTable({
  category,
  setIsEditModalOpen,
  setSelectedCustomer,
  setPage,
  page,
  setLimit,
  limit,
  columns
}) {
  const navigate = useNavigate();
  const { admin, cs, cx, executive, operationEmployee, marketing } = useLevels();

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
          rows={category}
          columns={columns} 
          components={{ Toolbar: GridToolbar }}
          className="custom-data-grid"
          style={{ overflowX: "auto" }}
        />
      </Box>
    </Box>
  );
}

export default ProductByCategoryTable;
