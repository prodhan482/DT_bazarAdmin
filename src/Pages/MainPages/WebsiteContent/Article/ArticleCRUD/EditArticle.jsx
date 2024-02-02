import { useState,useEffect } from "react"

import TextField from "../../../../../Components/common/TextField"
import TextEditorDescriptionField from "../../../../../Components/common/TextEditorDescriptionField"
import ImageUploader from "../../../../../Components/common/ImageUploader"
import EditFormLayout from "../../../../../Components/common/EditFormLayout"

import { IMAGE_URL } from "../../../../../Utils/Api";

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { editItem } from "../articleService"


function EditArticle({ article, onClose, onEditSuccess }) {

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState(article.title)
  const [description, setDescription] = useState(article.description)

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (article.image) {
      setImagePreview(`${IMAGE_URL}${article.image}`);
    }
  }, [article.image]);

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
      await editItem(article._id, formData);
     
      onEditSuccess();
    } catch (error) {

      setErrorMessage("Failed edit")
  }

  }
  return (

    <EditFormLayout title={"Update Article"} onClose={onClose} onSubmit={handleSubmit}>
          <ImageUploader
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
          />
          <TextField value={title} onChange={setTitle} />
          <TextEditorDescriptionField value={description} onChange={setDescription} />
  
          <ErrorMessage message={errorMessage} />

    </EditFormLayout>

  )
}

export default EditArticle
