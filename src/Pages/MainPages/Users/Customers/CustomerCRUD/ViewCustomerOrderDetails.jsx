import { useState, useEffect } from "react";

import Table from "../../../../../Components/table/Table";
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../../Components/table/TableHeading";
import TextCell from "../../../../../Components/table/TextCell";
import TableRow from "../../../../../Components/table/TableRow";
import TableBody from "../../../../../Components/table/TableBody";
import { useNavigate, useParams } from "react-router-dom";
import TextEditorPageLayout from "../../../../../Components/common/TextEditorPageLayout";

import {
  editOrderStatusCanceled,
  getOrderProductsFromOrder,
} from "../customerService";
import { editOrderStatusPendingToProcessing } from "../customerService";
import { editOrderStatusProcessingToReadyForDelivery } from "../customerService";
import { editOrderStatusReadyForDeliveryToDelivered } from "../customerService";
// import { getItems as getOrderDetails } from "../../../Order/OrderList/orderListService"
import OrderDetailsPageLayout from "../../../../../Components/common/OrderDetailsPageLayout";
import DescriptionField from "../../../../../Components/common/DescriptionField";
import DateField from "../../../../../Components/common/DateField";

import TimeSlot from "../../../../../Components/common/TimeSlotDropdown";
import { getItems as getTimeSlot } from "../../../Order/TimeSlot/timeSlotService";
import EditOrderStatusFormLayout from "../../../../../Components/common/EditOrderStatusFormLayout";
import CustomerSideBar from "../../../../../Components/CustomerSidebar";
import Modal from "../../../../../Components/common/Modal";
import SubmitButton from "../../../../../Components/common/SubmitButton";

import { useLevels } from "../../../../../Utils/useLevels";

