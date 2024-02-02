import React, { useState, useEffect } from "react";
import TextField from "../../../../Components/common/TextField";
import NumberInputField from "../../../../Components/common/NumberInputField";
import ImageUploader from "../../../../Components/common/ImageUploader";
import DescriptionField from "../../../../Components/common/DescriptionField";
import { addItem } from "./productService";
import { getItems as getBrands } from "../../Products/Brand/brandService";
import { getItems as getCategory } from "../../Products/Category/categoryService";
import { getItems as getPlasticTypes } from "../../Products/PlasticType/plasticTypeService";
import { getItems as getEmployee } from "../../Users/Employees/employeeService";
import { getItems as getSubCategory } from "../SubCategory/subCategoryService";
import { getItems as getSubSubCategory } from "../SubSubCategory/subSubCategoryService";
import ToggleSwitch from "../../../../Components/common/ToggleSwitch";
import { useNavigate } from "react-router-dom";
import ProductDropDown from "../../../../Components/common/ProductDropDown";
import PrecedenceField from "../../../../Components/common/PrecedenceField";

function AddProduct() {
  const employeeData = JSON.parse(localStorage.getItem("employee"));

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [precedence, setPrecedence] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  // const [subsubcategory, setSubSubCategory] = useState([]);
  // const [selectedSubSubCategory, setSelectedSubSubCategory] = useState();
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [weight, setWeight] = useState("");
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [plasticTypes, setPlasticTypes] = useState([]);
  const [selectedPlasticType, setSelectedPlasticType] = useState();
  const [isPlastic, setIsPlastic] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const [isBogo, setIsBogo] = useState(false);
  const [discountType, setDiscountType] = useState("percentage")
  const [discountAmount, setDiscountAmount] = useState("")
 const [allSubCategoryData, setAllSubCategoryData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchDropDowns = async () => {
      try {
        const employee = await getEmployee();
        const brandData = await getBrands();
        const catData = await getCategory();
        const subCategoryData = await getSubCategory();
        setAllSubCategoryData(subCategoryData);
        // const subSubCategoryData = await getSubSubCategory();
        const plasticTypeData = await getPlasticTypes();
        setPlasticTypes(plasticTypeData);
        setBrand(brandData);
        setCategories(catData);
        
       
        // const filteredSubCategoryData = subCategoryData.filter(
        //   (subCategory) => subCategory.category === selectedCategory
        // );
        // setSubCategory(filteredSubCategoryData);
        
      
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
  
    fetchDropDowns();
  }, [selectedCategory]);

  useEffect(() => {
  
    const filteredSubCategoryData = allSubCategoryData.filter(
      (subCategory) => subCategory.category === selectedCategory
    );
    setSubCategory(filteredSubCategoryData);
  }, [selectedCategory, allSubCategoryData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const formData = {
        name,
        image,
        sku,
        price,
        qty,
        productWeight,
        precedence: precedence,
        brand: selectedBrand ? selectedBrand : null,
        employee: employeeData._id,
        category: selectedCategory,
        subcategory: selectedSubCategory ? selectedSubCategory : null,
        // subsubcategory: selectedSubSubCategory,
        shortDescription,
        description,
        isVisible: visibility,
        isPlastic: isPlastic,
        // plasticType: isPlastic === "true" ?  plasticTypes: selectedPlasticType,
        // weight: isPlastic === "true" ? weight : null,
        isDiscount: isDiscount,
        isBogo: isBogo,
      };

      if (isPlastic) {
        formData.plasticType = selectedPlasticType;
        formData.weight = weight;
      }

      if (isDiscount) {
        formData.discountType = discountType;
        formData.discountAmount = discountAmount;
      }

      await addItem(formData);
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
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

  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
  };

  // const handleSubSubCategoryChange = (subSubCategoryId) => {
  //   setSelectedSubSubCategory(subSubCategoryId);
  // };

  const handlePlasticTypeChange = (plasticTypeId) => {
    setSelectedPlasticType(plasticTypeId);
  };


  return (
    <div className="w-full my-10 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Name"
            value={name}
            onChange={setName}
            placeholder="Name"
            required
          />
          <ImageUploader
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
          />
          <NumberInputField
            label="SKU"
            value={sku}
            onChange={setSku}
            placeholder="SKU"
          />
          <NumberInputField
            label="Price"
            value={price}
            onChange={setPrice}
            placeholder="Price"
            required
          />
          <NumberInputField
            label="Quantity"
            value={qty}
            onChange={setQty}
            placeholder="Quantity"
          />
          <TextField
            label="Product Weight"
            value={productWeight}
            onChange={setProductWeight}
            placeholder="Product Weight"
       
          />
          <PrecedenceField
            label="Precedence"
            value={precedence}
            onChange={setPrecedence}
            placeholder="Precedence"
          />
          <ProductDropDown
            label="Brand"
            options={brand}
            value={selectedBrand}
            onChange={handleBrandChange}
            
          />
          <ProductDropDown
            label="Category"
            options={categories}
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          />
          <ProductDropDown
            label="Sub Category"
            options={subcategory}
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
           
          />
          {/* <ProductDropDown
            label="Sub Sub Category"
            options={subsubcategory}
            value={selectedSubSubCategory}
            onChange={handleSubSubCategoryChange}
            required
          /> */}
          <DescriptionField
            label="Short Description"
            value={shortDescription}
            onChange={setShortDescription}
          />
          <DescriptionField
            label="Description"
            value={description}
            onChange={setDescription}
          />
          <ToggleSwitch
            id="visibilityToggle"
            label="Visibility"
            checked={visibility}
            onChange={() => setVisibility(!visibility)}
          />

          <ToggleSwitch
            id="isPlasticToggle"
            label="Is Plastic"
            checked={isPlastic}
            onChange={() => setIsPlastic(!isPlastic)}
          />
          {isPlastic && (
            <>
          <ProductDropDown
            label="Plastic Type"
            options={plasticTypes}
            value={selectedPlasticType}
            onChange={handlePlasticTypeChange}
            required={isPlastic}
          />
          <NumberInputField
            label="Plastic Weight"
            value={weight}
            onChange={setWeight}
            placeholder="Plastic Weight"
            required
          />
           </>
          )}
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
              <TextField
                label="Discount Amount"
                value={discountAmount}
                onChange={setDiscountAmount}
                placeholder="Discount Amount"
              />
            </>
          )}

          <ToggleSwitch
            id="isBogoToggle"
            label="BOGO Status"
            checked={isBogo}
            onChange={() => setIsBogo(!isBogo)}
          />

          <div className=" mt-5">
            <button
              type="submit"
              className="bg-[#10823A] hover:[#4DB63F] text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
