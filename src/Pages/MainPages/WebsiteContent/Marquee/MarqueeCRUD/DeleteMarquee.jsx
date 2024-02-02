import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../marqueeService"

function DeleteMarquee({ marquee, onClose, onDeleteSuccess }) {

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
      title={"Delete Marquee"}
      handleDelete={handleDelete}
      id={marquee._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeleteMarquee
