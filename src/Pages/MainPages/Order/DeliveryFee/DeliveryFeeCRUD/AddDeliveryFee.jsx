import { useState } from "react"

import TextField from "../../../../../Components/common/TextField"
import NumberInputField from "../../../../../Components/common/NumberInputField"
import ToggleSwitch from "../../../../../Components/common/ToggleSwitch"
import AddFormLayout from "../../../../../Components/common/AddFormLayout"
import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addItem } from "../deliveryFeeService"

function AddDeliveryFee({ onClose, onSuccess }) {

  const [name, setName] = useState("")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [fee, setFee] = useState("")
  const [isApplicable, setIsApplicable] = useState(true)

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      onClose()

      await addItem({
        name: name,
        minAmount: minAmount,
        isApplicable: isApplicable,
        maxAmount: maxAmount,
        fee: fee,
      })

      onSuccess()

    } catch (error) {

      setErrorMessage("Add Failed")

    }
  }

  return (

    <AddFormLayout
      title="Add Delivery Fee"
      onSubmit={handleSubmit}
      onClose={onClose}
    >

      <TextField
        label="Name"
        value={name}
        onChange={setName}
        placeholder="Name"
        required
      />

      <NumberInputField label="Minimum Amount" value={minAmount} onChange={setMinAmount} placeholder="Minimum Amount"/>
      <NumberInputField label="Maximum Amount" value={maxAmount} onChange={setMaxAmount} placeholder="Maximum Amount"/>
      <NumberInputField label="Delivery Fee" value={fee} onChange={setFee} placeholder="Delivery Fee"/>

      <ToggleSwitch
        id="isApplicable"
        label="Is Applicable"
        value={isApplicable == true}
        checked={isApplicable}
        onChange={() => setIsApplicable(!isApplicable)}
      />

      <ErrorMessage message={errorMessage} />

    </AddFormLayout>

  )
}

export default AddDeliveryFee
