// import { useState, useEffect } from "react"

// import NumberInputField from "../../../../../Components/common/NumberInputField"
// import AddFormLayout from "../../../../../Components/common/AddFormLayout"
// import ProductDropDown from "../../../../../Components/common/ProductDropDown"

// import ErrorMessage from "../../../../../Components/common/ErrorMessage"

// import { addItem } from "../packageProductService"
// import { getItems as getPromoPackage } from "../../../Order/Package/packageService"
// import { getItems as getProductName } from "../../../Products/Product/productService"

// function AddPackageProduct({ onClose, onSuccess }) {
//   const [productSku, setProductSku] = useState("")
//   const [promoPackage, setPromoPackage] = useState([])
//   const [selectedPromoPackage, setSelectedPromoPackage] = useState()
//   const [productName, setProductName] = useState([])
//   const [selectedProductName, setSelectedProductName] = useState()

//   const [errorMessage, setErrorMessage] = useState("")

//   useEffect(() => {
//     const fetchDropDowns = async () => {
//       try {
//         const promoPackageData = await getPromoPackage();
//         const productName = await getProductName();
//         setPromoPackage(promoPackageData);
//         setProductName(productName);
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//       }
//     };

//     fetchDropDowns();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {

//       onClose()

//       await addItem({
//         productSku: productSku,
//         promoPackage: selectedPromoPackage,
//       })

//       onSuccess()

//     } catch (error) {

//       setErrorMessage("Add Failed")

//     }
//   }

//   const handlePromoPackageChange = (promoPackageId) => {
//     setSelectedPromoPackage(promoPackageId);
//   };

//   const handleProductNameChange = (productNameId) => {
//     setSelectedProductName(productNameId);
//   };

//   return (

//     <AddFormLayout
//       title="Add Package Product"
//       onSubmit={handleSubmit}
//       onClose={onClose}
//     >

//         <ProductDropDown
//             label="Package Name"
//             options={promoPackage}
//             value={selectedPromoPackage}
//             onChange={handlePromoPackageChange}
//             required
//         />
//         <ProductDropDown
//             label="Product Name"
//             options={productName}
//             value={selectedProductName}
//             onChange={handleProductNameChange}
//             required
//         />
      
//       <NumberInputField label="Product SKU" value={productSku} onChange={setProductSku} placeholder="Product SKU"/>

//       <ErrorMessage message={errorMessage} />

//     </AddFormLayout>

//   )
// }

// export default AddPackageProduct


// import React, { useState, useEffect } from "react";
// import NumberInputField from "../../../../../Components/common/NumberInputField";
// import AddFormLayout from "../../../../../Components/common/AddFormLayout";
// import ProductDropDown from "../../../../../Components/common/ProductDropDown";
// import ErrorMessage from "../../../../../Components/common/ErrorMessage";
// import { addItem } from "../packageProductService";
// import { getItems as getPromoPackage } from "../../../Order/Package/packageService";
// import { getItems as getProductName } from "../../../Products/Product/productService";

// function AddPackageProduct({ onClose, onSuccess }) {
//   const [productSku, setProductSku] = useState("");
//   const [promoPackage, setPromoPackage] = useState([]);
//   const [selectedPromoPackages, setSelectedPromoPackages] = useState([]);
//   const [productName, setProductName] = useState([]);
//   const [selectedProductNames, setSelectedProductNames] = useState([]);

//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchDropDowns = async () => {
//       try {
//         const promoPackageData = await getPromoPackage();
//         const productNameData = await getProductName();
//         setPromoPackage(promoPackageData);
//         setProductName(productNameData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchDropDowns();
//   }, []);

//   const handlePromoPackageChange = (promoPackageId, index) => {
//     const newSelectedPromoPackages = [...selectedPromoPackages];
//     newSelectedPromoPackages[index] = promoPackageId;
//     setSelectedPromoPackages(newSelectedPromoPackages);
//   };

