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

import { getAllOrdersByStatus } from "../orderListService"
import CancelButton from "../../../../../Components/common/CancelButton";

function ViewReadyForDeliveryOrders() {
  const { readyForDelivery } = useParams();
  const [readyForDeliveryOrderList, setReadyForDeliveryOrderList] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate();

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getAllOrdersByStatus(readyForDelivery)
        setReadyForDeliveryOrderList(response)

      } catch (error) {

        setErrorMessage("Error Ready For Delivery Order List. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])
  return (
   
    <TextEditorPageLayout
    title = "Ready For Delivery Order List"
    itemCount = {readyForDeliveryOrderList.length}
    onAddClick={() => setIsAddModalOpen(true)}
    >

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
        {readyForDeliveryOrderList.map(order => (
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
</div>
    </TextEditorPageLayout>
  );
}

export default ViewReadyForDeliveryOrders;
