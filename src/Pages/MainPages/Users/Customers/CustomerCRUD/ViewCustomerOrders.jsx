import { useState, useEffect } from "react"

import Table from "../../../../../Components/table/Table"
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../../Components/table/TableHeading"
import TextCell from "../../../../../Components/table/TextCell"
import TableButtonCell from "../../../../../Components/table/TableButtonCell";
import TableRow from "../../../../../Components/table/TableRow"
import TableBody from "../../../../../Components/table/TableBody"
import { useNavigate, useParams } from "react-router-dom";
import TextEditorPageLayout from "../../../../../Components/common/TextEditorPageLayout"
import ViewDetailsButton from "../../../../../Components/common/ViewDetailsButton"

import { useLevels } from "../../../../../Utils/useLevels";

import { getSingleCustomerOrders } from "../customerService"

function ViewCustomerOrders() {
  const { id } = useParams();
  const [customerOrders, setCustomerOrders] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("")

  const { admin, cs, cx, executive, operationEmployee, marketing } = useLevels();

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getSingleCustomerOrders(id)
        setCustomerOrders(response)

      } catch (error) {

        setErrorMessage("Error Customer Orders. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  return (
    <TextEditorPageLayout
    title = "Customer Orders"
    itemCount = {customerOrders.length}
    onAddClick={() => setIsAddModalOpen(true)}
  >

    <Table>

      <TableHeadingRow>
      
        <TableHeading text="Order ID" />
        <TableHeading text="Delivery Date" />
        <TableHeading text="Sub Total" />
        <TableHeading text="Total" />
        <TableHeading text="Grand Total" />
        <TableHeading text="Order Status" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {customerOrders.map(customerOrders => (
          <TableRow key={customerOrders._id} item={customerOrders}>
            
            <TextCell text={customerOrders.orderID} />
            <TextCell text={formatDate(customerOrders.deliveryDate)} />
            <TextCell text={customerOrders.subtotal} />
            <TextCell text={customerOrders.total} />
            <TextCell text={customerOrders.grandTotal} />
            <TextCell text={customerOrders.orderStatus} />
            <TableButtonCell>
            {(admin || cs || cx || executive || operationEmployee || marketing) && (
            <ViewDetailsButton
                label="Order Details"
                onClick={() => navigate(`/ViewCustomerOrderDetails/${customerOrders._id}`)}
            />
            )}
            </TableButtonCell>
              
          </TableRow>
        ))}
      </TableBody>
    </Table>
</TextEditorPageLayout>
  )
}

export default ViewCustomerOrders