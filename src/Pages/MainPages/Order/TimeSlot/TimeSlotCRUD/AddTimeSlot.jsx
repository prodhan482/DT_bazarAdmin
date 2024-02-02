import { useState } from "react"

import TextField from "../../../../../Components/common/TextField"
import AddFormLayout from "../../../../../Components/common/AddFormLayout"
import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addItem } from "../timeSlotService"

function AddTimeSlot({ onClose, onSuccess }) {

  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      onClose()

      await addItem({
        startTime: startTime,
        endTime: endTime,
      })

      onSuccess()

    } catch (error) {

      setErrorMessage("Add Failed")

    }
  }

  return (

    <AddFormLayout
      title="Add TimeSlot"
      onSubmit={handleSubmit}
      onClose={onClose}
    >

      <TextField
        label="Start Time"
        value={startTime}
        onChange={setStartTime}
        placeholder="Start Time"
        required
        />
        <TextField
        label="End Time"
        value={endTime}
        onChange={setEndTime}
        placeholder="End Time"
        required
        />

      <ErrorMessage message={errorMessage} />

    </AddFormLayout>

  )
}

export default AddTimeSlot