//   const handleProductNameChange = (productNameId, index) => {
//     const newSelectedProductNames = [...selectedProductNames];
//     newSelectedProductNames[index] = productNameId;
//     setSelectedProductNames(newSelectedProductNames);
//   };

//   const handleAddMore = () => {
//     setSelectedPromoPackages([...selectedPromoPackages, null]);
//     setSelectedProductNames([...selectedProductNames, null]);
//   };

//   const handleRemove = (index) => {
//     const newSelectedPromoPackages = [...selectedPromoPackages];
//     const newSelectedProductNames = [...selectedProductNames];

//     newSelectedPromoPackages.splice(index, 1);
//     newSelectedProductNames.splice(index, 1);

//     setSelectedPromoPackages(newSelectedPromoPackages);
//     setSelectedProductNames(newSelectedProductNames);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       onClose();

//       for (let i = 0; i < selectedPromoPackages.length; i++) {
//         await addItem({
//           productSku: productSku,
//           promoPackage: selectedPromoPackages[i],
//           // Add other fields if needed
//         });
//       }

//       onSuccess();
//     } catch (error) {
//       setErrorMessage("Add Failed");
//     }
//   };

//   return (
//     <AddFormLayout title="Add Package Product" onSubmit={handleSubmit} onClose={onClose}>
//       {selectedPromoPackages.map((_, index) => (
//         <div key={index}>
//           <ProductDropDown
//             label={`Package Name ${index + 1}`}
//             options={promoPackage}
//             value={selectedPromoPackages[index]}
//             onChange={(promoPackageId) => handlePromoPackageChange(promoPackageId, index)}
//             required
//           />
//           <ProductDropDown
//             label={`Product Name ${index + 1}`}
//             options={productName}
//             value={selectedProductNames[index]}
//             onChange={(productNameId) => handleProductNameChange(productNameId, index)}
//             required
//           />
//           <button type="button" onClick={() => handleRemove(index)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddMore}>
//         Add More
//       </button>

//       <NumberInputField label="Product SKU" value={productSku} onChange={setProductSku} placeholder="Product SKU" />

//       <ErrorMessage message={errorMessage} />
//     </AddFormLayout>
//   );
// }

// export default AddPackageProduct;


// import React, { useState, useEffect } from "react";
// import NumberInputField from "../../../../../Components/common/NumberInputField";
// import AddFormLayout from "../../../../../Components/common/AddFormLayout";
// import ProductDropDown from "../../../../../Components/common/ProductDropDown";
// import ErrorMessage from "../../../../../Components/common/ErrorMessage";
// import { addItem } from "../packageProductService";
// import { getItems as getPromoPackage } from "../../../Order/Package/packageService";
// import { getItems as getProductSku } from "../../../Products/Product/productService";

// function AddPackageProduct({ onClose, onSuccess }) {
//   const [productFields, setProductFields] = useState([{ productSku: "" }]);
//   const [promoPackage, setPromoPackage] = useState([]);
//   const [selectedPromoPackage, setSelectedPromoPackage] = useState();
//   const [productSkuOptions, setProductSkuOptions] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchDropDowns = async () => {
//       try {
//         const promoPackageData = await getPromoPackage();
//         const productSkuData = await getProductSku();
//         setPromoPackage(promoPackageData);
//         setProductSkuOptions(productSkuData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchDropDowns();
//   }, []);

//   const handlePromoPackageChange = (promoPackageId) => {
//     setSelectedPromoPackage(promoPackageId);
//   };

//   const handleProductSkuChange = (productSkuId, index) => {
//     const updatedProductFields = [...productFields];
//     updatedProductFields[index].productSku = productSkuId;
//     setProductFields(updatedProductFields);
//   };

//   // const handleProductSkuChange = (value, index) => {
//   //   const updatedProductFields = [...productFields];
//   //   updatedProductFields[index].productSku = value;
//   //   setProductFields(updatedProductFields);
//   // };

//   const handleAddMore = () => {
//     setProductFields([...productFields, { productSku: "" }]);
//   };

//   const handleRemove = (index) => {
//     const updatedProductFields = [...productFields];
//     updatedProductFields.splice(index, 1);
//     setProductFields(updatedProductFields);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       onClose();

//       for (const { productSku } of productFields) {
//         await addItem({
//           productSku,
//           promoPackage: selectedPromoPackage,
//         });
//       }

//       onSuccess();
//     } catch (error) {
//       setErrorMessage("Add Failed");
//     }
//   };

//   return (
//     <AddFormLayout title="Add Package Product" onSubmit={handleSubmit} onClose={onClose}>
//            <ProductDropDown
//         label="Package Name"
//         options={promoPackage}
//         value={selectedPromoPackage}
//         onChange={handlePromoPackageChange}
//         required
//       />
//       {productFields.map((field, index) => (
//         <div key={index}>
//           <ProductDropDown
//             label={`Product Name ${index + 1}`}
//             options={productSkuOptions}
//             value={field.productSku}
//             onChange={(productSkuId) => handleProductSkuChange(productSkuId, index)}
//             required
//           />

//           <button type="button" onClick={() => handleRemove(index)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddMore}>
//         Add More
//       </button>
 
//       <ErrorMessage message={errorMessage} />
//     </AddFormLayout>
//   );
// }

// export default AddPackageProduct;

// import React, { useState, useEffect } from "react";
// import NumberInputField from "../../../../../Components/common/NumberInputField";
// import AddFormLayout from "../../../../../Components/common/AddFormLayout";
// import ProductDropDown from "../../../../../Components/common/ProductDropDown";
// import ErrorMessage from "../../../../../Components/common/ErrorMessage";
// import { addItem } from "../packageProductService";
// import { getItems as getPromoPackage } from "../../../Order/Package/packageService";
// import { getItems as getProductSku } from "../../../Products/Product/productService";

// function AddPackageProduct({ onClose, onSuccess }) {
//   const [productFields, setProductFields] = useState([{ id: 1, productSku: "" }]);
//   const [promoPackage, setPromoPackage] = useState([]);
//   const [selectedPromoPackage, setSelectedPromoPackage] = useState("");
//   const [productSkuOptions, setProductSkuOptions] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchDropDowns = async () => {
//       try {
//         const promoPackageData = await getPromoPackage();
//         const productSkuData = await getProductSku();
//         setPromoPackage(promoPackageData);
//         setProductSkuOptions(productSkuData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchDropDowns();
//   }, []);

//   const handlePromoPackageChange = (promoPackageId) => {
//     setSelectedPromoPackage(promoPackageId);
//   };

//   const handleProductSkuChange = (productSkuId, index) => {
//     const updatedProductFields = [...productFields];
//     updatedProductFields[index].productSku = productSkuId;
//     setProductFields(updatedProductFields);
//   };

//   const handleAddMore = () => {
//     const newId = productFields.length + 1;
//     setProductFields([...productFields, { id: newId, productSku: "" }]);
//   };

//   const handleRemove = (id) => {
//     const updatedProductFields = productFields.filter((field) => field.id !== id);
//     setProductFields(updatedProductFields);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (productFields.length === 0 || !selectedPromoPackage) {
//       setErrorMessage("Please add at least one product and select a package name.");
//       return;
//     }

//     try {
//       onClose();

//       for (const { productSku } of productFields) {
//         await addItem({
//           productSku,
//           promoPackage: selectedPromoPackage,
//         });
//       }

//       onSuccess();
//     } catch (error) {
//       setErrorMessage("Add Failed");
//     }
//   };

//   return (
//     <AddFormLayout title="Add Package Product" onSubmit={handleSubmit} onClose={onClose}>
//       <ProductDropDown
//         label="Package Name"
//         options={promoPackage}
//         value={selectedPromoPackage}
//         onChange={handlePromoPackageChange}
//         required
//       />
//       {productFields.map((field) => (
//         <div key={field.id}>
//           <ProductDropDown
//             label={`Product Name ${field.id}`}
//             options={productSkuOptions}
//             value={field.productSku}
//             onChange={(productSkuId) => handleProductSkuChange(productSkuId, field.id - 1)}
//             required
//           />
//           <button type="button" onClick={() => handleRemove(field.id)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddMore}>
//         Add More
//       </button>
//       <ErrorMessage message={errorMessage} />
//     </AddFormLayout>
//   );
// }

