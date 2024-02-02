import { useState } from "react";
import { addItem } from "../homeSliderService";
import PrecedenceField from "../../../../../Components/common/PrecedenceField";
import ImageUploader from "../../../../../Components/common/ImageUploader";
import AddFormLayout from "../../../../../Components/common/AddFormLayout";
import TextField from "../../../../../Components/common/TextField"

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

function AddSlider({ onClose, onSuccess }) {
  const [precedence, setPrecedence] = useState("");
  const [link, setLink] = useState("");
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
        link,
        precedence,
      };
      await addItem(formData);

      onSuccess();
    } catch (error) {

      setErrorMessage("Add Failed")

    }
  };

  return (
    <AddFormLayout
      title="Add Slider"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <ImageUploader
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />
      <TextField
        label="Link"
        value={link}
        onChange={setLink}
        placeholder="Link"
        required
      />
      <PrecedenceField value={precedence} onChange={setPrecedence} />

      <ErrorMessage message={errorMessage} />
    </AddFormLayout>
  );
}

export default AddSlider;
