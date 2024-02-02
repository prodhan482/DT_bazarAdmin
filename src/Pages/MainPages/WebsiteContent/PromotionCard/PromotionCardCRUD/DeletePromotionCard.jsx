import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../promotionCardService"

function DeletePromotionCard({ promotionCard, onClose, onDeleteSuccess }) {

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
      title={"Delete Promotion Card"}
      handleDelete={handleDelete}
      id={promotionCard._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeletePromotionCard
