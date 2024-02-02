import { useState } from "react";
import { editItem } from "../paymentTypeService";
import TextField from "../../../../../Components/common/TextField";
import EditFormLayout from "../../../../../Components/common/EditFormLayout";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";

function EditPaymentType({ paymentType, onClose, onEditSuccess }) {
  const [name, setName] = useState(paymentType.name);
  const [paymentValue, setPaymentValue] = useState(paymentType.paymentValue);

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    onClose()

    try {

      await editItem(paymentType._id, {
        name: name,
        paymentValue: paymentValue,
      })

      onEditSuccess()

    } catch (error) {

      setErrorMessage("Failed edit")

    }
  }

  return (

    <EditFormLayout
      title="Edit PaymentType"
      onSubmit={handleSubmit}
      onClose={onClose}
    >

      <TextField
        id="name"
        label="Payment Type"
        value={name}
        onChange={(value) => setName(value)}
        placeholder="Payment Type"
        required
      />

      <TextField
        id="paymentValue"
        label="Payment Value"
        value={paymentValue}
        onChange={(value) => setPaymentValue(value)}
        placeholder="Payment Value"
        required
      />

      <ErrorMessage message={errorMessage} />

    </EditFormLayout>

  )
}

export default EditPaymentType;
