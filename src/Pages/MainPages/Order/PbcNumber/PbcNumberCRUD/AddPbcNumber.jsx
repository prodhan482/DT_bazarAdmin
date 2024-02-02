import React, { useState, useEffect } from "react";
import NumberInputField from "../../../../../Components/common/NumberInputField";
import AddFormLayout from "../../../../../Components/common/AddFormLayout";
import ProductDropDown from "../../../../../Components/common/ProductDropDown";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";
import { addItem } from "../pbcNumberService";
import { getItems as getPromoCode } from "../../../Order/PromoCode/promoCodeService";
import { getItems as getCustomer } from "../../../Users/Customers/customerService";
import TextField from "../../../../../Components/common/TextField";
import CustomerDropdown from "../../../../../Components/common/CustomerDropdown";

function AddPbcNumber({ onClose, onSuccess }) {
  const employeeData = JSON.parse(localStorage.getItem("employee"));
  const [customer, setCustomer] = useState([])
  // const [mobileFields, setMobileFields] = useState([{ id: 1, mobile: "" }]);
  const [promoCode, setPromoCode] = useState([]);
  const [selectedPromoCode, setSelectedPromoCode] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [mobile, setMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mobileArray, setMobileArray] = useState([]);

  useEffect(() => {
    const fetchDropDowns = async () => {
      try {
        const promoCodeData = await getPromoCode();
        const customerData = await getCustomer();
        setPromoCode(promoCodeData);
        setCustomer(customerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDropDowns();
  }, []);

  const handlePromoCodeChange = (promoCodeId) => {
    setSelectedPromoCode(promoCodeId);
  };

  const handlePromoCustomerChange = (id) => {
    setSelectedCustomer(id);
  };


  // const handleMobileChange = (mobile, index) => {
  //   const updatedMobileFields = [...mobileFields];
  //   updatedMobileFields[index].mobile = mobile;
  //   setMobileFields(updatedMobileFields);
  // };

  // const handleAddMore = () => {
  //   const newMobile = mobileFields.length + 1;
  //   setMobileFields([...mobileFields, { id: newMobile, mobile: "" }]);
  // };

  // const handleRemove = (id) => {
  //   const updatedMobileFields = mobileFields.filter((field) => field.id !== id);
  //   setMobileFields(updatedMobileFields);
  // };

  //update mobile array when mobile input change

useEffect(() => {
  setMobileArray(mobile.split(",").map((mobile) => mobile));
}, [mobile]);
const handleSubmit = async (e) => {
  e.preventDefault();

  const pbcNumbers = [];

  mobileArray.forEach((mobileNumber) => {
    if (mobileNumber.trim() !== "") {
      pbcNumbers.push({
        mobile: mobileNumber,
        promoCode: selectedPromoCode,
      });
    }
  });

  if (selectedCustomer) {
    pbcNumbers.push({
      customer: selectedCustomer,
      promoCode: selectedPromoCode,
    }); 
  }

  if (pbcNumbers.length === 0) {
    setErrorMessage("Please add at least one valid mobile number.");
    return;
  }

  const data = {
    // employee: employeeData._id,
    pbcNumbers,
  };

  try {
    onClose();
    
    await addItem(data);
    onSuccess();
  } catch (error) {
    setErrorMessage("Add Failed");
  }
};

  return (
    <AddFormLayout title="Add Promo Code by Number" onSubmit={handleSubmit} onClose={onClose}>
      
      <ProductDropDown
        label="Promo Code"
        options={promoCode}
        value={selectedPromoCode}
        onChange={handlePromoCodeChange}
        required
      />
      {/* {mobileFields.map((field) => (
        <div key={field.id}> */}
         <CustomerDropdown
        label="Customer"
        options={customer}
        value={selectedCustomer}
        onChange={handlePromoCustomerChange}
        required
      />
          <TextField
            // label={`Phone Number ${field.id}`}
            label="Phone Number"
            value={mobile}
            onChange={setMobile}
            placeholder="Phone Number"
            
          />
          {/* <button type="button" onClick={() => handleRemove(field.id)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddMore}>
        Add More
      </button> */}
      <ErrorMessage message={errorMessage} />
    </AddFormLayout>
  );
}

export default AddPbcNumber;
