import { useState, useEffect } from "react"

import Table from "../../../../../Components/table/Table"
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../../Components/table/TableHeading"
import TextCell from "../../../../../Components/table/TextCell"
import TableRow from "../../../../../Components/table/TableRow"
import TableBody from "../../../../../Components/table/TableBody"
import { useNavigate, useParams } from "react-router-dom";
import TextEditorPageLayout from "../../../../../Components/common/TextEditorPageLayout"

import { getOrderProductsFromOrder } from "../customerService"
import { editOrderStatusPendingToProcessing } from "../customerService"
import { editOrderStatusProcessingToReadyForDelivery } from "../customerService"
import { editOrderStatusReadyForDeliveryToDelivered } from "../customerService"
import { editOrderStatusCanceled } from "../customerService"
// import { getItems as getOrderDetails } from "../../../Order/OrderList/orderListService"
import OrderDetailsPageLayout from "../../../../../Components/common/OrderDetailsPageLayout"
import DescriptionField from "../../../../../Components/common/DescriptionField"
import DateField from "../../../../../Components/common/DateField";

import TimeSlot from "../../../../../Components/common/TimeSlotDropdown";
import { getItems as getTimeSlot } from "../../../Order/TimeSlot/timeSlotService";
import EditTextEditorFormLayout from "../../../../../Components/common/EditTextEditorFormLayout"

