import { useState } from "react"

import AddFormLayout from "../../../../../Components/common/AddFormLayout"
import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addItem } from "../footerInfoService"
import TextField from "../../../../../Components/common/TextField"
import ImageUploader from "../../../../../Components/common/ImageUploader"
import DescriptionField from "../../../../../Components/common/DescriptionField"
import EmailField from "../../../../../Components/common/EmailField"
import NumberInputField from "../../../../../Components/common/NumberInputField"
import TextEditorFormLayout from "../../../../../Components/common/AddTextEditorFormLayout";

function AddFooterInfo({ onClose, onSuccess }) {

  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [description, setDescription] = useState("")
  const [logo, setLogo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null)

  const [errorMessage, setErrorMessage] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLogo(file);

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
        logo,
        address,
        email,
        mobile,
        description,
      };
      await addItem(formData);

      onSuccess();
    } catch (error) {

      setErrorMessage("Failed edit")
    }

  }

  return (
    <TextEditorFormLayout title="Add Footer Information" onSubmit={handleSubmit} onClose={onClose}>
      <ImageUploader
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />

      <DescriptionField label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Description"
        required
      />

      <DescriptionField label="Address"
        value={address}
        onChange={setAddress}
        placeholder="Address"
        required
      />
      <NumberInputField label="Mobile"
        value={mobile}
        onChange={setMobile}
        placeholder="Mobile"
        required
      />
      <EmailField label="Email"
        value={email}
        setEmail={setEmail}
        placeholder="Email"
        required
      />

      <ErrorMessage message={errorMessage} />
    </TextEditorFormLayout>

  )
}

export default AddFooterInfo

