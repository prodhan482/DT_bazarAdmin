// // import Table from "../../../../Components/table/Table"
// // import TableHeadingRow from "../../../../Components/table/TableHeadingRow"
// // import TableHeading from "../../../../Components/table/TableHeading"
// // import TextCell from "../../../../Components/table/TextCell"
// // import ImageCell from "../../../../Components/table/ImageCell"
// // import TableImage from "../../../../Components/table/TableImage"
// // import TableBody from "../../../../Components/table/TableBody"
// // import TableRow from "../../../../Components/table/TableRow"
// // import EditTableButton from "../../../../Components/table/EditTableButton"
// // import { Box } from "@mui/material";
// // import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// // import { tokens } from "../../../../theme";
// // // import { mockDataContacts } from "../../data/mockData";
// // import Header from "../../../../Components/common/Header";
// // import { useTheme } from "@mui/material";

// // function EmployeeView({ 
// //   items,
// //   setIsEditModalOpen,
// //   setSelectedItem
// // }) {

// //   const theme = useTheme();
// //   const colors = tokens(theme.palette.mode);

// //   const columns = [
// //     { field: "id", headerName: "ID", flex: 0.5 },
// //     { field: "registrarId", headerName: "Registrar ID" },
// //     {
// //       field: "name",
// //       headerName: "Name",
// //       flex: 1,
// //       cellClassName: "name-column--cell",
// //     },
// //     {
// //       field: "age",
// //       headerName: "Age",
// //       type: "number",
// //       headerAlign: "left",
// //       align: "left",
// //     },
// //     {
// //       field: "phone",
// //       headerName: "Phone Number",
// //       flex: 1,
// //     },
// //     {
// //       field: "email",
// //       headerName: "Email",
// //       flex: 1,
// //     },
// //     {
// //       field: "address",
// //       headerName: "Address",
// //       flex: 1,
// //     },
// //     {
// //       field: "city",
// //       headerName: "City",
// //       flex: 1,
// //     },
// //     {
// //       field: "zipCode",
// //       headerName: "Zip Code",
// //       flex: 1,
// //     },
// //   ];

// //   return (
// //     <Box m="20px">
// //       <Header
// //         subtitle="List of Employess for Future Reference"
// //       />
// //       <Box
// //         m="40px 0 0 0"
// //         height="75vh"
// //         sx={{
// //           "& .MuiDataGrid-root": {
// //             border: "none",
// //           },
// //           "& .MuiDataGrid-cell": {
// //             borderBottom: "none",
// //           },
// //           "& .name-column--cell": {
// //             color: colors.greenAccent[300],
// //           },
// //           "& .MuiDataGrid-columnHeaders": {
// //             backgroundColor: colors.blueAccent[700],
// //             borderBottom: "none",
// //           },
// //           "& .MuiDataGrid-virtualScroller": {
// //             backgroundColor: colors.primary[400],
// //           },
// //           "& .MuiDataGrid-footerContainer": {
// //             borderTop: "none",
// //             backgroundColor: colors.blueAccent[700],
// //           },
// //           "& .MuiCheckbox-root": {
// //             color: `${colors.greenAccent[200]} !important`,
// //           },
// //           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
// //             color: `${colors.grey[100]} !important`,
// //           },
// //         }}
// //       >
// //     {/* <DataGrid>
// //       <TableHeadingRow>
// //         <TableHeading text="Name" />
// //         <TableHeading text="Email" />
// //         <TableHeading text="Image" />
// //         <TableHeading text="Level" />
// //         <TableHeading align={"text-right"} text="Action" />
// //       </TableHeadingRow>
// //       <TableBody>
// //         {items.map((item) => (
// //           <TableRow key={item._id} item={items} className="border-t border-grey-300">
// //             <TextCell text={item.name} />
// //             <TextCell text={item.email} />
// //             <ImageCell>
// //               <TableImage img={item.image}/>
// //             </ImageCell>
// //             <TextCell text={item.level} />
// //             <EditTableButton
// //                 onClick={() => {
// //                   setSelectedItem(item)
// //                   setIsEditModalOpen(true)
// //                 }}
// //                 />
// //           </TableRow>

// //         ))}
// //       </TableBody>
// //     </DataGrid> */}
// //     <DataGrid
// //           rows={items}
// //           columns={columns}
// //           components={{ Toolbar: GridToolbar }}
// //         />
// //     </Box>
// //     </Box>
// //   )
// // }

// // export default EmployeeView


// import React, { useState, useEffect } from 'react';
// import { Box } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../../../theme";
// import Header from "../../../../Components/common/Header";
// import { useTheme } from "@mui/material";

// function EmployeeView({ 
//   setIsEditModalOpen,
//   setSelectedItem
// }) {

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Fetch data from your API endpoint
//     const fetchData = async () => {
//       try {
//         // const response = await fetch('your_api_endpoint');
//         const data = await response.json();
//         setItems(data); // Set the fetched data to the state
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData(); // Call the function to fetch data when the component mounts
//   }, []);

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "registrarId", headerName: "Registrar ID" },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       field: "phone",
//       headerName: "Phone Number",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "address",
//       headerName: "Address",
//       flex: 1,
//     },
//     {
//       field: "city",
//       headerName: "City",
//       flex: 1,
//     },
//     {
//       field: "zipCode",
//       headerName: "Zip Code",
//       flex: 1,
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header
//         subtitle="List of Employees for Future Reference"
//       />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={items}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
//         />
//       </Box>
//     </Box>
//   )
// }

// export default EmployeeView;








import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../Components/common/Header";
import { useTheme } from "@mui/material";
import { getItems } from "./employeeService"; // Import your service function
import TableImage from "../../../../Components/table/TableImage";

function EmployeeView({ 
  setIsEditModalOpen,
  setSelectedItem
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItems(); // Fetch data using your service function
        // Map the response data to the format expected by the DataGrid
        const mappedData = response.map(item => ({
          id: item._id,
          image: item.image,
          name: item.name,
          age: item.age,
          email: item.email,
          phone: item.phone,
          address: item.address,
          city: item.city,
          zipCode: item.zipCode,
        }));
        setItems(mappedData); // Set the mapped data to the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1.5 },
    {
      field: "image",
      headerName: "Image",
      flex: 1.5,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          <TableImage img={params.value} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "zipCode", headerName: "Zip Code", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header subtitle="List of Employees for Future Reference" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={items}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          className="custom-data-grid"
        />
      </Box>
    </Box>
  );
}

export default EmployeeView;
