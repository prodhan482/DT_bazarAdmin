import { useState } from "react"

import AddFormLayout from "../../../../../Components/common/AddFormLayout"
import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addItem } from "../achivementService"
import TextField from "../../../../../Components/common/TextField"
import ImageUploader from "../../../../../Components/common/ImageUploader"
import DescriptionField from "../../../../../Components/common/DescriptionField"

function AddAchivement({ onClose, onSuccess }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [errorMessage, setErrorMessage] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    try {
      const formData = {
        image,
        title,
        description,
      };
      await addItem(formData);

      onSuccess();
    } catch (error) {

      setErrorMessage("Failed edit")
    }

  }

  return (
    <AddFormLayout title="Add Achivement" onSubmit={handleSubmit} onClose={onClose}>
      <ImageUploader
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />
      <TextField label="Title"
            value={title}
            onChange={setTitle}
            placeholder="Title"
            required 
      />
      <DescriptionField label="Description"
            value={description}
            onChange={setDescription}
            placeholder="Description"
            required
       />

      <ErrorMessage message={errorMessage} />
    </AddFormLayout>

  )
}

export default AddAchivement

