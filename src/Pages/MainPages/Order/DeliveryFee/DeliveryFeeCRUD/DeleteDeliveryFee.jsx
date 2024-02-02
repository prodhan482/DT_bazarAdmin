import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../deliveryFeeService"

function DeleteDeliveryFee({ deliveryFee, onClose, onDeleteSuccess }) {

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
      title={"Delete Delivery Fee"}
      handleDelete={handleDelete}
      id={deliveryFee._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeleteDeliveryFee
