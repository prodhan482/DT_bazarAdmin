import { useState, useEffect } from "react"

import BrandTable from "./BrandTable"
import ViewBrand from "./BrandCRUD/ViewBrand"
import EditBrand from "./BrandCRUD/EditBrand"
import DeleteBrand from "./BrandCRUD/DeleteBrand"
import AddBrand from "./BrandCRUD/AddBrand"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./brandService"

function Brand() {

  const [brand, setBrand] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedBrand, setSelectedBrand] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItems()
        setBrand(response)

      } catch (error) {

        setErrorMessage("Error Brand. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All Brand"
      itemCount = {brand.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <BrandTable
        brand={brand}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedBrand = {setSelectedBrand}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewBrand
            brand = {selectedBrand}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal>
          <AddBrand
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditBrand
            brand = {selectedBrand}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteBrand
            brand = {selectedBrand}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default Brand
