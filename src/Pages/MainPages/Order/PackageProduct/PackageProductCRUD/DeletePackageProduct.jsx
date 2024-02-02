import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../packageProductService"

function DeletePackageProduct({ packageProduct, onClose, onDeleteSuccess }) {

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
      title={"Delete Package Product"}
      handleDelete={handleDelete}
      id={packageProduct._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeletePackageProduct
