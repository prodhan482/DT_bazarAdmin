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

  return (

    <TextEditorPageLayout
      title = "All Sub-Category"
      itemCount = {subCategory.length}
      
    >

      <ProductBySubCategoryTable
        subCategory={subCategory}
        setSelectedSubCategory = {setSelectedSubCategory}
      />

      

    </TextEditorPageLayout>

  )
}

export default ProductBySubCategory
