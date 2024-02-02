import { useState,useEffect } from "react"

import TextField from "../../../../../Components/common/TextField"
import ImageUploader from "../../../../../Components/common/ImageUploader"
import EditFormLayout from "../../../../../Components/common/EditFormLayout"
import { IMAGE_URL } from "../../../../../Utils/Api";

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { editItem } from "../brandService"


function EditBrand({ brand, onClose, onEditSuccess }) {

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState(brand.name)
  // const [link, setLink] = useState(brand.link)

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (brand.image) {
      setImagePreview(`${IMAGE_URL}${brand.image}`);
    }
  }, [brand.image]);

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
        name,
        // link
      };
      await editItem(brand._id, formData);
     
      onEditSuccess();
    } catch (error) {

      setErrorMessage("Failed edit")
  }

  }
  return (

    <EditFormLayout title={"Update Brand"} onClose={onClose} onSubmit={handleSubmit}>
          <ImageUploader
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
          />
          <TextField value={name} onChange={setName} />
          {/* <TextField value={link} onChange={setLink} /> */}
  
          <ErrorMessage message={errorMessage} />

    </EditFormLayout>

  )
}

export default EditBrand
