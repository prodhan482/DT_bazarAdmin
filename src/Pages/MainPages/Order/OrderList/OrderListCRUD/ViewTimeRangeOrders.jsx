import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../../../../../Components/table/Table";
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../../Components/table/TableHeading";
import TableRow from "../../../../../Components/table/TableRow";
import TextCell from "../../../../../Components/table/TextCell";
import { getTimeRangeOrders } from "../orderListService";
import SearchItemPageLayout from "../../../../../Components/common/SearchItemPageLayout";
import DateField from "../../../../../Components/common/DateField";
import TableBody from "../../../../../Components/table/TableBody";

function ViewTimeRangeOrders() {
  const { startDate: urlStartDate, endDate: urlEndDate, orderStatus: urlOrderStatus } = useParams();

  const [startDate, setStartDate] = useState(urlStartDate ? new Date(urlStartDate) : new Date());
  const [endDate, setEndDate] = useState(urlEndDate ? new Date(urlEndDate) : new Date());
  const [orderStatus, setOrderStatus] = useState(urlOrderStatus || "pending");

  const [timeRangeOrders, setTimeRangeOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTimeRangeOrders(startDate, endDate, orderStatus);
        setTimeRangeOrders(response);
      } catch (error) {
        setErrorMessage("Error fetching orders. Please try again.");
      }
    }
    fetchData();
  }, [startDate, endDate, orderStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getTimeRangeOrders(startDate, endDate, orderStatus);
      setTimeRangeOrders(response);
    } catch (error) {
      setErrorMessage("Failed to get orders.");
    }
  };

  return (
    <SearchItemPageLayout
      title="Search Order by Date"
      onSubmit={handleSubmit}
    >
      <form>
        <DateField
          label="Start Date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="MM/DD/YY"
        />
        <DateField
          label="End Date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="MM/DD/YY"
        />
        {/* <input
          type="text"
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          placeholder="Order Status"
        /> */}
        <h2 className="text-lg mb-1.5">Order Status</h2>

        <select id="orderStatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="readyForDelivery">Ready For Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
        {/* <button type="submit">Submit</button> */}
      </form>

      <Table>
        <TableHeadingRow>
          <TableHeading text="Order ID" />
          <TableHeading text="Customer Name" />
        </TableHeadingRow>
        {/* <TableBody>
          {timeRangeOrders.map((order) => (
            <TableRow key={order.id}>
              <TextCell text={order.id} />
              <TextCell text={order.customerName} />
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
      {errorMessage && <p>{errorMessage}</p>}
    </SearchItemPageLayout>
  );
}

export default ViewTimeRangeOrders;