// export default AddPackageProduct;

// import React, { useState, useEffect } from "react";
// import NumberInputField from "../../../../../Components/common/NumberInputField";
// import AddFormLayout from "../../../../../Components/common/AddFormLayout";
// import ProductDropDown from "../../../../../Components/common/ProductDropDown";
// import ErrorMessage from "../../../../../Components/common/ErrorMessage";
// import { addItem } from "../packageProductService";
// import { getItems as getPromoPackage } from "../../../Order/Package/packageService";
// import { getItems as getProductSku } from "../../../Products/Product/productService";

// function AddPackageProduct({ onClose, onSuccess }) {
//   const [productFields, setProductFields] = useState([{ promoPackage: "", productSku: "" }]);
//   const [productSku, setProductSku] = useState([]);
//   const [selectedProductSku, setSelectedProductSku] = useState([]);
//   const [promoPackage, setPromoPackage] = useState([]);
//   const [selectedPromoPackage, setSelectedPromoPackage] = useState([]);

//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchDropDowns = async () => {
//       try {
//         const promoPackageDatas = await getPromoPackage();
//         const productSkuDatas = await getProductSku();
//         setPromoPackage(promoPackageDatas);
//         setProductSku(productSkuDatas);
//         const promoPackage = promoPackageDatas.map(promoPackage => promoPackage._id);
//         // console.log(promoPackage);
//         const productSku = productSkuDatas.map(productSku => productSku.sku);
//         // console.log(productSku);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
      
//     };

//     fetchDropDowns();
//   }, []);

//   const handlePromoPackageChange = (promoPackage, index) => {
//     const updatedSelectedPromoPackage = [...selectedPromoPackage];
//     updatedSelectedPromoPackage[index] = promoPackage;
//     setSelectedPromoPackage(updatedSelectedPromoPackage);

//     const updatedProductFields = [...productFields];
//     updatedProductFields[index].promoPackage = promoPackage;
//     setProductFields(updatedProductFields);
//   };

//   const handleProductSkuChange = (productSku, index) => {
//     const updatedSelectedProductSku = [...selectedProductSku];
//     updatedSelectedProductSku[index] = productSku;
//     setSelectedProductSku(updatedSelectedProductSku);

//     const updatedProductFields = [...productFields];
//     updatedProductFields[index].productSku = productSku;
//     setProductFields(updatedProductFields);
//   };

//   const handleAddMore = () => {
//     setProductFields([...productFields, { promoPackage: "", productSku: "" }]);
//     setSelectedPromoPackage([...selectedPromoPackage, ""]);
//     setSelectedProductSku([...selectedProductSku, ""]);
//   };

//   const handleRemove = (index) => {
//     const updatedProductFields = [...productFields];
//     updatedProductFields.splice(index, 1);
//     setProductFields(updatedProductFields);

//     const updatedSelectedPromoPackage = [...selectedPromoPackage];
//     updatedSelectedPromoPackage.splice(index, 1);
//     setSelectedPromoPackage(updatedSelectedPromoPackage);

//     const updatedSelectedProductSku = [...selectedProductSku];
//     updatedSelectedProductSku.splice(index, 1);
//     setSelectedProductSku(updatedSelectedProductSku);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       onClose();
  
//       const itemsToAdd = productFields.map(({ promoPackage, productSku }) => ({
//         promoPackage,
//         productSku: parseInt(productSku, 10), 
//       }));
  
//       console.log(itemsToAdd);
//       await addItem({ packageProduct: itemsToAdd });
//       onSuccess();
//     } catch (error) {
//       console.error("Add Failed:", error);
//       setErrorMessage("Add Failed");
//     }
//   }  

