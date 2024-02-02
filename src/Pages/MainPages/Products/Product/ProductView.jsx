// import { useEffect, useState } from "react";

// import Table from "../../../../Components/table/Table";
// import TableHeadingRow from "../../../../Components/table/TableHeadingRow";
// import TableHeading from "../../../../Components/table/TableHeading";
// import TextCell from "../../../../Components/table/TextCell";
// import TableButtonCell from "../../../../Components/table/TableButtonCell";
// import ViewTableButton from "../../../../Components/table/ViewTableButton";
// import EditTableButton from "../../../../Components/table/EditTableButton";
// import DeleteTableButton from "../../../../Components/table/DeleteTableButton";
// import TableBody from "../../../../Components/table/TableBody";
// import TableRow from "../../../../Components/table/TableRow";
// import ImageCell from "../../../../Components/table/ImageCell";
// import TableImage from "../../../../Components/table/TableImage";

// import { useLevels } from "../../../../Utils/useLevels";

// import { getAllItems } from "./productService";

// import { useNavigate } from "react-router-dom";

// function ProductView({
//   data,
//   onView,
//   onEdit,
//   onDelete,
//   setPage,
//   page,
//   setLimit,
//   limit,
// }) {
//   // const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await getAllItems(page, limit);
//   //       setData(response);
//   //     } catch (error) {}
//   //   };

//   //   fetchData();
//   // }, [page, limit]);

//   // const totalPages = Math.ceil(data.length / limit);
//   // const startIndex = (page - 1) * limit;
//   // const endIndex = startIndex + limit;
//   // const currentItems = data?.data?.slice(startIndex, endIndex);

//   const { admin, cs, cx, executive, operationEmployee } = useLevels();

//   const navigate = useNavigate();

//   const handleNextPageChange = () => {
//     setPage(page + 1);
//   };
//   const handlePreviousPageChange = () => {
//     setPage(page - 1);
//   };

//   return (
//     <div className="w-full ">
//       <div className="overflow-x-scroll">
//       <Table>
//         <TableHeadingRow>
//           <TableHeading text="Image" />
//           <TableHeading text="Name" />
//           <TableHeading text="SKU" />
//           <TableHeading text="Price" />
//           <TableHeading text="QUANTITY" />
//           <TableHeading text="Product Weight" />
//           {/* <TableHeading text="Precedence" />
//           <TableHeading text="Brand" />         
//           <TableHeading text="Category" />
//           <TableHeading text="Sub Category" /> */}
//           {/* <TableHeading text="Sub Sub Category" /> */}
//           {/* <TableHeading text="Description" /> */}
//           <TableHeading text="Visibility" />
//           <TableHeading text="Plastic" />
//           {/* <TableHeading text="Plastic Type" /> */}
//           <TableHeading text="Plastic Weight" />
//           {/* <TableHeading text="Discount Status" /> */}
//           {/* <TableHeading text="Discount Type" /> */}
//           {/* <TableHeading text="Discount Amount" />
//           <TableHeading text="Discounted Amount" /> */}
//           {/* <TableHeading text="BOGO" />
//           <TableHeading text="Employee" /> */}
//           {(admin || cs || cx || executive) && (
//           <TableHeading align={'text-right' } text="Action" />
//           )}
//         </TableHeadingRow>
//         <TableBody>
//           {currentItems.map((e) => (
//             <TableRow item={e._id} className="border-t border-grey-300">
//               <ImageCell>
//                 <TableImage img={e.image} />
//               </ImageCell>
//               <TextCell text={e.name} />
//               <TextCell text={e.sku} />
//               <TextCell text={e.price} />
//               <TextCell text={e.quantity} />
//               <TextCell text={e.productWeight} />
//               {/* <TextCell text={e.precedence} />
//               <TextCell text={e.brand?.name} />
//               <TextCell text={e.category?.name} />
//               <TextCell text={e.subcategory?.name} /> */}
//               {/* <TextCell text={e.subsubcategory?.name } /> */}
//               {/* <TextCell text={e.description} /> */}
//               <TextCell text={`${e.isVisible ? "Enable" : "Disable"}`} />
//               <TextCell text={`${e.isPlastic}`} />
//               {/* <TextCell text={e.plasticType?.name} /> */}
//               <TextCell text={`${e.weight ?? 0}gm` } />
//               {/* <TextCell text={`${e.isDiscount}`} /> */}
//               {/* <TextCell text={e.discountType} />
//               <TextCell text={e.discountAmount} />
//               <TextCell text={e.discountedAmount} />
//               <TextCell text={`${e.isBogo}`} />
//               <TextCell text={e.employee?.name} /> */}
//               <TableButtonCell>
//               {(admin || cs || cx || executive) && (
//                 <EditTableButton onClick={() => navigate(`/EditProduct/${e._id}`)} />
//                 )}
//                 {(admin || cs || cx || executive) && (
//                 <DeleteTableButton onClick={() => onDelete(e)} />
//                 )}
//               </TableButtonCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       </div>
//       <div className="flex gap-4">
//         <button
//           className="p-4 bg-green-500 rounded text-white"
//           onClick={handlePreviousPageChange}
//         >
//           Previous
//         </button>
        
