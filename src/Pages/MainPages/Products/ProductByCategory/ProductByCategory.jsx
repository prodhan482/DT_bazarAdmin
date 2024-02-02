import { useState, useEffect } from "react"

import ProductByCategoryTable from "./ProductByCategoryTable"

import { getItems as getAllCategory } from "../Category/categoryService"
import TextEditorPageLayout from "../../../../Components/common/TextEditorPageLayout"

function ProductByCategory() {

  const [category, setCategory] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(null)
  
  const [errorMessage, setErrorMessage] = useState("")

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

  return (

    <TextEditorPageLayout
      title = "All Category"
      itemCount = {category.length}
      
    >

      <ProductByCategoryTable
        category={category}
        setSelectedCategory = {setSelectedCategory}
      />

      

    </TextEditorPageLayout>

  )
}

export default ProductByCategory
