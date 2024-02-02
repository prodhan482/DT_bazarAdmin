import { useState, useEffect } from "react";

import AddFormLayout from "../../../../../Components/common/AddFormLayout";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";

import { addItem } from "../promotionCardService";
import { getItems as getCategory } from "../../../Products/Category/categoryService";

import ImageUploader from "../../../../../Components/common/ImageUploader";
import TextField from "../../../../../Components/common/TextField";
import ProductDropDown from "../../../../../Components/common/ProductDropDown";

function AddPromotionCard({ onClose, onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [link, setLink] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDropDowns = async () => {
      try {
        const catData = await getCategory();
        setCategories(catData);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchDropDowns();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

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
        link: link,
        category: selectedCategory,
      };
      await addItem(formData);

      onSuccess();
    } catch (error) {
      setErrorMessage("Failed edit");
    }
  };

  return (
    <AddFormLayout
      title="Add Promotion Card"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <ProductDropDown
        label="Category"
        options={categories}
        value={selectedCategory}
        onChange={setSelectedCategory}
        required
      />
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

      <ErrorMessage message={errorMessage} />
    </AddFormLayout>
  );
}

export default AddPromotionCard;
