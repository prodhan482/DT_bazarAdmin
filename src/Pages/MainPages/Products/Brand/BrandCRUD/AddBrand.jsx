import { useState } from "react"

import AddFormLayout from "../../../../../Components/common/AddFormLayout"
import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addItem } from "../brandService"
import TextField from "../../../../../Components/common/TextField"
import ImageUploader from "../../../../../Components/common/ImageUploader"

function AddBrand({ onClose, onSuccess }) {

  const [name, setName] = useState("");
  // const [link, setLink] = useState("");
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
        name,
        // link,
      };
      await addItem(formData);

      onSuccess();
    } catch (error) {

      setErrorMessage("Failed edit")
    }

  }

  return (
    <AddFormLayout title="Add Brand" onSubmit={handleSubmit} onClose={onClose}>
      <ImageUploader
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />
      <TextField label="Name"
            value={name}
            onChange={setName}
            placeholder="Name"
            required 
      />
      {/* <TextField label="Link"
            value={link}
            onChange={setLink}
            placeholder="Link"
            required
       /> */}

      <ErrorMessage message={errorMessage} />
    </AddFormLayout>

  )
}

export default AddBrand

