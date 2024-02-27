import { useState, useEffect } from "react"

// import TextField from "../../../../../Components/common/TextField"
import PrecedenceField from "../../../../../Components/common/PrecedenceField"
import DescriptionField from "../../../../../Components/common/DescriptionField"
import EditFormLayout from "../../../../../Components/common/EditFormLayout"

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { editItem } from "../quickAdsService"

import { getItems as getProductData } from "../../Product/productService"
import ProductDropDown from "../../../../../Components/common/ProductDropDown"

import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';

function EditQuickAds({ quickAds, onClose, onEditSuccess }) {

    const [product, setProduct] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(quickAds?.id)
    const [precedence, setPrecedence] = useState(quickAds?.precedence)

    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchDropDowns = async () => {
            try {

                const productData = await getProductData();
                setProduct(productData);
                // console.log(productData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDropDowns();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        onClose()

        try {

            await editItem(quickAds.id, {
                product: selectedProduct,
                precedence

            })

            onEditSuccess()

        } catch (error) {

            setErrorMessage("Failed edit")

        }
    }

    return (

        <EditFormLayout
            title="Edit Quick Ads"
            onSubmit={handleSubmit}
            onClose={onClose}
        >

            {/* <ProductDropDown
               className="text-black"
                label="Product"
                options={product}
                value={selectedProduct}
                onChange={setSelectedProduct}
                required
            /> */}

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={product}
                value={product.find(item => item._id === selectedProduct) || null} 
                onChange={(_, newValue) => setSelectedProduct(newValue?._id || null)} 
                getOptionLabel={(option) => option.name || ''} 
                renderInput={(params) => <TextField {...params} label="Product" />}
            />

            <PrecedenceField
                value={precedence}
                onChange={(value) => setPrecedence(value)}
            />

            <ErrorMessage message={errorMessage} />

        </EditFormLayout>

    )
}

export default EditQuickAds
