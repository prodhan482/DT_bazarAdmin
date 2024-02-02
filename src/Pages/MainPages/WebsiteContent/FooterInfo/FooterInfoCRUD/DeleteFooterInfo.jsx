import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../footerInfoService"

function DeleteFooterInfo({ footerInfo, onClose, onDeleteSuccess }) {

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
      title={"Delete Footer Information"}
      handleDelete={handleDelete}
      id={footerInfo._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeleteFooterInfo
