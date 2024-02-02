import { useState, useEffect } from "react"

import CategoryTable from "./CategoryTable"
import ViewCategory from "./CategoryCRUD/ViewCategory"
import EditCategory from "./CategoryCRUD/EditCategory"
import DeleteCategory from "./CategoryCRUD/DeleteCategory"
import AddCategory from "./CategoryCRUD/AddCategory"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./categoryService"

function Category() {

  const [category, setCategory] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItems()
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

    <PageLayout
      title = "All Category"
      itemCount = {category.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <CategoryTable
        category={category}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedCategory = {setSelectedCategory}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewCategory
            category = {selectedCategory}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal>
          <AddCategory
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditCategory
            category = {selectedCategory}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteCategory
            category = {selectedCategory}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default Category
