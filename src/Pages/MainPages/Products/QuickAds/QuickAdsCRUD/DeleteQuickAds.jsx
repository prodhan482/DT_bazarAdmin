import { useState } from "react"

import DeleteConfirm from "../../../../../Components/common/DeleteConfirm"

import { deleteItem } from "../quickAdsService"

function DeleteQuickAds({ quickAds, onClose, onDeleteSuccess }) {

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
      title={"Delete Quick Ads"}
      handleDelete={handleDelete}
      id={quickAds._id}
      onClose={onClose}
      errorMessage={errorMessage}
    />
  )
}

export default DeleteQuickAds
