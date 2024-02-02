import { useState, useEffect } from "react";

import { editItem } from "../categoryService";

import ImageUploader from "../../../../../Components/common/ImageUploader";
import TextField from "../../../../../Components/common/TextField";
import PrecedenceField from "../../../../../Components/common/PrecedenceField";
import NumberInputField from "../../../../../Components/common/NumberInputField";
import ToggleSwitch from "../../../../../Components/common/ToggleSwitch";
import EditFormLayout from "../../../../../Components/common/EditFormLayout";

import { IMAGE_URL } from "../../../../../Utils/Api";

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

function EditCategory({ category, onClose, onSuccess }) {
  const [name, setName] = useState(category.name);
  const [image, setImage] = useState(null);
  const [precedence, setPrecedence] = useState(category.precedence);
  // const [sqlId, setSqlId] = useState(category.sqlId);
  // const [productCount, setProductCount] = useState(category.productCount);
  // const [level, setLevel] = useState(category.level);
  const [isActive, setIsActive] = useState(category.isActive);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDiscount, setIsDiscount] = useState(category.isDiscount);
  const [discountType, setDiscountType] = useState(category.discountType)
  const [discountAmount, setDiscountAmount] = useState(category.discountAmount)
  const [errorMessage, setErrorMessage] = useState("")
  //   const [category, setCategory] = useState([]);

  //   useEffect(() => {
  //     const fetchDropDowns = async () => {
  //       try {
  //         const categoryData = await getAllCategory();
  //         setCategory(categoryData);
  //         setSeletedCategory(items.category);
  //       } catch (error) {
  //         console.error("Error fetching categories:", error);
  //       }
  //     };

  //     fetchDropDowns();
  //   }, []);
  useEffect(() => {
    if (category.image) {
      setImagePreview(`${IMAGE_URL}${category.image}`);
    }
  }, [category.image]);
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
        name,
        image,
        precedence,
        // sqlId,
        // productCount,
        // level,
        isActive: isActive ? true : "false",
        isDiscount: isDiscount ? true : "false",
      };

      if (isDiscount) {
        formData.discountType = discountType;
        formData.discountAmount = discountAmount;
      }

      await editItem(category._id, formData);

      onSuccess();

    } catch (error) {

      setErrorMessage("Failed edit")

    }
    window.location.reload(true);
    // setTimeout(() => {
    //   window.location.reload(true);
    // }, 1000);
  }

  const handleChange = (selected) => {
    setSeletedCategory(selected);
  };

  return (
    <EditFormLayout
      title="Edit Category"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <ImageUploader
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />
      <TextField
        label="Name"
        value={name}
        onChange={setName}
        placeholder="Name"
        required
      />
      <PrecedenceField value={precedence} onChange={setPrecedence} />
      {/* <NumberInputField value={sqlId} onChange={setSqlId} label={"SQL Id"} placeholder={"SQL Id"}/>
       <NumberInputField value={productCount} onChange={setProductCount} label={"Product Count"} placeholder={"Product Count"}/>
       <NumberInputField value={level} onChange={setLevel} label={"Level"} placeholder={"Level"}/> */}
      <ToggleSwitch
        id="visibility"
        label="Status"
        checked={isActive}
        onChange={() => setIsActive(!isActive)}
      />
      <ToggleSwitch
        id="isDiscountToggle"
        label="Discount Status"
        checked={isDiscount}
        onChange={() => setIsDiscount(!isDiscount)}
      />
      {isDiscount && (
        <>
          <label htmlFor="discountType">Discount Type</label>
          <select
            id="discountType"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option value="percentage">Percentage</option>
            <option value="fixedAmount">Fixed Amount</option>
          </select>
          <NumberInputField
            label="Discount Amount"
            value={discountAmount}
            onChange={setDiscountAmount}
            placeholder="Discount Amount"
          />
        </>
      )}
      <ErrorMessage message={errorMessage} />
    </EditFormLayout>
  );
}

export default EditCategory;
