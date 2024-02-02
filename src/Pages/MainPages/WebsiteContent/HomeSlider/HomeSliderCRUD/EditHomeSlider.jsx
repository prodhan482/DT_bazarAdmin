import { useState, useEffect } from "react";
import { editItem } from "../homeSliderService";
import { IMAGE_URL } from "../../../../../Utils/Api";
import PrecedenceField from "../../../../../Components/common/PrecedenceField";
import ImageUploader from "../../../../../Components/common/ImageUploader";
import EditFormLayout from "../../../../../Components/common/EditFormLayout";
import TextField from "../../../../../Components/common/TextField"


function EditHomeSlider({ homeSlider, onClose, onSuccess }) {
  const [precedence, setPrecedence] = useState(homeSlider.precedence);
  const [link, setLink] = useState(homeSlider.link);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (homeSlider.image) {
      setImagePreview(`${IMAGE_URL}${homeSlider.image}`);
    }
  }, [homeSlider.image]);

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
        link,
        precedence,
      };
      await editItem(homeSlider._id, formData);

      onSuccess();
    } catch (error) { }
    window.location.reload(true);
  };

  return (
    <EditFormLayout title={"Update Slider"} onClose={onClose} onSubmit={handleSubmit}>
      <ImageUploader
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />
      <PrecedenceField value={precedence} onChange={setPrecedence} />
      <TextField
        label="Link"
        value={link}
        onChange={setLink}
        required
      />
    </EditFormLayout>
  );
}

export default EditHomeSlider;
