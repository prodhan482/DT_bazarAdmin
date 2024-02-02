import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../timeSlotService"

function DeleteTimeSlot({ timeSlot, onClose, onDeleteSuccess }) {

  const [errorMessage, setErrorMessage] = useState("")

  const handleDelete = async (id) => {
    try {

      await deleteItem(id)
      onDeleteSuccess()
      onClose()

    } catch (error) {
      
      setErrorMessage("Delete Failed")

    }
  }
  return (
    <DeleteConfirm
      title={"Delete TimeSlot"}
      handleDelete={handleDelete}
      id={timeSlot._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeleteTimeSlot
