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
import ImageCell from "../../../../../Components/table/ImageCell";
import TableImage from "../../../../../Components/table/TableImage";

import { getProductByCategory } from "../productByCategoryService"

function ViewProductByCategoryTable() {
  const { id } = useParams();
  const [productByCategory, setProductByCategory] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getProductByCategory(id)
        setProductByCategory(response)

      } catch (error) {

        setErrorMessage("Error Product by Category. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  return (
    <TextEditorPageLayout
    title = "Products"
    itemCount = {productByCategory.length}
    onAddClick={() => setIsAddModalOpen(true)}
  >

<div className="w-full ">
      <div className="overflow-x-scroll">
    <Table>

      <TableHeadingRow>
        <TableHeading text="Image" />
        <TableHeading text="Name" />  
        <TableHeading text="SKU" /> 
        <TableHeading text="Product Weight" /> 
        <TableHeading text="Precedence" />    
        
        <TableHeading text="Quantity" />
        <TableHeading text="Visibility" />
        <TableHeading text="Is Plastic" />
        <TableHeading text="Price" />
        <TableHeading text="Is Discount" />
        <TableHeading text="Discount Amount" /> 
        <TableHeading text="Discounted Amount" /> 
      
      </TableHeadingRow>

      <TableBody>
        {productByCategory.map(productByCategory => (
          <TableRow key={productByCategory._id} item={productByCategory}>           
          <ImageCell>
                <TableImage img={productByCategory.image} />
          </ImageCell>
            <TextCell text={productByCategory.name} />
            <TextCell text={productByCategory.sku} />
            <TextCell text={productByCategory.productWeight} />
            <TextCell text={productByCategory.precedence} />
           
            <TextCell text={productByCategory.quantity} />
            <TextCell text={`${productByCategory.isVisible}`} />
            <TextCell text={`${productByCategory.isPlastic}`} />
            <TextCell text={productByCategory.price} /> 
            <TextCell text={`${productByCategory.isDiscount}`} />
            <TextCell text={productByCategory.discountAmount} />     
            <TextCell text={productByCategory.discountedAmount} />  
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </div>
</TextEditorPageLayout>
  )
}

export default ViewProductByCategoryTable