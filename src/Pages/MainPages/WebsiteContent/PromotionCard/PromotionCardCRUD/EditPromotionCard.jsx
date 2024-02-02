import { useState,useEffect } from "react"
import { useParams } from "react-router-dom";

import ImageUploader from "../../../../../Components/common/ImageUploader"
import EditFormLayout from "../../../../../Components/common/EditFormLayout"

import { IMAGE_URL } from "../../../../../Utils/Api";

import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import TextField from "../../../../../Components/common/TextField";
import ProductDropDown from "../../../../../Components/common/ProductDropDown";

import { editItem, getSingleItems } from "../promotionCardService"

import { getItems as getCategory } from "../../../Products/Category/categoryService";


function EditPromotionCard({ promotionCard, onClose, onEditSuccess }) {

  // const { id } = useParams();
  // const [data, setData] = useState({
  //   categories: [],
  //   link:"",
  // });

  // const [image, setImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [link, setLink] = useState("")

  // const [errorMessage, setErrorMessage] = useState("")

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const singleItem = await getSingleItems(id);
  //       setData({
  //         ...data,
  //         ...singleItem,
  //         selectedCategory: singleItem.category,
  //       });
  //       setImagePreview(`${IMAGE_URL}${singleItem.image}`); 
  //       setLink(singleItem.link);
  //       setSelectedCategory(singleItem.category._id);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  
  //   const fetchDropDowns = async () => {
  //     try {
  //       const catData = await getCategory();
  //       setCategories(catData);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };
  
  //   fetchData();
  //   fetchDropDowns();
  // }, [id]);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [link, setLink] = useState(promotionCard.link);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(promotionCard.selectedCategory);

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (promotionCard.image) {
      setImagePreview(`${IMAGE_URL}${promotionCard.image}`);
    }
  }, [promotionCard.image]);

  
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
        link: link,
        category: selectedCategory,
      };
      await editItem(promotionCard._id, formData);
     
      onEditSuccess();
    } catch (error) {

      setErrorMessage("Failed edit")
  }

  }
  return (
    <EditFormLayout
      title={"Update Promotion Card"}
      onClose={onClose}
      onSubmit={handleSubmit}
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
        onChange={(value) => setLink(value)}
        placeholder="Link"
        required
      />

      <ErrorMessage message={errorMessage} />
    </EditFormLayout>
  );
}

export default EditPromotionCard
