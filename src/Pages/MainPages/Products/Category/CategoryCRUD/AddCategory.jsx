import { useState } from "react"

import TextField from "../../../../../Components/common/TextField"
import ImageUploader from "../../../../../Components/common/ImageUploader";
import PrecedenceField from "../../../../../Components/common/PrecedenceField"
import AddFormLayout from "../../../../../Components/common/AddFormLayout"
import NumberInputField from "../../../../../Components/common/NumberInputField";
import ToggleSwitch from "../../../../../Components/common/ToggleSwitch";

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addItem } from "../categoryService"

function AddCategory({ onClose, onSuccess }) {

  const [name, setName] = useState("")
  const [precedence, setPrecedence] = useState("")
  const [image, setImage] = useState(null);
  // const [sqlId, setSqlId] = useState("");
  // const [productCount, setProductCount] = useState("");
  // const [level, setLevel] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDiscount, setIsDiscount] = useState(false);
  const [discountType, setDiscountType] = useState("percentage")
  const [discountAmount, setDiscountAmount] = useState("")

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
        name,
        precedence,
        // sqlId,
        // productCount,
        // level,
        isActive,
        isDiscount: isDiscount,
      };

      if (isDiscount) {
        formData.discountType = discountType;
        formData.discountAmount = discountAmount;
      }


     
      await addItem(formData);
      
      onSuccess();
    }  catch (error) {

      setErrorMessage("Add Failed")

    }
  }

  return (

    <AddFormLayout
      title="Add Category"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <ImageUploader
         imagePreview={imagePreview}
        handleImageChange={handleImageChange}
     />

      <TextField
        label="Category Name"
        value={name}
        onChange={setName}
        placeholder="Category Name"
        required
      />

      <PrecedenceField value={precedence} onChange={setPrecedence} />
      {/* <NumberInputField value={sqlId} onChange={setSqlId} label={"SQL Id"} placeholder={"SQL Id"}/>
      <NumberInputField value={productCount} onChange={setProductCount} label={"Product Count"} placeholder={"Product Count"}/>
      <NumberInputField value={level} onChange={setLevel} label={"Level"} placeholder={"Level"}/> */}
      <ToggleSwitch
        label="Status"
        id="isActive"
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

    </AddFormLayout>

  )
}

export default AddCategory
