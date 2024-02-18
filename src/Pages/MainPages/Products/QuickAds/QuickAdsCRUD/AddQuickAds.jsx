import { useState, useEffect } from "react"

import TextField from "../../../../../Components/common/TextField"
import PrecedenceField from "../../../../../Components/common/PrecedenceField"
import DescriptionField from "../../../../../Components/common/DescriptionField"
import AddFormLayout from "../../../../../Components/common/AddFormLayout"
import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addItem } from "../quickAdsService"

import { getItems as getProductData } from "../../Product/productService"
import ProductDropDown from "../../../../../Components/common/ProductDropDown"

function AddQuickAds({ onClose, onSuccess }) {

    const [product, setProduct] = useState([])
    const [selectedProduct, setSelectedProduct] = useState()
    const [precedence, setPrecedence] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchDropDowns = async () => {
            try {

                const productData = await getProductData();
                setProduct(productData);
                console.log(productData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDropDowns();
    }, []);
    // console.log(product)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            onClose()

            await addItem({
                product: selectedProduct,
                precedence: parseInt(precedence),

            })

            onSuccess()

        } catch (error) {

            setErrorMessage("Add Failed")

        }
    }

    return (

        <AddFormLayout
            title="Add Quick Ads"
            onSubmit={handleSubmit}
            onClose={onClose}
        >

            <ProductDropDown
                label="Product"
                options={product}
                value={selectedProduct}
                onChange={setSelectedProduct}
                style={{ color: "black" }}
                required
            />

            <PrecedenceField value={precedence} onChange={setPrecedence} style={{ color: "black" }}/>

            <ErrorMessage message={errorMessage} />

        </AddFormLayout>

    )
}

export default AddQuickAds
