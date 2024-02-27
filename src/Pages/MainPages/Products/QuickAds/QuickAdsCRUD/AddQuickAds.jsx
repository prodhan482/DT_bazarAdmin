// import { useState, useEffect } from "react"

// import TextField from "../../../../../Components/common/TextField"
// import PrecedenceField from "../../../../../Components/common/PrecedenceField"
// import DescriptionField from "../../../../../Components/common/DescriptionField"
// import AddFormLayout from "../../../../../Components/common/AddFormLayout"
// import ErrorMessage from "../../../../../Components/common/ErrorMessage"

// import { addItem } from "../quickAdsService"

// import { getItems as getProductData } from "../../Product/productService"
// import ProductDropDown from "../../../../../Components/common/ProductDropDown"

// // import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// function AddQuickAds({ onClose, onSuccess }) {

//     const [product, setProduct] = useState([])
//     const [selectedProduct, setSelectedProduct] = useState()
//     const [precedence, setPrecedence] = useState("")

//     const [errorMessage, setErrorMessage] = useState("")

    

//     useEffect(() => {
//         const fetchDropDowns = async () => {
//             try {

//                 const productData = await getProductData();
//                 setProduct(productData);
//                 // console.log(productData)
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchDropDowns();
//     }, []);
//     console.log(product)

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         try {

//             onClose()

//             await addItem({
//                 product: selectedProduct,
//                 precedence: parseInt(precedence),

//             })

//             onSuccess()

//         } catch (error) {

//             setErrorMessage("Add Failed")

//         }
//     }

//     return (

//         <AddFormLayout
//             title="Add Quick Ads"
//             onSubmit={handleSubmit}
//             onClose={onClose}
//         >

//             {/* <ProductDropDown
//                 label="Product"
//                 options={product}
//                 value={selectedProduct}
//                 onChange={setSelectedProduct}
//                 style={{ color: "black" }}
//                 required
//             /> */}

//             <Autocomplete
//                 disablePortal
//                 id="combo-box-demo"
//                 options={product}
//                 value={selectedProduct}
//                 onChange={setSelectedProduct}
//                 // sx={{ width: 300 }}
//                 renderInput={(params) => <TextField {...params} label="Movie" />}
//             />

//             <PrecedenceField value={precedence} onChange={setPrecedence} style={{ color: "black" }}/>

//             <ErrorMessage message={errorMessage} />

//         </AddFormLayout>

//     )
// }

// export default AddQuickAds

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField"; 
import PrecedenceField from "../../../../../Components/common/PrecedenceField"
import Autocomplete from '@mui/material/Autocomplete';
import AddFormLayout from "../../../../../Components/common/AddFormLayout";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";
import { addItem } from "../quickAdsService";
import { getItems as getProductData } from "../../Product/productService";

function AddQuickAds({ onClose, onSuccess }) {
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();
    const [precedence, setPrecedence] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchDropDowns = async () => {
            try {
                const productData = await getProductData();
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDropDowns();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            onClose();
            await addItem({
                product: selectedProduct._id,
                precedence,
            });
            onSuccess();
        } catch (error) {
            setErrorMessage("Add Failed");
        }
    };

    return (
        <AddFormLayout
            title="Add Quick Ads"
            onSubmit={handleSubmit}
            onClose={onClose}
        >
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={product}
                value={selectedProduct}
                onChange={(_, newValue) => setSelectedProduct(newValue)}
                renderInput={(params) => <TextField {...params} label="Product" />}
            /> */}

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={product} 
                value={selectedProduct}
                onChange={(_, newValue) => setSelectedProduct(newValue)}
                // onChange={setSelectedProduct}
                getOptionLabel={(option) => option.name} 
                renderInput={(params) => <TextField {...params} label="Product" />}
                // style={{backgroundColor:"wheat", TextColor:"green"}}
            />

            <PrecedenceField value={precedence} onChange={setPrecedence} style={{ color: "black" }}/>
            <ErrorMessage message={errorMessage} />
        </AddFormLayout>
    );
}

export default AddQuickAds;
