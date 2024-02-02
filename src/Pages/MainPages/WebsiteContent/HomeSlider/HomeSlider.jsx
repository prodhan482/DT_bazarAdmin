import { useState, useEffect } from "react"

import HomeSliderTable from "./HomeSliderTable"
import ViewHomeSlider from "./HomeSliderCRUD/ViewHomeSlider"
import EditHomeSlider from "./HomeSliderCRUD/EditHomeSlider"
import DeleteSlider from "./HomeSliderCRUD/DeleteSlider"
import AddSlider from "./HomeSliderCRUD/AddSlider"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./homeSliderService"

function HomeSlider() {

  const [homeSlider, sethomeSlider] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedHomeSlider, setSelectedHomeSlider] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItems()
        sethomeSlider(response)

      } catch (error) {

        setErrorMessage("Error HomeSlider. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All HomeSlider"
      itemCount = {homeSlider.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <HomeSliderTable
        homeSlider={homeSlider}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedHomeSlider = {setSelectedHomeSlider}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewHomeSlider
            homeSlider = {selectedHomeSlider}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal>
          <AddSlider
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditHomeSlider
            homeSlider = {selectedHomeSlider}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteSlider
            homeSlider = {selectedHomeSlider}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default HomeSlider
