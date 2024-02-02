import { useState } from "react"

import TextField from "../../../../../Components/common/TextField"
import NumberInputField from "../../../../../Components/common/NumberInputField"
import AddFormLayout from "../../../../../Components/common/AddFormLayout"

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addItem } from "../promoCodeService"
import DateField from "../../../../../Components/common/DateField"
import ToggleSwitch from "../../../../../Components/common/ToggleSwitch"
import DescriptionField from "../../../../../Components/common/DescriptionField"

function AddPromoCode({ onClose, onSuccess }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [promo, setPromo] = useState("")
  const [maxlimit, setMaxLimit] = useState("")
  const [discountType, setDiscountType] = useState("percentage")
  const [discountAmount, setDiscountAmount] = useState("")
  const [promotype, setPromoType] = useState("oneTime")
  const [customerPerUse, setCustomerPerUse] = useState("")
  const [validStartDate, setValidStartDate] = useState(new Date())
  const [validEndDate, setValidEndDate] = useState(new Date())
  const [isPbcNumber, setIsPbcNumber] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      onClose()

      await addItem({
        name: name,
        description: description,
        promo: promo,
        maxlimit: maxlimit,
        discountType: discountType,
        discountAmount: discountAmount,
        promotype: promotype,
        customerPerUse: promotype === "custom" ? customerPerUse : null,
        validStartDate: validStartDate,
        validEndDate: validEndDate,
        isPbcNumber: isPbcNumber,
        isActive: isActive,
      })

      onSuccess()

    } catch (error) {

      setErrorMessage("Add Failed")

    }
  }

  return (

    <AddFormLayout
      title="Add PromoCode"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <TextField
        label="name"
        value={name}
        onChange={setName}
        placeholder="Name"
        required
      />
      <TextField
        label="description"
        value={description}
        onChange={setDescription}
        placeholder="Description"
        required
      />
      
      <TextField
        label="promo"
        value={promo}
        onChange={setPromo}
        placeholder="Promo"
        required
      />

      <label htmlFor="amount">Promo Type:</label>
      <select id="promoType" value={promotype} onChange={(e) => setPromoType(e.target.value)}>
        <option value="oneTime">One Time</option>
        <option value="custom">Custom</option>
        <option value="unlimited">unlimited</option>
      </select>

      {/* <TextField
        label="Custom Promo Type"
        value={customPromoType}
        onChange={setCustomPromoType}
        placeholder="Custom Promo Type"
        required
      /> */} 

          {promotype === "custom" && (
            <>
              <NumberInputField label="Customer Per Use" value={customerPerUse} onChange={setCustomerPerUse} placeholder="Customer Per Use" style={{ display: promotype === "custom" ? "block" : "none" }}/>
            </>
          )}

      <NumberInputField label="Max Limit" value={maxlimit} onChange={setMaxLimit} placeholder="Max Limit"/>

      <label htmlFor="amount">Discount Type:</label>
      <select id="discountType" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
        <option value="percentage">Percentage</option>
        <option value="amount">Amount</option>
      </select>

      <NumberInputField label="Discount Amount" value={discountAmount} onChange={setDiscountAmount} placeholder="Discount Amount"/>

      <DateField label="Start Date" selected={validStartDate} onChange={(date) => setValidStartDate(date)}  placeholderText="MM/DD/YY"/>

      <DateField label="End Date" selected={validEndDate} onChange={(date) => setValidEndDate(date)}  placeholderText="MM/DD/YY"/>

      <ToggleSwitch
        id="isPbcNumber"
        label="Is Promo Code by Number"
        value={isPbcNumber}
        checked={isPbcNumber}
        onChange={() => setIsPbcNumber(!isPbcNumber)}
      />

      <ToggleSwitch
        id="isActive"
        label="Active Status"
        value={isActive}
        checked={isActive}
        onChange={() => setIsActive(!isActive)}
      />

      <ErrorMessage message={errorMessage} />

    </AddFormLayout>

  )
}

export default AddPromoCode
