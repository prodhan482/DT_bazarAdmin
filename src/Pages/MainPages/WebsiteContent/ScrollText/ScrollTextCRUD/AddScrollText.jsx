import TextField from "../../../../../Components/common/TextField";
import TextScrollField from "../../../../../Components/common/TextScrollField";
import { addItem } from "../scrollTextService";
import { useState } from "react";
import AddFormLayout from "../../../../../Components/common/AddFormLayout";

function AddScrollText({ onClose, onSuccess }) {
  const employeeData = JSON.parse(localStorage.getItem("employee"));
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    try {
      await addItem({
        employee: employeeData._id,
        name: name,
      });
     
      onSuccess();
    } catch (error) {}
  };
  return (
    <AddFormLayout title="Add Text Scroll" onSubmit={handleSubmit} onClose={onClose}>
      <TextScrollField
        label="Write Text Scroll"
        value={name}
        onChange={setName}
        placeholder="Write Something...."
        required
      />

    </AddFormLayout>
  );
}

export default AddScrollText;
