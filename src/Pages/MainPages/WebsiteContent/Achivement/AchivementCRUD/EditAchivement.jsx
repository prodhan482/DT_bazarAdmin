import { useState,useEffect } from "react"

import TextField from "../../../../../Components/common/TextField"
import DescriptionField from "../../../../../Components/common/DescriptionField"
import ImageUploader from "../../../../../Components/common/ImageUploader"
import EditFormLayout from "../../../../../Components/common/EditFormLayout"
import { IMAGE_URL } from "../../../../../Utils/Api";

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { editItem } from "../achivementService"


function EditAchivement({ achivement, onClose, onEditSuccess }) {

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState(achivement.title)
  const [description, setDescription] = useState(achivement.description)

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (achivement.image) {
      setImagePreview(`${IMAGE_URL}${achivement.image}`);
    }
  }, [achivement.image]);

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
        image: image || null,
        title,
        description
      };
      await editItem(achivement._id, formData);
     
      onEditSuccess();
    } catch (error) {

      setErrorMessage("Failed edit")
  }

  }
  return (

    <EditFormLayout title={"Update Achivement"} onClose={onClose} onSubmit={handleSubmit}>
          <ImageUploader
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
          />
          <TextField value={title} onChange={setTitle} />
          <DescriptionField value={description} onChange={setDescription} />
  
          <ErrorMessage message={errorMessage} />

    </EditFormLayout>

  )
}

export default EditAchivement
