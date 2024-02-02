import { useState } from "react";
import TextField from "../../../../../Components/common/TextField";
import EditFormLayout from "../../../../../Components/common/EditFormLayout";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";
import { editItem } from "../timeSlotService";

function EditTimeSlot({ timeSlot, onClose, onEditSuccess }) {
  const [startTime, setStartTime] = useState(timeSlot.startTime);
  const [endTime, setEndTime] = useState(timeSlot.endTime);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();

    try {
      await editItem(timeSlot._id, {
        startTime,
        endTime,
      });

      onEditSuccess();
    } catch (error) {
      setErrorMessage("Failed edit");
    }
  };

  return (
    <EditFormLayout title="Edit TimeSlot" onSubmit={handleSubmit} onClose={onClose}>
      <TextField
        id="startTime"
        label="Start Time"
        value={startTime}
        onChange={(value) => setStartTime(value)}
        placeholder="Start Time"
        required
      />
        <TextField
        id="endTime"
        label="End Time"
        value={endTime}
        onChange={(value) => setEndTime(value)}
        placeholder="End Time"
        required
      />
      <ErrorMessage message={errorMessage} />
    </EditFormLayout>
  );
}

export default EditTimeSlot;
