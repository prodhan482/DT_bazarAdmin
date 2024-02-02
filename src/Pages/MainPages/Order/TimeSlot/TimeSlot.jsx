import { useState, useEffect } from "react"

import TimeSlotTable from "./TimeSlotTable"
import ViewTimeSlot from "./TimeSlotCRUD/ViewTimeSlot"
import EditTimeSlot from "./TimeSlotCRUD/EditTimeSlot"
import DeleteTimeSlot from "./TimeSlotCRUD/DeleteTimeSlot"
import AddTimeSlot from "./TimeSlotCRUD/AddTimeSlot"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./timeSlotService"

function TimeSlot() {

  const [timeSlot, setTimeSlot] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItems()
        setTimeSlot(response)

      } catch (error) {

        setErrorMessage("Error TimeSlot. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All TimeSlot"
      itemCount = {timeSlot.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <TimeSlotTable
        timeSlot={timeSlot}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedTimeSlot = {setSelectedTimeSlot}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewTimeSlot
            timeSlot = {selectedTimeSlot}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal>
          <AddTimeSlot
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditTimeSlot
            timeSlot = {selectedTimeSlot}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteTimeSlot
            timeSlot = {selectedTimeSlot}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default TimeSlot
