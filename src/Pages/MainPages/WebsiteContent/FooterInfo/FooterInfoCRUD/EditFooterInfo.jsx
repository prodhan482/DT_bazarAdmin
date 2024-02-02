import { useState,useEffect } from "react"

import TextField from "../../../../../Components/common/TextField"
import DescriptionField from "../../../../../Components/common/DescriptionField"
import ImageUploader from "../../../../../Components/common/ImageUploader"
import EmailField from "../../../../../Components/common/EmailField"
import NumberInputField from "../../../../../Components/common/NumberInputField"
import EditFormLayout from "../../../../../Components/common/EditFormLayout"
import { IMAGE_URL } from "../../../../../Utils/Api";

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { editItem } from "../footerInfoService"


function EditFooterInfo({ footerInfo, onClose, onEditSuccess }) {

  const [logo, setLogo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState(footerInfo.description)
  const [address, setAddress] = useState(footerInfo.address)
  const [email, setEmail] = useState(footerInfo.email)
  const [mobile, setMobile] = useState(footerInfo.mobile)

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (footerInfo.logo) {
      setImagePreview(`${IMAGE_URL}${footerInfo.logo}`);
    }
  }, [footerInfo.logo]);

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
        logo: logo || null,
        email,
        description,
        address,
        mobile
      };
      await editItem(footerInfo._id, formData);
     
      onEditSuccess();
    } catch (error) {

      setErrorMessage("Failed edit")
  }

  }
  return (

    <EditFormLayout title={"Update Footer Information"} onClose={onClose} onSubmit={handleSubmit}>
      <ImageUploader
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />
      <DescriptionField value={description} onChange={setDescription} />
      <TextField label="Address"
        value={address}
        onChange={setAddress}
        required
      />
      <NumberInputField label="Mobile"
        value={mobile}
        onChange={setMobile}
        required
      />
      <EmailField label="Email"
        value={email}
        setEmail={setEmail}
        required
      />
      <ErrorMessage message={errorMessage} />

    </EditFormLayout>

  )
}

export default EditFooterInfo
