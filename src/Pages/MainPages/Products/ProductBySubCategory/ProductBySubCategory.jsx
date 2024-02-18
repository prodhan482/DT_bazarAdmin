import { useState, useEffect } from "react"

import ProductBySubCategoryTable from "./ProductBySubCategoryTable"

import { getItems as getAllSubCategory } from "../SubCategory/subCategoryService"
import TextEditorPageLayout from "../../../../Components/common/TextEditorPageLayout"

function ProductBySubCategory() {

  const [subCategory, setSubCategory] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getAllSubCategory()
        setSubCategory(response)

      } catch (error) {

        setErrorMessage("Error Sub Category. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  const columns = [
    { field: "index", headerName: "#", flex: 1 },
    { field: "name", headerName: "Name", flex: 3},
    { field: "precedence", headerName: "Precedence", flex: 2 },
    { field: "active", headerName: "Active", flex: 2 },
  ];

  return (

    <TextEditorPageLayout
      title = "All Sub-Category"
      itemCount = {subCategory.length}
      
    >

      {/* <ProductBySubCategoryTable
        subCategory={subCategory}
        setSelectedSubCategory = {setSelectedSubCategory}
      /> */}

      {subCategory && subCategory.length > 0 ? (
        <ProductBySubCategoryTable
        subCategory={subCategory?.map((category, index) => ({
            id: category?._id,
            index: index + 1,
            name: category?.name,
          //   <ViewDetailsText
          //   label={category?.name}
          //   onClick={() =>  navigate(`/ViewProductByCategory/${id}`)}
          // />,
          precedence: category?.precedence,
          active: `${category.isActive}`,
          }))}
          columns={columns}
          // setIsViewModalOpen={setIsViewModalOpen}
          // setIsEditModalOpen={setIsEditModalOpen}
          setSelectedSubCategory={setSelectedSubCategory}
        />
      ) : (
        <div>Loading...</div>
      )}

    </TextEditorPageLayout>

  )
}

export default ProductBySubCategory