function EditOrderStatusCanceled() {
  const { id } = useParams();
  const [customerOrderDetails, setCustomerOrderDetails] = useState([])
  const [customerOrderProductDetails, setCustomerOrderProductDetails] = useState([])
  const [orderLogDetails, setOrderLogDetails] = useState([])

  const [toggleState, setToggleState] = useState(false)


  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("")

  const [sortOrder, setSortOrder] = useState("desc");
  const [sortedOrderLogs, setSortedOrderLogs] = useState([]);

  //   const formatDate = (date) => {
  //     return date ? new Date(date).toISOString().split('T')[0] : '';
  //   };

  const handleRoute = () => {
    navigate(`/Reorder/${id}`);
  }

  const sortOrderLogsByCreatedAt = () => {
    const sortedLogs = orderLogDetails.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedOrderLogs(sortedLogs);
  };

  useEffect(() => {

    async function fetchData() {
      try {
        const response = await getOrderProductsFromOrder(id);
        const order = response.orders[0];
        const timeSlotData = await getTimeSlot();
        setCustomerOrderDetails(order);
        setCustomerOrderProductDetails(response.orderProducts);
        setOrderLogDetails(response.orderLog)
        setTimeSlot(timeSlotData);
      } catch (error) {
        setErrorMessage("Error Customer Order Details. Please try again.");
      }
    }

    fetchData();
  }, [toggleState]);

  useEffect(() => {
    sortOrderLogsByCreatedAt();
  }, [orderLogDetails, sortOrder]);


  const handleTimeSlotChange = async (data) => {
    setSelectedTimeSlot(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      
        await editOrderStatusCanceled(customerOrderDetails._id, {
          orderStatus: orderStatus,
          adminNote: adminNote,
          
        })

        onEditSuccess()

    } catch (error) {

      setErrorMessage("Failed edit")

    }
  }

  const [orderStatus, setOrderStatus] = useState(customerOrderDetails.orderStatus)
  const [adminNote, setAdminNote] = useState(customerOrderDetails.notes)
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);


  // const calculateSubTotalSum = () => {
  //   return customerOrderProductDetails.reduce((sum, product) => sum + product.subtotal, 0).toFixed(2);
  // };

  // const calculateTotalSum = () => {
  //   return customerOrderProductDetails.reduce((sum, product) => sum + product.total, 0).toFixed(2);
  // };

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };
  // console.log(customerOrderDetails.notes)
  return (
    <OrderDetailsPageLayout
      orderID={customerOrderDetails?.orderID}
      orderDate={customerOrderDetails?.createdAt}
      orderStatus={customerOrderDetails?.orderStatus}
      customerName={customerOrderDetails?.customer?.firstName + ' ' + customerOrderDetails?.customer?.lastName}
      customerEmail={customerOrderDetails?.customer?.email}
      customerPhone={customerOrderDetails?.customer?.mobile}
      orderTotalPlasticPoint={customerOrderDetails?.orderTotalPlasticPoint}
      fullAddressString={customerOrderDetails?.fullAddressString}
      areaString={customerOrderDetails?.areaString}
    >
      <button onClick={handleRoute} className="btn btn-primary">Re Order</button>

      <div className="w-full">
        <div className="overflow-x-scroll">
          <Table>
            <TableHeadingRow>

              <TableHeading text="Product Name" />
              <TableHeading text="Sku" />
              <TableHeading text="Is Plastic" />
              <TableHeading text="Is Discount" />
              <TableHeading text="Discount Type" />
              <TableHeading text="Discount Amount" />
              <TableHeading text="Weight" />
              <TableHeading text="Quantity" />
              <TableHeading text="Unit Price" />
              <TableHeading text="Total Price" />

            </TableHeadingRow>

            <TableBody>
              {customerOrderProductDetails.map(customerOrderProductDetails => (
                <TableRow key={customerOrderProductDetails._id} item={customerOrderProductDetails}>

                  <TextCell text={customerOrderProductDetails?.product?.name} />
                  <TextCell text={customerOrderProductDetails?.product?.sku} />
                  <TextCell text={`${customerOrderProductDetails?.product?.isPlastic}`} />
                  <TextCell text={`${customerOrderProductDetails?.product?.isDiscount}`} />
                  <TextCell text={customerOrderProductDetails?.product?.discountType} />
                  <TextCell text={customerOrderProductDetails?.product?.discountAmount} />
                  <TextCell text={customerOrderProductDetails.product?.weight} />
                  <TextCell text={customerOrderProductDetails?.quantity} />
                  <TextCell text={customerOrderProductDetails?.unitPrice} />
                  {/* <TextCell text={customerOrderDetails.product?.price*customerOrderDetails.product?.quantity} /> */}
                  <TextCell text={customerOrderProductDetails?.total} />

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditTextEditorFormLayout onSubmit={handleSubmit}>
        <div className=" pt-3 pr-10 w-full mt-6">
          <div className="grid grid-cols-2 ">
            <div className="ml-6">
              <h2 className="text-lg mb-1.5">Order Status Change</h2>

              <select id="orderStatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>

                {customerOrderDetails.orderStatus === 'pending' && (
                  <>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="canceled">Canceled</option>
                  </>
                )}
                {customerOrderDetails.orderStatus === 'processing' && (
                  <>
                    <option value="processing">Processing</option>
                    <option value="readyForDelivery">Ready For Delivery</option>
                    <option value="canceled">Canceled</option>
                  </>
                )}
                {customerOrderDetails.orderStatus === 'readyForDelivery' && (
                  <>
                    <option value="readyForDelivery">Ready For Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </>
                )}
                {customerOrderDetails.orderStatus === 'delivered' && (
                  <>
                    <option value="delivered">Delivered</option>
                  </>
                )}

              </select>
            </div>
            <div className="">
              <div className="float-right text-left mr-12 w-1/2">
                <DateField
                  label="Delivery Date"
                  selected={deliveryDate}
                  onChange={(date) => setDeliveryDate(date)}
                  placeholderText="MM/DD/YY"
                />
              </div>
            </div>

          </div>
        </div>
        <div className=" pt-3 pr-10 w-full mt-2">
          <div className="grid grid-cols-2 ">
            <div className="ml-6">
              <DescriptionField
                id="adminNote"
                label="Order Notes"
                value={adminNote}
                onChange={(value) => setAdminNote(value)}
              />
            </div>
            <div className="">
              <div className="float-right text-left mr-12 w-1/2">

                <TimeSlot
                  label="Time Slot"
                  options={timeSlot}
                  value={selectedTimeSlot}
                  onChange={handleTimeSlotChange}
                  required
                />
              </div>
            </div>

          </div>
        </div>
      
      <div className=" pt-3 pr-10 w-full">
        <div className="grid grid-cols-2 ">
          <div className="ml-6">
            <h2 className="text-[#262626] mb-1.5 text-sm mt-6">
              Customer Note:   {customerOrderDetails?.notes} ||
              {/* Delivery Date: {formatDate(customerOrderDetails?.deliveryDate)} ||  */}
              Created Date:   {formatDate(customerOrderDetails?.createdAt)} ||
              <ul>Customer Name:   {customerOrderDetails?.customer?.firstName+" "+customerOrderDetails?.customer?.lastName}</ul>
            </h2>
            {sortedOrderLogs.map((orderLogDetails) => (
              <div key={orderLogDetails._id}>
                {/* <h2 className="text-2xl mb-1.5">Changing Order Information</h2> */}
                <h2 className="text-[#262626] mb-1.5 text-sm mt-6">
                  Status: {orderLogDetails?.orderStatus} || 
                  Delivery Date: {formatDate(orderLogDetails?.deliveryDate)} || 
                  Time Slot:   {orderLogDetails?.timeSlot?.startTime + "--" + timeSlot?.endTime} ||
                  Admin Note:   {orderLogDetails?.adminNote} ||
                  Created Order Date:   {formatDate(orderLogDetails?.createdAt)} ||
                  Created By:   {orderLogDetails?.employee?.name}
                  </h2>
              </div>
            ))}
          </div>
          <div className="">
            <div className="float-right text-right mr-12">

              <div className="float-right text-right mr-2.5">
                {/* <div className="text-xl mb-[08px]">Subtotal: {calculateSubTotalSum()}</div> */}
                <div className="text-xl mb-[08px]">Subtotal: {customerOrderDetails.subtotal}</div>
                <div className="text-xl mb-[08px]">
                  Discounted Amount: 
                </div>
                <div className="pt-1 border-t-2 border-t-[#333] border-solid text-2xl mb-1.5">
                  Total: {customerOrderDetails.total}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </EditTextEditorFormLayout>
    </OrderDetailsPageLayout>
  )
}

export default EditOrderStatusCanceled
