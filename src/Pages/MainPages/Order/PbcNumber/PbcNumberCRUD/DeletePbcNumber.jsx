import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../pbcNumberService"

function DeletePbcNumber({ pbcNumber, onClose, onDeleteSuccess }) {

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
      title={"Delete Promo Code by Number"}
      handleDelete={handleDelete}
      id={pbcNumber._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeletePbcNumber
