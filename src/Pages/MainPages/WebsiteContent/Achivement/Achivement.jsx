import { useState, useEffect } from "react"

import AchivementTable from "./AchivementTable"
import ViewAchivement from "./AchivementCRUD/ViewAchivement"
import EditAchivement from "./AchivementCRUD/EditAchivement"
import DeleteAchivement from "./AchivementCRUD/DeleteAchivement"
import AddAchivement from "./AchivementCRUD/AddAchivement"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./achivementService"

function Achivement() {

  const [achivement, setAchivement] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedAchivement, setSelectedAchivement] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItems()
        setAchivement(response)

      } catch (error) {

        setErrorMessage("Error Achivement. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All Achivement"
      itemCount = {achivement.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <AchivementTable
        achivement={achivement}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedAchivement = {setSelectedAchivement}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewAchivement
            achivement = {selectedAchivement}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal>
          <AddAchivement
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditAchivement
            achivement = {selectedAchivement}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteAchivement
            achivement = {selectedAchivement}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default Achivement
