import { useState, useEffect } from "react"

import ProductByCategoryTable from "./ProductByCategoryTable"

import { getItems as getAllCategory } from "../Category/categoryService"
import TextEditorPageLayout from "../../../../Components/common/TextEditorPageLayout"
import ViewDetailsButton from "../../../../Components/common/ViewDetailsButton";
import ViewDetailsText from "../../../../Components/common/ViewDetailsText";

import { useNavigate } from "react-router-dom";

function ProductByCategory() {

  const [category, setCategory] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate();

  useEffect(() => { 

    async function fetchData () {

      try {

        const response = await getAllCategory()
        setCategory(response)

      } catch (error) {

        setErrorMessage("Error Category. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  const columns = [
    { field: "index", headerName: "#", flex: 1 },
    { field: "image", headerName: "Image", flex: 2 },
    { field: "name", headerName: "Name", flex: 3 },
    { field: "precedence", headerName: "Precedence", flex: 2 },
    { field: "active", headerName: "Active", flex: 2 },
    { field: "discount", headerName: "Discount", flex: 2 },
    { field: "discountType", headerName: "Discount Type", flex: 2 },
    { field: "discountAmount", headerName: "Discount Amount", flex: 2 },
  ];

  return (

    <TextEditorPageLayout
      title = "All Category"
      itemCount = {category.length}
    >

      {/* <ProductByCategoryTable
        category={category}
        setSelectedCategory = {setSelectedCategory}
      /> */}

      {category && category.length > 0 ? (
        <ProductByCategoryTable
        category={category?.map((category, index) => ({
            id: category?._id,
            index: index + 1,
            name:  
            <ViewDetailsText
            label={category?.name}
            onClick={() =>  navigate(`/ViewProductByCategory/${id}`)}
          />,
          precedence: category?.precedence,
          active: `${category.isActive}`
            // email: category?.email,
            // mobile: category?.mobile,
            // group: category?.group,
            // action: (
            //   <ViewDetailsButton
            //     label="Edit Profile"
            //     onClick={() => {
            //       setSelectedCustomer(id);
            //       setIsEditModalOpen(true);
            //     }}
            //   />
            // ),
          }))}
          columns={columns}
          setIsViewModalOpen={setIsViewModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          setSelectedCategory={setSelectedCategory}
        />
      ) : (
        <div>Loading...</div>
      )}

    </TextEditorPageLayout>

  )
}

export default ProductByCategory
