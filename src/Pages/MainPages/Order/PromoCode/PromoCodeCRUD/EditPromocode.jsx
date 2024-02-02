import { useState } from "react"
import { parseISO } from "date-fns";
import TextField from "../../../../../Components/common/TextField"
import NumberInputField from "../../../../../Components/common/NumberInputField"
import EditFormLayout from "../../../../../Components/common/EditFormLayout"

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { editItem } from "../promoCodeService"
import DateField from "../../../../../Components/common/DateField"
import ToggleSwitch from "../../../../../Components/common/ToggleSwitch";

function EditPromoCode({ promoCode, onClose, onEditSuccess }) {
  const [name, setName] = useState(promoCode.name)
  const [description, setDescription] = useState(promoCode.description)
  const [promo, setPromo] = useState(promoCode.promo)
  const [maxlimit, setMaxLimit] = useState(promoCode.maxlimit)
  const [discountType, setDiscountType] = useState(promoCode.discountType)
  const [discountAmount, setDiscountAmount] = useState(promoCode.discountAmount)
  const [promotype, setPromoType] = useState(promoCode.promotype)
  const [customerPerUse, setCustomerPerUse] = useState(promoCode.customerPerUse)
  const [validStartDate, setValidStartDate] = useState(parseISO(promoCode.validStartDate))
  const [validEndDate, setValidEndDate] = useState(parseISO(promoCode.validEndDate))
  const [isPbcNumber, setIsPbcNumber] = useState(promoCode.isPbcNumber)
  const [isActive, setIsActive] = useState(promoCode.isActive)

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    onClose()

    try {
      const customerPerUseValue = promotype === 'custom' ? customerPerUse : null;
      await editItem(promoCode._id, {
        name: name,
        description: description,
        promo: promo,
        maxlimit: maxlimit,
        discountType: discountType,
        discountAmount: discountAmount,
        promotype: promotype,
        customerPerUse: customerPerUseValue,
        validStartDate: validStartDate.toISOString(),
        validEndDate: validEndDate.toISOString(),
        isActive: isActive,
        isPbcNumber: isPbcNumber,
      })

      onEditSuccess()

    } catch (error) {

      setErrorMessage("Failed edit")

    }
  }

  return (

    <EditFormLayout
      title="Edit PromoCode"
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
        onChange={(value) => setPromo(value)}
        placeholder="Promo"
        required
      />
      <label htmlFor="amount">Promo Type:</label>
      <select id="promoType" value={promotype} onChange={(e) => setPromoType(e.target.value)}>
        <option value="oneTime">One Time</option>
        <option value="custom">Custom</option>
        <option value="unlimited">unlimited</option>
      </select>

      {promotype === "custom" && (
      <>
      <NumberInputField
        label="Customer Per Use"
        value={customerPerUse}
        onChange={(value) => setCustomerPerUse(value)}
        required={promotype === 'custom'} 
        style={{ display: promotype === 'custom' ? 'block' : 'none' }} 
      />
      </>
      )}

      <NumberInputField label="Max Limit" value={maxlimit} onChange={(value) => setMaxLimit(value)} />

      <label htmlFor="amount">Discount Type:</label>
      <select id="discountType" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
        <option value="percentage">Percentage</option>
        <option value="amount">Amount</option>
      </select>

      <NumberInputField
        id="discountAmount"
        label="Discount Amount"
        value={discountAmount}
        onChange={(value) => setDiscountAmount(value)}
        placeholder="Discount Amount"
        required
      />

      <DateField
        id="validStartDate"
        label="Start Date"
        selected={validStartDate} 
        onChange={(date) => setValidStartDate(date)}
        placeholder="Start Date"
        required
      />
      <DateField
        id="validEndDate"
        label="End Date"
        selected={validEndDate}
        onChange={(date) => setValidEndDate(date)}
        placeholder="End Date"
        required
      />

      <ToggleSwitch id="isPbcNumber" label="Is Promo Code by Number" checked={isPbcNumber} onChange={() => setIsPbcNumber(!isPbcNumber)} />

      <ToggleSwitch id="isActive" label="Status" checked={isActive} onChange={() => setIsActive(!isActive)} />

      <ErrorMessage message={errorMessage} />

    </EditFormLayout>

  )
}

export default EditPromoCode