//         <div className="w-1/6">
//           <label className="block text-sm font-medium text-gray-700">
//             page:
//           </label>
//           <select
//             value={page}
//             onChange={(e) => {
//               setPage(e.target.value);
//             }}
//             className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
//           >
//             <option value="" disabled>
//               Select Page Number
//             </option>
//             {Array.from({ length: data?.totalPages }).map((_, index) => (
//               <option key={index} value={index}>
//                 {index}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="w-1/6">
//           <label className="block text-sm font-medium text-gray-700">
//             Limit:
//           </label>
//         <select
//           value={page}
//           onChange={(e) => {
//             setLimit(e.target.value);
//           }}
//           className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
//           >
//           <option key={1} value={10}>
//             10
//           </option>
//           <option key={2} value={20}>
//             20
//           </option>
//           <option key={3} value={30}>
//             30
//           </option>
//         </select>
//           </div>

//           <button
//           className="p-4 bg-green-500 rounded text-white"
//           onClick={handleNextPageChange}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductView;



import { useEffect, useState } from "react";

import Table from "../../../../Components/table/Table";
import TableHeadingRow from "../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../Components/table/TableHeading";
import TextCell from "../../../../Components/table/TextCell";
import TableButtonCell from "../../../../Components/table/TableButtonCell";
import ViewTableButton from "../../../../Components/table/ViewTableButton";
import EditTableButton from "../../../../Components/table/EditTableButton";
import DeleteTableButton from "../../../../Components/table/DeleteTableButton";
import TableBody from "../../../../Components/table/TableBody";
import TableRow from "../../../../Components/table/TableRow";
import ImageCell from "../../../../Components/table/ImageCell";
import TableImage from "../../../../Components/table/TableImage";

import { useLevels } from "../../../../Utils/useLevels";

import { getAllItems } from "./productService";

import { useNavigate } from "react-router-dom";

function ProductView({
  data,
  onView,
  onEdit,
  onDelete,
  setPage,
  page,
  setLimit,
  limit,
}) {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getAllItems(page, limit);
  //       setData(response);
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, [page, limit]);

  // const totalPages = Math.ceil(data.length / limit);
  // const startIndex = (page - 1) * limit;
  // const endIndex = startIndex + limit;
  // const currentItems = data?.data?.slice(startIndex, endIndex);

  const { admin, cs, cx, executive, operationEmployee } = useLevels();

  const navigate = useNavigate();

  const handleNextPageChange = () => {
    setPage(page + 1);
  };
  const handlePreviousPageChange = () => {
    setPage(page - 1);
  };

  return (
    <div className="w-full ">
      <div className="overflow-x-scroll">
        <Table>
          <TableHeadingRow>
            <TableHeading text="Image" />
            <TableHeading text="Name" />
            <TableHeading text="SKU" />
            <TableHeading text="Price" />
            <TableHeading text="QUANTITY" />
            <TableHeading text="Visibility" />
            <TableHeading text="Plastic" />
            <TableHeading text="Discount Status" />
            <TableHeading align={"text-right"} text="Action" />
          </TableHeadingRow>
          <TableBody>
            {data?.data?.map((e) => (
              <TableRow item={e._id} className="border-t border-grey-300">
                <ImageCell>
                  <TableImage img={e.image} />
                </ImageCell>
                <TextCell text={e.name} />
                <TextCell text={e.sku} />
                <TextCell text={e.price} />
                <TextCell text={e.quantity} />
                <TextCell text={`${e.isVisible}`} />
                <TextCell text={`${e.isPlastic}`} />
                <TextCell text={`${e.isDiscount}`} />
                
                <TableButtonCell>
                  {(admin || cs || cx || executive) && (
                    <EditTableButton
                      onClick={() => navigate(`/EditProduct/${e._id}`)}
                    />
                  )}
                  <DeleteTableButton onClick={() => onDelete(e)} />
                </TableButtonCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-4">
        <button
          className="p-4 bg-green-500 rounded text-white"
          onClick={handlePreviousPageChange}
        >
          Previous
        </button>
        
        <div className="w-1/6">
          <label className="block text-sm font-medium text-gray-700">
            page:
          </label>
          <select
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
            }}
            className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              Select Page Number
            </option>
            {Array.from({ length: data?.totalPages }).map((_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/6">
          <label className="block text-sm font-medium text-gray-700">
            Limit:
          </label>
        <select
          value={page}
          onChange={(e) => {
            setLimit(e.target.value);
          }}
          className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          >
          <option key={1} value={10}>
            10
          </option>
          <option key={2} value={20}>
            20
          </option>
          <option key={3} value={30}>
            30
          </option>
        </select>
          </div>

          <button
          className="p-4 bg-green-500 rounded text-white"
          onClick={handleNextPageChange}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductView;
