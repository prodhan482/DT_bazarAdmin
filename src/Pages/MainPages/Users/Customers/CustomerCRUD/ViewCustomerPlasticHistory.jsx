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

import { getPlasticInfos } from "../customerService"

function ViewCustomerPlasticHistory() {
  const { id } = useParams();
  const [customerPlastic, setCustomerPlastic] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("")

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getPlasticInfos(id)
        setCustomerPlastic(response)

      } catch (error) {

        setErrorMessage("Error Customer Plastic. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  return (
    <TextEditorPageLayout
    title = "Customer Plastic History"
    itemCount = {customerPlastic.length}
    onAddClick={() => setIsAddModalOpen(true)}
    >
   
    <Table>

      <TableHeadingRow>
      
        <TableHeading text="Order ID" />
        <TableHeading text="Product Name" />
        <TableHeading text="Quantity" />
        <TableHeading text="Unit Plastic Point" />
        <TableHeading text="Total Plastic Point" />
        <TableHeading text="Order Date" />
      </TableHeadingRow>

      <TableBody>
        {customerPlastic.map(customerPlastic => (
          <TableRow key={customerPlastic._id} item={customerPlastic}>
            <TextCell text={customerPlastic.orderID} />
            <TextCell text={customerPlastic.product} />
            <TextCell text={customerPlastic.quantity} />
            <TextCell text={customerPlastic.unitPlasticPoint} />
            <TextCell text={customerPlastic.totalPlasticPoint} />
            <TextCell text={customerPlastic.orderDate} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
</TextEditorPageLayout>
  )
}

export default ViewCustomerPlasticHistory