//   return (
//     <AddFormLayout title="Add Package Product" onSubmit={handleSubmit} onClose={onClose}>
//       {productFields.map((field, index) => (
//         <div key={index}>
//           <ProductDropDown
//             label={`Package Name ${index + 1}`}
//             options={promoPackage}
//             value={field.promoPackage}
//             onChange={(promoPackage) => handlePromoPackageChange(promoPackage, index)}
//             required
//           />
      
//           <ProductDropDown
//             label={`Product Name ${index + 1}`}
//             options={productSku}
//             value={field.productSku}
//             onChange={(productSku) => handleProductSkuChange(productSku, index)}
//             required
//           />

//           <button type="button" onClick={() => handleRemove(index)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddMore}>
//         Add More
//       </button>
 
//       <ErrorMessage message={errorMessage} />
//     </AddFormLayout>
//   );
// }

// export default AddPackageProduct;


import React, { useState, useEffect } from "react";
import NumberInputField from "../../../../../Components/common/NumberInputField";
import AddFormLayout from "../../../../../Components/common/AddFormLayout";
import ProductDropDown from "../../../../../Components/common/ProductDropDown";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";
import { addItem } from "../packageProductService";
import { getItems as getPromoPackages } from "../../../Order/Package/packageService";
import { getItems as getProductSkus } from "../../../Products/Product/productService";
import ProductDropDownTwo from "../../../../../Components/common/ProductDropDownTwo";

function AddPackageProduct({ onClose, onSuccess }) {
  const [productFields, setProductFields] = useState([{ promoPackage: "", product: "" }]);
  const [promoPackages, setPromoPackages] = useState([]);
  const [productSkus, setProductSkus] = useState([]);
  console.log(productSkus)
  const [errorMessage, setErrorMessage] = useState("");
  const [skuOnly, setSkuOnly] = useState([])

  useEffect(() => {
    const fetchDropDowns = async () => {
      try {
        const promoPackagesData = await getPromoPackages();
        const productSkusData = await getProductSkus();
  
        // console.log("Promo Packages:", promoPackagesData); //good
        // console.log("Product Skus:", productSkusData); //good 
  
        setPromoPackages(promoPackagesData);
        setProductSkus(productSkusData);
        setSkuOnly(productSkusData.map(product => product._id))
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchDropDowns();
  }, []);
  const handleDropDownChange = (value, key, index) => {
    const updatedFields = [...productFields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
  
    setProductFields(updatedFields);

  };

  useEffect(() => {
    console.log(skuOnly)
  },[productSkus])

  const handleAddMore = () => {
    setProductFields([...productFields, { promoPackage: "", product: "" }]);
  };

  const handleRemove = (index) => {
    const updatedFields = [...productFields];
    updatedFields.splice(index, 1);
    setProductFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onClose();

      const itemsToAdd = productFields.map(({ promoPackage, product }) => ({
        promoPackage,
        product
      }));


      await addItem(
        {
          packageProduct: itemsToAdd
        }
       );

      onSuccess();
    } catch (error) {
      console.error("Add Failed:", error);
      setErrorMessage("Add Failed");
    }
  };

  return (
    <AddFormLayout title="Add Package Product" onSubmit={handleSubmit} onClose={onClose}>
      {productFields.map((field, index) => (
        <div key={index}>
          <ProductDropDown
            label={`Package Name ${index + 1}`}
            options={promoPackages}
            value={field.promoPackage}
            onChange={(value) => handleDropDownChange(value, "promoPackage", index)}
            required
          />
{/* CCreated new component ProductDropDownTwo and handled product sku selection */}
          <ProductDropDownTwo
            label={`Product Name ${index + 1}`}
            options={productSkus}
            value={field.product}
            onChange={(value) => handleDropDownChange(value, "product", index)}
            required
          />

          <button type="button" onClick={() => handleRemove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddMore}>
        Add More
      </button>

      <ErrorMessage message={errorMessage} />
    </AddFormLayout>
  );
}

export default AddPackageProduct;
