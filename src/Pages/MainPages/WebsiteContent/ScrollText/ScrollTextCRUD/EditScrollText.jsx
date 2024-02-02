import { useState } from "react";
import { editItem } from "../scrollTextService";
import TextScrollField from "../../../../../Components/common/TextScrollField";
import EditFormLayout from "../../../../../Components/common/EditFormLayout";

function EditScrollText({ scrollText, onClose, onEditSuccess }) {
  const [name, setName] = useState(scrollText.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    try {
      await editItem(scrollText._id, {
        name: name,
        
      });
      onEditSuccess();
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EditFormLayout
      title="Edit Text Scroll" onSubmit={handleSubmit} onClose={onClose}
    >
      <TextScrollField
        id="name"
        label="Text Scroll"
        value={name}
        onChange={(value) => setName(value)}
        placeholder="Write Something...."
        required
      />

    </EditFormLayout>
  );
}

export default EditScrollText;
