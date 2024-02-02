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

import { getProductBySubCategory } from "../productBySubCategoryService"

function ViewProductBySubCategory() {
  const { id } = useParams();
  const [productBySubCategory, setProductBySubCategory] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getProductBySubCategory(id)
        setProductBySubCategory(response)

      } catch (error) {

        setErrorMessage("Error Product by Sub-Category. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  return (
    <TextEditorPageLayout
    title = "Products"
    itemCount = {productBySubCategory.length}
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
        {productBySubCategory.map(productBySubCategory => (
          <TableRow key={productBySubCategory._id} item={productBySubCategory}>           
          <ImageCell>
                <TableImage img={productBySubCategory.image} />
          </ImageCell>
            <TextCell text={productBySubCategory.name} />
            <TextCell text={productBySubCategory.sku} />
            <TextCell text={productBySubCategory.productWeight} />
            <TextCell text={productBySubCategory.precedence} />
           
            <TextCell text={productBySubCategory.quantity} />
            <TextCell text={`${productBySubCategory.isVisible}`} />
            <TextCell text={`${productBySubCategory.isPlastic}`} />
            <TextCell text={productBySubCategory.price} /> 
            <TextCell text={`${productBySubCategory.isDiscount}`} />
            <TextCell text={productBySubCategory.discountAmount} />     
            <TextCell text={productBySubCategory.discountedAmount} />  
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </div>
</TextEditorPageLayout>
  )
}

export default ViewProductBySubCategory