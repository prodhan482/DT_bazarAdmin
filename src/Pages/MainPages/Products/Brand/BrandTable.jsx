// import Table from "../../../../Components/table/Table"
// import TableHeadingRow from "../../../../Components/table/TableHeadingRow"
// import TableHeading from "../../../../Components/table/TableHeading"
// import TextCell from "../../../../Components/table/TextCell"
// import ViewTableButton from "../../../../Components/table/ViewTableButton"
// import EditTableButton from "../../../../Components/table/EditTableButton"
// import DeleteTableButton from "../../../../Components/table/DeleteTableButton"
// import TableButtonCell from "../../../../Components/table/TableButtonCell"
// import TableRow from "../../../../Components/table/TableRow"
// import TableBody from "../../../../Components/table/TableBody"
// import ImageCell from "../../../../Components/table/ImageCell"
// import TableImage from "../../../../Components/table/TableImage"
// import ViewDetailsButton from "../../../../Components/common/ViewDetailsButton"
// import { useNavigate } from "react-router-dom";

// function BrandTable({

//   brand,
//   setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
//   setSelectedBrand,

// }) {
//   const navigate = useNavigate();
//   return (

//     <Table>

//       <TableHeadingRow>
//         <TableHeading text="Image" />
//         <TableHeading text="Name" />
//         {/* <TableHeading text="Link" /> */}
//         <TableHeading align={"text-right"} text="Action" />
//       </TableHeadingRow>

//       <TableBody>
//         {brand.map(brand => (
//           <TableRow key={brand._id} item={brand}>
//             <ImageCell>
//               <TableImage img={brand.image} />
//             </ImageCell>
//             <TextCell text={brand.name} />
//             {/* <TextCell text={brand.link} /> */}
//             <TableButtonCell>
//             <ViewDetailsButton
//             label="View Product"
//             onClick={() => navigate(`/ViewProductByBrand/${brand._id}`)}
           
//             />
//               <ViewTableButton
//                 onClick={() => {
//                   setSelectedBrand(brand)
//                   setIsViewModalOpen(true)
//                 }}
//               />
//               <EditTableButton
//                 onClick={() => {
//                   setSelectedBrand(brand)
//                   setIsEditModalOpen(true)
//                 }}
//               />
//               <DeleteTableButton
//                 onClick={() => {
//                   setSelectedBrand(brand)
//                   setIsDeleteModalOpen(true)
//                 }}
//               />
//             </TableButtonCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
    
//   )
// }

// export default BrandTable


// import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
// import { useNavigate } from 'react-router-dom';
// import React, { useMemo } from 'react';
import Table from "../../../../Components/table/Table";
import TableHeadingRow from "../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../Components/table/TableHeading";
import ViewTableButton from "../../../../Components/table/ViewTableButton";
import EditTableButton from "../../../../Components/table/EditTableButton";
import DeleteTableButton from "../../../../Components/table/DeleteTableButton";
import TableButtonCell from "../../../../Components/table/TableButtonCell";
import TableRow from "../../../../Components/table/TableRow";
import TableBody from "../../../../Components/table/TableBody";
import ImageCell from "../../../../Components/table/ImageCell";
import TableImage from "../../../../Components/table/TableImage";
import ViewDetailsButton from "../../../../Components/common/ViewDetailsButton";
import TextCell from "../../../../Components/table/TextCell";

import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { useNavigate } from "react-router-dom";


function BrandTable({
  brand,
  setIsViewModalOpen,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
  setSelectedBrand,
}) {
  const navigate = useNavigate();

  const [filterInput, setFilterInput] = useState("");

  // Define columns
  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell: { value } }) => <TableImage img={value} />,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Action",
        accessor: "_id",
        Cell: ({ cell: { value } }) => (
          
          <TableButtonCell>
            <ViewDetailsButton
              label="View Product"
              onClick={() => navigate(`/ViewProductByBrand/${value}`)}
            />
            <ViewTableButton
              onClick={() => {
                const selectedBrand = brand.find((b) => b._id === value);
                setSelectedBrand(selectedBrand);
                setIsViewModalOpen(true);
              }}
            />
            <EditTableButton
              onClick={() => {
                const selectedBrand = brand.find((b) => b._id === value);
                setSelectedBrand(selectedBrand);
                setIsEditModalOpen(true);
              }}
            />
            <DeleteTableButton
              onClick={() => {
                const selectedBrand = brand.find((b) => b._id === value);
                setSelectedBrand(selectedBrand);
                setIsDeleteModalOpen(true);
              }}
            />
          </TableButtonCell>
        ),
      },
    ],
    [brand, navigate, setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen, setSelectedBrand]
  );

  // Initialize the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data: brand,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="w-full">
      <div className="w-full">
        <input
          value={filterInput}
          onChange={(e) => {
            setFilterInput(e.target.value);
            setGlobalFilter(e.target.value);
          }}
          placeholder="Search..."
          className="border border-gray-300 rounded-md p-2 w-full"

        />
      </div>
      <table {...getTableProps()} className="w-full border  border-gray-300 rounded mt-2 ">
        <thead className="bg-gray-100 border-b border-gray-300 py-5">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="px-4 py-3" {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white " {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="px-4 py-3" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {Math.ceil(brand.length / pageSize)}
          </strong>{" "}
        </span>
        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "} */}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"Back"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {"Next"}
        </button>{" "}
        {/* <button onClick={() => gotoPage(Math.ceil(brand.length / pageSize) - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "} */}
      </div>
    </div>
  );
}

export default BrandTable;

