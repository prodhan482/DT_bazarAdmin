// import { useState, useEffect } from "react"

// import Table from "../../../../../Components/table/Table";
// import TableHeadingRow from "../../../../../Components/table/TableHeadingRow";
// import TableHeading from "../../../../../Components/table/TableHeading";
// import TextCell from "../../../../../Components/table/TextCell";
// import TableButtonCell from "../../../../../Components/table/TableButtonCell";
// import ViewTableButton from "../../../../../Components/table/ViewTableButton";
// import EditTableButton from "../../../../../Components/table/EditTableButton";
// import DeleteTableButton from "../../../../../Components/table/DeleteTableButton";
// import TableBody from "../../../../../Components/table/TableBody"
// import TableRow from "../../../../../Components/table/TableRow"
// import { useNavigate, useParams } from "react-router-dom";
// import TextEditorPageLayout from "../../../../../Components/common/TextEditorPageLayout"
// import ViewDetailsButton from "../../../../../Components/common/ViewDetailsButton"

// import { getAllOrdersByStatus } from "../orderListService"
// import CancelButton from "../../../../../Components/common/CancelButton";

// function ViewProcessingOrders() {
//   const { processing } = useParams();
//   const [processingOrderList, setProcessingOrderList] = useState([])
//   const [toggleState, setToggleState] = useState(false)

//   const [errorMessage, setErrorMessage] = useState("")
//   const navigate = useNavigate();

//   useEffect(() => {

//     async function fetchData () {

//       try {

//         const response = await getAllOrdersByStatus(processing,page,limit)
//         setProcessingOrderList(response)

//       } catch (error) {

//         setErrorMessage("Error Processing Order List. Please try again.")

//       }

//     }

//     fetchData()

//   }, [toggleState])
//   return (
   
//     <TextEditorPageLayout
//     title = "Processing Order List"
//     itemCount = {processingOrderList.length}
//     onAddClick={() => setIsAddModalOpen(true)}
//     >

//  <div className="w-full ">
//       <div className="overflow-x-scroll">
//       <Table>
//       <TableHeadingRow>
//         <TableHeading text="Order Id" />
//         <TableHeading text="Customer Name" />
//         <TableHeading text="Customer Phone" />
//         <TableHeading text="Sub Total" />
//         <TableHeading text="Total" />
//         <TableHeading text="Grand Total" />
//         {/* <TableHeading text="Status" /> */}
//         <TableHeading text="Notes" />
//         {/* <TableHeading text="Employee" /> */}
//         <TableHeading align={'text-right'} text="Action" />
//       </TableHeadingRow>
//       <TableBody>
//         {processingOrderList.map(order => (
//             <TableRow key={order._id} item={order}>
//               <TextCell text={order?.orderID} />
//               <TextCell text={order.customer?.firstName+' '+order.customer?.lastName} />
//               <TextCell text={order.customer?.mobile} />
//               <TextCell text={order.subtotal} />
//               <TextCell text={order.total} />
//               <TextCell text={order.grandTotal} />
//               {/* <TextCell text={order.orderStatus} /> */}
//               <TextCell text={order.notes} />
//               {/* <TextCell text={`${order.employee?.name ?? 'N/A'}`}/> */}
//               <TableButtonCell>
//             <ViewDetailsButton
//                 label="Order Details"
//                 onClick={() => navigate(`/ViewCustomerOrderDetails/${order._id}`)}
//               />
//               {/* <CancelButton
//               label="Cancel Order"
//               onClick={() => navigate(`/EditOrderStatusCanceled/${order._id}`)}
//             /> */}
//             </TableButtonCell>
                
//             </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//     </div>
// </div>
//     </TextEditorPageLayout>
//   );
// }

// export default ViewProcessingOrders;

import { useState, useEffect } from "react"

import Table from "../../../../../Components/table/Table";
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../../Components/table/TableHeading";
import TextCell from "../../../../../Components/table/TextCell";
import TableButtonCell from "../../../../../Components/table/TableButtonCell";
import ViewTableButton from "../../../../../Components/table/ViewTableButton";
import EditTableButton from "../../../../../Components/table/EditTableButton";
import DeleteTableButton from "../../../../../Components/table/DeleteTableButton";
import TableBody from "../../../../../Components/table/TableBody"
import TableRow from "../../../../../Components/table/TableRow"
import { useNavigate, useParams } from "react-router-dom";
import TextEditorPageLayout from "../../../../../Components/common/TextEditorPageLayout"
import ViewDetailsButton from "../../../../../Components/common/ViewDetailsButton"

import { getAllOrdersByStatus, searchOrder, searchOrderByStatus } from "../orderListService"
import CancelButton from "../../../../../Components/common/CancelButton";
import PaginationControls from "../../../../../Components/table/PaginationControlls";

function ViewProcessingOrders() {
  const { processing } = useParams();
  const [processingOrderList, setProcessingOrderList] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

    const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await searchOrderByStatus(searchTerm,processing);
        setSearchResults(response);
      } catch (error) {}
    };

    if (searchTerm !== "") {
      fetchSearchResults();
    }
  }, [searchTerm]);

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getAllOrdersByStatus(processing,page,limit)
        setProcessingOrderList(response)

      } catch (error) {

        setErrorMessage("Error Pending Order List. Please try again.")

      }

    }

    fetchData()

  }, [toggleState,page,limit])

  const handleNextPageChange = () => {
    setPage(page + 1);
  };
  const handlePreviousPageChange = () => {
    setPage(page - 1);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
   
    <TextEditorPageLayout
    title = "Processing Order List"
    itemCount = {processingOrderList.count}
    onAddClick={() => setIsAddModalOpen(true)}
    >
   <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded-md mr-4"
        />
 <div className="w-full ">
      <div className="overflow-x-scroll">
      <Table>
      <TableHeadingRow>
        <TableHeading text="Order Id" />
        <TableHeading text="Customer Name" />
        <TableHeading text="Customer Phone" />
        <TableHeading text="Sub Total" />
        <TableHeading text="Total" />
        <TableHeading text="Grand Total" />
        {/* <TableHeading text="Status" /> */}
        <TableHeading text="Notes" />
        {/* <TableHeading text="Employee" /> */}
        <TableHeading align={'text-right'} text="Action" />
      </TableHeadingRow>
      <TableBody>
        {(searchTerm ? searchResults : processingOrderList)?.data?.map(order => (
            <TableRow key={order._id} item={order}>
              <TextCell text={order?.orderID} />
              <TextCell text={order.customer?.firstName+' '+order.customer?.lastName} />
              <TextCell text={order.customer?.mobile} />
              <TextCell text={order.subtotal} />
              <TextCell text={order.total} />
              <TextCell text={order.grandTotal} />
              {/* <TextCell text={order.orderStatus} /> */}
              <TextCell text={order.notes} />
              {/* <TextCell text={`${order.employee?.name ?? 'N/A'}`}/> */}
              <TableButtonCell>
            <ViewDetailsButton
                label="Order Details"
                onClick={() => navigate(`/ViewCustomerOrderDetails/${order._id}`)}
              />
              {/* <CancelButton
              label="Cancel Order"
              onClick={() => navigate(`/EditOrderStatusCanceled/${order._id}`)}
            /> */}
            </TableButtonCell>
                
            </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    <PaginationControls
        handlePreviousPageChange={handlePreviousPageChange}
        handleNextPageChange={handleNextPageChange}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        totalPages={processingOrderList.totalPages}
        limit={limit}
      />
</div>
    </TextEditorPageLayout>
  );
}

export default ViewProcessingOrders;
