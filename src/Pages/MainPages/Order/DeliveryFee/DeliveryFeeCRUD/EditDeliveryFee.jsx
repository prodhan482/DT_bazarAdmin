import { useState } from "react";
import { parseISO } from "date-fns";
import TextField from "../../../../../Components/common/TextField";
import NumberInputField from "../../../../../Components/common/NumberInputField";
import ToggleSwitch from "../../../../../Components/common/ToggleSwitch";
import EditFormLayout from "../../../../../Components/common/EditFormLayout";
import DateField from "../../../../../Components/common/DateField";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";
import { editItem } from "../deliveryFeeService";

function EditDeliveryFee({ deliveryFee, onClose, onEditSuccess }) {
  const [name, setName] = useState(deliveryFee.name);
  const [minAmount, setMinAmount] = useState(deliveryFee.minAmount);
  const [maxAmount, setMaxAmount] = useState(deliveryFee.maxAmount);
  const [fee, setFee] = useState(deliveryFee.fee);
  const [isApplicable, setIsApplicable] = useState(deliveryFee.isApplicable);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();

    try {
      await editItem(deliveryFee._id, {
        name: name,
        minAmount: minAmount,
        isApplicable: isApplicable,
        fee: fee,
        maxAmount:maxAmount
      });

      onEditSuccess();
    } catch (error) {
      setErrorMessage("Failed edit");
    }
  };

  return (
    <EditFormLayout title="Edit Delivery Fee" onSubmit={handleSubmit} onClose={onClose}>
      <TextField
        id="name"
        label="Name"
        value={name}
        onChange={(value) => setName(value)}
        placeholder="Name"
        required
      />
      <NumberInputField
        id="minAmount"
        label="Minimum Amount"
        value={minAmount}
        onChange={(value) => setMinAmount(value)}
        required
      />
      <NumberInputField
        id="maxAmount"
        label="Maximum Amount"
        value={maxAmount}
        onChange={(value) => setMaxAmount(value)}
        required
      />
      <NumberInputField
        id="fee"
        label="Delivery Fee"
        value={fee}
        onChange={(value) => setFee(value)}
        required
      />
      <ToggleSwitch id="isApplicable" label="Is Applicable" checked={isApplicable} onChange={() => setIsApplicable(!isApplicable)} />
      <ErrorMessage message={errorMessage} />
    </EditFormLayout>
  );
}

export default EditDeliveryFee;
