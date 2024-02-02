import { useState } from "react";
import { addItem } from "../paymentTypeService"
import TextField from "../../../../../Components/common/TextField";
import AddFormLayout from "../../../../../Components/common/AddFormLayout";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";

function AddPaymentType({ onClose, onSuccess }) {
    const [name, setName] = useState("");
    const [paymentValue, setPaymentValue] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        try {
    
          onClose()
    
          await addItem({
            name: name,
            paymentValue: paymentValue,
          })
    
          onSuccess()
    
        } catch (error) {
    
          setErrorMessage("Add Failed")
    
        }
      }
    
      return (
    
        <AddFormLayout
          title="Add Payment Type"
          onSubmit={handleSubmit}
          onClose={onClose}
        >
    
          <TextField
            label="Payment Type"
            value={name}
            onChange={setName}
            placeholder="Payment Type"
            required
          />

          <TextField
            label="Payment Value"
            value={paymentValue}
            onChange={setPaymentValue}
            placeholder="Payment Value"
            required
          />
    
          <ErrorMessage message={errorMessage} />
    
        </AddFormLayout>
    
      )
    }
export default AddPaymentType;



