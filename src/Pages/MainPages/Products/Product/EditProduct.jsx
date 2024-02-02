import React, { useState, useEffect } from "react";
import TextField from "../../../../Components/common/TextField";
import NumberInputField from "../../../../Components/common/NumberInputField";
import ImageUploader from "../../../../Components/common/ImageUploader";
import DescriptionField from "../../../../Components/common/DescriptionField";
import { editItem, getSingleItems } from "./productService";
import { getItems as getBrands } from "../../Products/Brand/brandService";
import { getItems as getCategory } from "../../Products/Category/categoryService";
import { getItems as getPlasticTypes } from "../../Products/PlasticType/plasticTypeService";
import { getItems as getSubCategory } from "../SubCategory/subCategoryService";
import { getItems as getSubSubCategory } from "../SubSubCategory/subSubCategoryService";
import ToggleSwitch from "../../../../Components/common/ToggleSwitch";
import { useNavigate, useParams } from "react-router-dom";
import ProductDropDown from "../../../../Components/common/ProductDropDown";
import { IMAGE_URL } from "../../../../Utils/Api";
import PrecedenceField from "../../../../Components/common/PrecedenceField";

function EditProduct() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    sku: "",
    price: "",
    qty: "",
    productWeight:"",
    precedence:"",
    employee: "",
    subcategories: [],
    selectedSubCategory:"",
    // subsubcategories: [],
    selectedSubSubCategory:"",
    shortDescription: "",
    description: "",
    isVisible: Boolean,
    weight: "",
    brand: [],
    selectedBrand: "",
    categories: [],
    selectedCategory: "",
    plasticType: [],
    selectedPlasticType: "",
    isPlastic: Boolean,
    isDiscount: Boolean,
    isBogo: Boolean,
    discountType:"",
    discountAmount:"",
  });

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [precedence, setPrecedence] = useState("");
  const [employee, setEmployee] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  // const [subsubcategories, setSubSubCategories] = useState([]);
  // const [selectedSubSubCategory, setSelectedSubSubCategory] = useState();
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  // const [weight, setWeight] = useState("");
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  // const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [plasticType, setPlasticType] = useState([]);
  const [weight, setWeight] = useState("");
  const [selectedPlasticType, setSelectedPlasticType] = useState("");
  const [isPlastic, setIsPlastic] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const [isBogo, setIsBogo] = useState(false);
  // const [discountType, setDiscountType] = useState("percentage")
  // const [discountAmount, setDiscountAmount] = useState("")
  const [discountType, setDiscountType] = useState(isDiscount ? "percentage" : "N/A");
  const [discountAmount, setDiscountAmount] = useState(isDiscount ? "" : "N/A");
  const [discountedAmount, setDiscountedAmount] = useState("");
  const [allSubCategoryData, setAllSubCategoryData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleItem = await getSingleItems(id);
        setData({
          ...data,
          ...singleItem,
          selectedBrand: singleItem.brand,
          selectedCategory: singleItem.category,
          selectedSubCategory: singleItem.subcategory,
          // selectedSubSubCategory: singleItem.subsubcategory,
          selectedPlasticType: singleItem.plasticType,
        });
        setImagePreview(`${IMAGE_URL}${singleItem.image}`); 
        setName(singleItem.name);
        setSku(singleItem.sku);
        setPrice(singleItem.price);
        setQty(singleItem.quantity);
        setProductWeight(singleItem.productWeight);
        setWeight(singleItem.weight);
        setPrecedence(singleItem.precedence);
        setEmployee(singleItem.employee);
        setSelectedSubCategory(singleItem.subcategory);
        // setSelectedSubSubCategory(singleItem.subsubcategory._id);
        setShortDescription(singleItem.shortDescription);
        setDescription(singleItem.description);
        setIsVisible(singleItem.isVisible);
        // setWeight(singleItem.weight);
        setSelectedBrand(singleItem.brand);
        setSelectedCategory(singleItem.category._id);
        setIsPlastic(singleItem.isPlastic);
        setIsDiscount(singleItem.isDiscount);
        setIsBogo(singleItem.isBogo);
        setDiscountType(singleItem.discountType);
        setDiscountAmount(singleItem.discountAmount);
        setSelectedPlasticType(singleItem.plasticType._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const fetchDropDowns = async () => {
      try {
        const brandData = await getBrands();
        const catData = await getCategory();
        const subCategoryData = await getSubCategory();
        // const subSubCategoryData = await getSubSubCategory();
        const plasticTypeData = await getPlasticTypes();
        setPlasticType(plasticTypeData);
        setBrand(brandData);
        setCategories(catData);
        setSubCategories(subCategoryData);
        setAllSubCategoryData(subCategoryData);
        // setSubSubCategories(subSubCategoryData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
  
    fetchData();
    fetchDropDowns();
  }, [id]);

  useEffect(() => {
    // Filter subcategories based on selectedCategory
    const filteredSubCategoryData = allSubCategoryData.filter(
      (subCategory) => subCategory.category === data.selectedCategory
    );
    setSubCategories(filteredSubCategoryData);
  }, [data.selectedCategory, allSubCategoryData]);

  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const discountTypeValue = isDiscount === 'true' ? discountType : '';
      // const discountAmountValue = isDiscount === 'true' ? discountAmount : '';
     
      // const weightValue = isPlastic ? weight : null;
      // const plasticTypeValue = isPlastic ? selectedPlasticType : null;

      const brandValue = selectedBrand? selectedBrand._id  : null;
      // const subCategoryValue = selectedSubCategory ? selectedSubCategory._id : null;
      
      const formData = {
        name,
        image,
        sku,
        price,
        qty,
        productWeight: productWeight,
        precedence,
        brand: brandValue,
        category: selectedCategory ? selectedCategory : '',
        subcategory: selectedSubCategory ? selectedSubCategory : null,
        // subsubcategory:selectedSubSubCategory,
        shortDescription,
        description,
        isVisible: isVisible ? true : "false",
        isPlastic: isPlastic ? true : "false",
        plasticType: selectedPlasticType,
        weight: weight,
        isDiscount: isDiscount ? true : "false",
        isBogo: isBogo ? true : "false",
        discountType: discountType ,
        discountAmount: discountAmount ,
        discountedAmount: discountedAmount ,
      };

      if (discountType === 'fixedAmount') {
        
        formData.discountedAmount = price - discountAmount;
      }
      if (discountType === 'percentage') {
        
        formData.discountedAmount = price - (price*discountAmount/100);
      }

      await editItem(id,formData);
      navigate("/products");
    } catch (error) {
      console.error("Error editing product:", error);
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

  // const handlePlasticTypeChange = (plasticTypeId) => {
  //   setSelectedPlasticType(plasticTypeId);
  // };
  useEffect(() => {
  
    const filteredSubCategoryData = allSubCategoryData.filter(
      (subCategory) => subCategory.category === selectedCategory
    );
    setSubCategories(filteredSubCategoryData);
  }, [selectedCategory, allSubCategoryData]);
  return (
    <div className="w-full my-10 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
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
            onChange={setSelectedBrand}
            
          />
          <ProductDropDown
            label="Category"
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            required
          />
          {/* <TextField
            label="Sub Category"
            value={subcategory}
            onChange={setSubCategory}
            placeholder="Sub Category"
          />
          <TextField
            label="Sub Sub Category"
            value={subsubcategory}
            onChange={setSubSubCategory}
            placeholder="Sub Sub Category"
          /> */}
           <ProductDropDown
            label="Sub Category"
            options={subcategories}
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
           
          />
          {/* <ProductDropDown
            label="Sub Sub Category"
            options={subsubcategories}
            value={selectedSubSubCategory}
            onChange={setSelectedSubSubCategory}
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
            checked={isVisible}
            onChange={() => setIsVisible(!isVisible)}
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
            options={plasticType}
            value={selectedPlasticType}
            onChange={setSelectedPlasticType}
            required={isPlastic}
          />
          <NumberInputField
            label="Plastic Weight"
            value={weight}
            onChange={setWeight}
            placeholder="Plastic Weight"
            required={isPlastic}
          />
           </>
          )}
          <ToggleSwitch
            id="isDiscountToggle"
            label="Discount Status"
            checked={isDiscount}
            onChange={() => {
              setIsDiscount(!isDiscount);
              if (!isDiscount) {
                setDiscountType("N/A");
                setDiscountAmount("N/A");
              }
            }}
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
            label="BOGO"
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

export default EditProduct;
