import { useState } from "react";
import { parseISO } from "date-fns";
import TextField from "../../../../../Components/common/TextField";
import NumberInputField from "../../../../../Components/common/NumberInputField";
import ToggleSwitch from "../../../../../Components/common/ToggleSwitch";
import EditFormLayout from "../../../../../Components/common/EditFormLayout";
import DateField from "../../../../../Components/common/DateField";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";
import { editItem } from "../packageService";

function EditPackage({ packages, onClose, onEditSuccess }) {
  const [name, setName] = useState(packages.name);
  const [discountAmount, setDiscountAmount] = useState(packages.discountAmount);
  const [startDate, setStartDate] = useState(parseISO(packages.startDate));
  const [endDate, setEndDate] = useState(parseISO(packages.endDate));
  const [isActive, setIsActive] = useState(packages.isActive);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();

    try {
      await editItem(packages._id, {
        name: name,
        discountAmount: discountAmount,
        isActive: isActive,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      onEditSuccess();
    } catch (error) {
      setErrorMessage("Failed edit");
    }
  };

  return (
    <EditFormLayout title="Edit Package" onSubmit={handleSubmit} onClose={onClose}>
      <TextField
        id="name"
        label="Package Name"
        value={name}
        onChange={(value) => setName(value)}
        placeholder="Package Name"
        required
      />
      <NumberInputField
        id="discountAmount"
        label="Discount Amount"
        value={discountAmount}
        onChange={(value) => setDiscountAmount(value)}
        placeholder="Discount Amount"
        required
      />
      <DateField
        id="startDate"
        label="Start Date"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholder="Start Date"
        required
      />
      <DateField
        id="endDate"
        label="End Date"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholder="End Date"
        required
      />
      <ToggleSwitch id="isActive" label="Status" checked={isActive} onChange={() => setIsActive(!isActive)} />
      <ErrorMessage message={errorMessage} />
    </EditFormLayout>
  );
}

export default EditPackage;
