import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../achivementService"

function DeleteAchivement({ achivement, onClose, onDeleteSuccess }) {

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
      title={"Delete Achivement"}
      handleDelete={handleDelete}
      id={achivement._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeleteAchivement
