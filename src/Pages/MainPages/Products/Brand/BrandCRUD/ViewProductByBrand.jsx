import { useState, useEffect } from "react"

import Table from "../../../../../Components/table/Table"
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../../Components/table/TableHeading"
import TextCell from "../../../../../Components/table/TextCell"
import TableRow from "../../../../../Components/table/TableRow"
import TableBody from "../../../../../Components/table/TableBody"
import { useNavigate, useParams } from "react-router-dom";
import TextEditorPageLayout from "../../../../../Components/common/TextEditorPageLayout"

import { getpProductByBrand } from "../brandService"

function ViewProductByBrand() {
  const { id } = useParams();
  const [productByBrand, setProductByBrand] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getpProductByBrand(id)
        setProductByBrand(response)

      } catch (error) {

        setErrorMessage("Error Product by Brand. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  return (
    <TextEditorPageLayout
    title = "All Product"
    itemCount = {productByBrand.length}
    onAddClick={() => setIsAddModalOpen(true)}
  >

    <Table>

      <TableHeadingRow>
      
        <TableHeading text="Product Name" />
        <TableHeading text="SKU" />
        <TableHeading text="Quantity" />
        <TableHeading text="Price" />
        <TableHeading text="Visibility" />
        <TableHeading text="Plastic" />
      </TableHeadingRow>

      <TableBody>
        {productByBrand.map(productByBrand => (
          <TableRow key={productByBrand._id} item={productByBrand}>
            
            <TextCell text={productByBrand.name} />
            <TextCell text={productByBrand.sku} />
            <TextCell text={productByBrand.quantity} />
            <TextCell text={productByBrand.price} />
            <TextCell text={`${productByBrand.isVisible}`} />
            <TextCell text={`${productByBrand.isPlastic}`} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
</TextEditorPageLayout>
  )
}

export default ViewProductByBrand