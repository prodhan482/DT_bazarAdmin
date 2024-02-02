import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../brandService"

function DeleteBrand({ brand, onClose, onDeleteSuccess }) {

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
      title={"Delete Brand"}
      handleDelete={handleDelete}
      id={brand._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeleteBrand
