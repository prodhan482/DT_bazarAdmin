import Table from "../../../../Components/table/Table";
import TableHeadingRow from "../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../Components/table/TableHeading";
import TextCell from "../../../../Components/table/TextCell";
import TableButtonCell from "../../../../Components/table/TableButtonCell";
import ViewTableButton from "../../../../Components/table/ViewTableButton";
import EditTableButton from "../../../../Components/table/EditTableButton";
import DeleteTableButton from "../../../../Components/table/DeleteTableButton";
import TableBody from "../../../../Components/table/TableBody"
import TableRow from "../../../../Components/table/TableRow"

import { useNavigate, useParams } from "react-router-dom";
import ViewDetailsButton from "../../../../Components/common/ViewDetailsButton";
import CancelButton from "../../../../Components/common/CancelButton";

function OrderListTable({ 
  orderList,
  setIsViewModalOpen,
  setSelectedOrderList,
  customerData,
}) {

  const navigate = useNavigate();
  return (
    <div className="w-full ">
      <div className="overflow-x-scroll">
    <Table>
      <TableHeadingRow>
        <TableHeading text="Order Id" />
        <TableHeading text="Customer Name" />
        <TableHeading text="Customer Phone" />
        {/* <TableHeading text="Customer Email" /> */}
        <TableHeading text="Sub Total" />
        <TableHeading text="Total" />
        {/* <TableHeading text="Grand Total" /> */}
        <TableHeading text="Status" />
        {/* <TableHeading text="Notes" /> */}
        <TableHeading text="Employee" />
        <TableHeading align={'text-right'} text="Action" />
      </TableHeadingRow>
      <TableBody>
        {orderList.map(order => (
            <TableRow key={order._id} item={order}>
              <TextCell text={order.orderID} />
              <TextCell text={order.customer?.firstName+' '+order.customer?.lastName} />
              <TextCell text={order.customer?.mobile} />
              {/* <TextCell text={order.customer?.email} /> */}
              <TextCell text={order.subtotal.toFixed(2)} />
              <TextCell text={order.total.toFixed(2)} />
              {/* <TextCell text={order.grandTotal} /> */}
              <TextCell text={order.orderStatus} />
              {/* <TextCell text={order.notes} /> */}
              <TextCell text={`${order.employee?.name ?? 'N/A'}`}/>
              <TableButtonCell>
                {/* <ViewTableButton
                  onClick={() => {
                    setSelectedOrderList(order);
                    setIsViewModalOpen(true);
                  }}
                /> */}
                {/* <EditTableButton
                  onClick={() => {
                    setSelectedOrderList(order);
                    setIsEditModalOpen(true);
                  }}
                />
                <DeleteTableButton
                  onClick={() => {
                    setSelectedOrderList(order);
                    setIsDeleteModalOpen(true);
                  }}
                /> */}
                 
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
  );
}

export default OrderListTable;
