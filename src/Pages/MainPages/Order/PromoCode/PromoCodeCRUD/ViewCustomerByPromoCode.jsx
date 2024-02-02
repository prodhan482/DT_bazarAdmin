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

import { getCustomerCountByPromoCode } from "../promoCodeService"

function ViewCustomerByPromoCode() {
  const { promo } = useParams();
  const [customerCountByPromoCode, setCustomerCountByPromoCode] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getCustomerCountByPromoCode(promo)
        setCustomerCountByPromoCode(response.customerInfoArray)

      } catch (error) {

        setErrorMessage("Error Customer Count by Promo Code. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  return (
    <TextEditorPageLayout
    title = "Customer List"
    itemCount = {customerCountByPromoCode.length}
    onAddClick={() => setIsAddModalOpen(true)}
  >


    <Table>

      <TableHeadingRow>
      
        <TableHeading text="Customer Name" />    
        <TableHeading text="Phone Number" />

      
      </TableHeadingRow>

      <TableBody>
        {customerCountByPromoCode.map(customerCountByPromoCode => (
          <TableRow key={customerCountByPromoCode._id} item={customerCountByPromoCode}>           
            <TextCell text={customerCountByPromoCode.name} />
            <TextCell text={customerCountByPromoCode.mobile} />
                   
          </TableRow>
        ))}
      </TableBody>
    </Table>
</TextEditorPageLayout>
  )
}

export default ViewCustomerByPromoCode