function ViewCustomerOrderDetails() {
  const { id } = useParams();
  const [customerOrderDetails, setCustomerOrderDetails] = useState([]);
  const [customerOrderProductDetails, setCustomerOrderProductDetails] = useState([]);
  const [orderLogDetails, setOrderLogDetails] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);

  const [toggleState, setToggleState] = useState(false);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [allowEdit, setAllowEdit] = useState(false);

  const [sortOrder, setSortOrder] = useState("desc");
  const [sortedOrderLogs, setSortedOrderLogs] = useState([]);
  const [orderStatus, setOrderStatus] = useState(
    customerOrderDetails.orderStatus
  );
  const [adminNote, setAdminNote] = useState(customerOrderDetails.notes);
  const [deliveryDate, setDeliveryDate] = useState();
  // console.log("🚀 ~ ViewCustomerOrderDetails ~ customerOrderDetails.deliveryDate:", customerOrderDetails.deliveryDate)
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [totalPlasticPoints, setTotalPlasticPoints] = useState(0);

  const { admin, cs, cx, executive, operationEmployee, marketing } = useLevels();

  //   const formatDate = (date) => {
  //     return date ? new Date(date).toISOString().split('T')[0] : '';
  //   };

  const handleRoute = () => {
    navigate(`/Reorder/${id}`);
  };

  const sortOrderLogsByCreatedAt = () => {
    const sortedLogs = orderLogDetails.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedOrderLogs(sortedLogs);
  };

  const handleCancelOrderClick = () => {
    setIsCancelModalOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getOrderProductsFromOrder(id);
        const order = response.orders[0];
        const timeSlotData = await getTimeSlot();
  
        setCustomerOrderDetails(order);
        setCustomerOrderProductDetails(response.orderProducts);
        setOrderLogDetails(response.orderLog);
        setTimeSlot(timeSlotData);
  
        setSelectedTimeSlot(order?.timeSlot?._id);
        setDeliveryDate(order?.deliveryDate);
  
        const calculatedPlasticPoints = response.orderProducts.reduce((sum, product) => {
          const unitPlasticPoint = parseFloat(product.unitPlasticPoint) || 0;
          const totalPlasticPoint = parseFloat(product.totalPlasticPoint) || 0;
          const quantity = parseFloat(customerOrderProductDetails?.quantity) || 0;
  
          sum += unitPlasticPoint * quantity + totalPlasticPoint;
  
          return sum;
        }, 0);
  
        setTotalPlasticPoints(calculatedPlasticPoints);
  
        // Set selectedDeliveryDate state with the delivery date from the order
        setSelectedDeliveryDate(new Date(order.deliveryDate));
  
        // Make sure customerOrderDetails is not empty before accessing its properties
        if (order && order.orderStatus) {
          setOrderStatus(order.orderStatus);
          setAdminNote(order.notes);
        }
      } catch (error) {
        setErrorMessage("Error Customer Order Details. Please try again.");
      }
    }
  
    fetchData();
  }, [toggleState]);

  useEffect(() => {
    sortOrderLogsByCreatedAt();
  }, [orderLogDetails, sortOrder]);

  // const handleTimeSlotChange = async (data) => {
  //   setSelectedTimeSlot(data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (customerOrderDetails.orderStatus === "pending") {
        await editOrderStatusPendingToProcessing(customerOrderDetails._id, {
          orderStatus: orderStatus,
          adminNote: adminNote,
          deliveryDate: deliveryDate,
          timeSlot: selectedTimeSlot,
        });
        setToggleState(!toggleState);
      }
      if (customerOrderDetails.orderStatus === "processing") {
        await editOrderStatusProcessingToReadyForDelivery(
          customerOrderDetails._id,
          {
            orderStatus: orderStatus,
            adminNote: adminNote,
            deliveryDate: deliveryDate,
            timeSlot: selectedTimeSlot,
          }
        );

        setToggleState(!toggleState);
      }
      if (customerOrderDetails.orderStatus === "readyForDelivery") {
        await editOrderStatusReadyForDeliveryToDelivered(
          customerOrderDetails._id,
          {
            orderStatus: orderStatus,
            adminNote: adminNote,
            deliveryDate: deliveryDate,
            timeSlot: selectedTimeSlot,
          }
        );

        setToggleState(!toggleState);
      }
    } catch (error) {
      setErrorMessage("Failed edit");
    }
  };

  const handleCancelStatus = async (e) => {
    e.preventDefault();
    setIsCancelModalOpen(false);
    try {
      await editOrderStatusCanceled(customerOrderDetails._id, {
        orderStatus: "canceled",
        adminNote: adminNote,
        // deliveryDate: deliveryDate,
        // timeSlot: selectedTimeSlot,
      });
      setToggleState(!toggleState);
    } catch (error) {
      setErrorMessage("Failed edit");
    }
  };

  // const calculateSubTotalSum = () => {
  //   return customerOrderProductDetails.reduce((sum, product) => sum + product.subtotal, 0).toFixed(2);
  // };

  // const calculateTotalSum = () => {
  //   return customerOrderProductDetails.reduce((sum, product) => sum + product.total, 0).toFixed(2);
  // };

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };
  // console.log(customerOrderDetails.notes)

  return (
    <OrderDetailsPageLayout
      orderID={customerOrderDetails?.orderID}
      orderDate={customerOrderDetails?.createdAt}
      orderStatus={customerOrderDetails?.orderStatus}
      customerName={
        customerOrderDetails?.customer?.firstName +
        " " +
        customerOrderDetails?.customer?.lastName
      }
      customerEmail={customerOrderDetails?.customer?.email}
      customerPhone={customerOrderDetails?.customer?.mobile}
      orderTotalPlasticPoint={customerOrderDetails?.orderTotalPlasticPoint}
      fullAddressString={customerOrderDetails?.fullAddressString}
      areaString={customerOrderDetails?.areaString}
      handleRoute={handleRoute}
      handleCancelOrderClick={handleCancelOrderClick}
    >
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
              {customerOrderProductDetails.map(
                (customerOrderProductDetails) => (
                  <TableRow
                    key={customerOrderProductDetails._id}
                    item={customerOrderProductDetails}
                  >
                    <TextCell
                      text={customerOrderProductDetails?.product?.name}
                    />
                    <TextCell
                      text={customerOrderProductDetails?.product?.sku}
                    />
                    <TextCell
                      text={`${customerOrderProductDetails?.product?.isPlastic}`}
                    />
                    <TextCell
                      text={`${customerOrderProductDetails?.product?.isDiscount}`}
                    />
                    <TextCell
                      text={customerOrderProductDetails?.product?.discountType}
                    />
                    <TextCell
                      text={
                        customerOrderProductDetails?.product?.discountAmount
                      }
                    />
                    <TextCell
                      text={customerOrderProductDetails.product?.weight}
                    />
                    <TextCell text={customerOrderProductDetails?.quantity} />
                    <TextCell text={customerOrderProductDetails?.unitPrice} />
                    {/* <TextCell text={customerOrderDetails.product?.price*customerOrderDetails.product?.quantity} /> */}
                    <TextCell text={customerOrderProductDetails?.total} />
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditOrderStatusFormLayout onSubmit={handleSubmit}>
        <div className=" pt-3 pr-10 w-full mt-6">
          <div className="grid grid-cols-2 ">
            <div className="ml-6">
              <h2 className="text-lg mb-1.5">Order Status Change</h2>

              <select
                id="orderStatus"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                {customerOrderDetails.orderStatus === "pending" && (
                  <>
                    <option disabled value="pending">
                      Pending
                    </option>
                    <option value="processing">Processing</option>
                  </>
                )}
                {customerOrderDetails.orderStatus === "processing" && (
                  <>
                    <option disabled value="processing">
                      Processing
                    </option>
                    <option value="readyForDelivery">Ready For Delivery</option>
                  </>
                )}
                {customerOrderDetails.orderStatus === "readyForDelivery" && (
                  <>
                    <option disabled value="readyForDelivery">
                      Ready For Delivery
                    </option>
                    <option value="delivered">Delivered</option>
                  </>
                )}
                {customerOrderDetails.orderStatus === "delivered" && (
                  <>
                    <option disabled value="delivered">
                      Delivered
                    </option>
                  </>
                )}
              </select>
            </div>

            <div className="">
              <div className="">
                <div className="float-right text-left mr-12 w-1/2">
                  {/* Checkbox for allowing edit */}
                  {(admin || cs || cx || executive) && (
                  <label>
                    <input
                      type="checkbox"
                      checked={allowEdit}
                      onChange={() => setAllowEdit(!allowEdit)}
                    />
                    Allow Edit
                  </label>
                  )}
                </div>
              </div>
              <div className="float-right text-left mr-12 w-1/2">
                <DateField
                  label="Delivery Date"
                  value={deliveryDate}
                  selected={selectedDeliveryDate}
                  onChange={(date) => setSelectedDeliveryDate(date)}
                  placeholderText="MM/DD/YY"
                  readOnly={!allowEdit}
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
                required={false}
              />
            </div>

            <div className="">
              <div className="float-right text-left mr-12 w-1/2">
                <TimeSlot
                  label="Time Slot"
                  options={timeSlot}
                  value={selectedTimeSlot}
                  onChange={setSelectedTimeSlot}
                  required
                  readOnly={!allowEdit}
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" pt-3 pr-10 w-full">
          <div className="grid grid-cols-2 ">
            <div className="ml-6">
              <h2 className="text-[#262626] mb-1.5 text-sm mt-6">
                Customer Note: {customerOrderDetails?.notes} ||
                {/* Delivery Date: {formatDate(customerOrderDetails?.deliveryDate)} ||  */}
                Created Date: {formatDate(customerOrderDetails?.createdAt)} ||
                <ul>
                  Customer Name:{" "}
                  {customerOrderDetails?.customer?.firstName +
                    " " +
                    customerOrderDetails?.customer?.lastName}
                </ul>
              </h2>
              {sortedOrderLogs.map((orderLogDetails) => (
                <div key={orderLogDetails._id}>
                  {/* <h2 className="text-2xl mb-1.5">Changing Order Information</h2> */}
                  <h2 className="text-[#262626] mb-1.5 text-sm mt-6">
                    Status: {orderLogDetails?.orderStatus} || Delivery Date:{" "}
                    {formatDate(orderLogDetails?.deliveryDate)} || Time Slot:{" "}
                    {orderLogDetails?.timeSlot?.startTime +
                      "--" +
                      timeSlot?.endTime}{" "}
                    || Admin Note: {orderLogDetails?.adminNote} || Created Order
                    Date: {formatDate(orderLogDetails?.createdAt)} || Created
                    By: {orderLogDetails?.employee?.name}
                  </h2>
                </div>
              ))}
            </div>

            <div className="">
              <div className="float-right text-right mr-12">
                <div className="float-right text-right mr-2.5">
                  {/* <div className="text-xl mb-[08px]">Subtotal: {calculateSubTotalSum()}</div> */}
                  <div className="text-xl mb-[08px]">
                    Subtotal: {customerOrderDetails.subtotal}
                  </div>
                  <div className="text-xl mb-[08px]">
                    Delivery Fee: {customerOrderDetails.deliveryFee}
                  </div>
                  <div className="text-xl mb-[08px]">
                    Discounted Amount:{" "}
                    {customerOrderDetails.subtotal +
                      customerOrderDetails.deliveryFee -
                      customerOrderDetails.total}
                  </div>
                  <div className="pt-1 border-t-2 border-t-[#333] border-solid text-2xl mb-1.5">
                    Total: {customerOrderDetails.total}
                  </div>
                  <div className="text-xl mb-[08px]">
                    Total Plastic Points: {totalPlasticPoints}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isCancelModalOpen && (
          <Modal
            title={"Cancel Order"}
            onClose={() => setIsCancelModalOpen(false)}
          >
            {/* Your cancel order modal content goes here */}
            <div>
              <DescriptionField
                id="adminNote"
                label="Cancel Notes"
                value={adminNote}
                onChange={(value) => setAdminNote(value)}
                required={false}
              />

              <button
                className="bg-[#10823A] hover:bg-[#10823A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCancelStatus}
              >
                Submit
              </button>
            </div>
          </Modal>
        )}
      </EditOrderStatusFormLayout>
    </OrderDetailsPageLayout>
  );
}

export default ViewCustomerOrderDetails;
