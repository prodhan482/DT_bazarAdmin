import { useState } from "react"

import AddFormLayout from "../../../../../Components/common/AddFormLayout"
import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addItem } from "../marqueeService"
import TextField from "../../../../../Components/common/TextField"
import ImageUploader from "../../../../../Components/common/ImageUploader"
import DescriptionField from "../../../../../Components/common/DescriptionField"

function AddMarquee({ onClose, onSuccess }) {

  const [name, setName] = useState("");


  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    try {
      
      await addItem(name);

      onSuccess();
    } catch (error) {

      setErrorMessage("Failed edit")
    }

  }

  return (
    <AddFormLayout title="Add Achivement" onSubmit={handleSubmit} onClose={onClose}>

      <TextField label="Name"
            value={name}
            onChange={setName}
            placeholder="name"
            required 
      />
  

      <ErrorMessage message={errorMessage} />
    </AddFormLayout>

  )
}

export default AddMarquee

