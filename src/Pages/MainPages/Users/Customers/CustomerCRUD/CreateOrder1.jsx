
import React, { useState, useEffect } from "react";

import TextField from "../../../../../Components/common/TextField";
import NumberInputField from "../../../../../Components/common/NumberInputField";
import ProductDropDown from "../../../../../Components/common/ProductDropDown";
import CreateOrderPageLayout from "../../../../../Components/common/CreateOrderPageLayout";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";
import DateField from "../../../../../Components/common/DateField";

import { addItem } from "../customerService";
import { getSingleCustomerAddresses } from "../customerService";

import { getItems as getProduct } from "../../../Products/Product/productService";
import { getItems as getTimeSlot } from "../../../Order/TimeSlot/timeSlotService";
import { getItems as getPaymentType } from "../../../Order/PaymentType/paymentTypeService";
import { getItems as getCustomer, applyPromoCode } from "../customerService";
import { getSingleItems as getSingleCustomer } from "../customerService";

import { format } from "date-fns";

import Table from "../../../../../Components/table/Table";
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../../Components/table/TableHeading";
import TextCell from "../../../../../Components/table/TextCell";
import TableRow from "../../../../../Components/table/TableRow";
import TableBody from "../../../../../Components/table/TableBody";
import { useParams } from "react-router-dom";
import TimeSlot from "../../../../../Components/common/TimeSlotDropdown";
import DescriptionField from "../../../../../Components/common/DescriptionField";
import DisabledField from "../../../../../Components/common/DisabledField";

function CreateOrder1({ onClose, onSuccess }) {
  const { id } = useParams();

  const [showTable, setShowTable] = useState(false);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [prices, setPrices] = useState([]);
  const [plasticWeights, setPlasticWeights] = useState([]);

  const [selectedFullAddressString, setSelectedFullAddressString] = useState(
    []
  );
  // const [areaString, setAreaString] = useState("");
  const [notes, setNotes] = useState("");
  const [customerAddress, setCustomerAddress] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);

  const [paymentType, setPaymentType] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [toggle, setToggle] = useState(false);
  const [customer, setCustomer] = useState("");

  const [fullAddressString, setFullAddressString] = useState("");
  const [areaString, setAreaString] = useState("");

  const [promo, setPromo] = useState("");
  const [promoId, setPromoId] = useState("");

  const [promoData, setPromoData] = useState([]);

  useEffect(() => {
    const fetchDropDowns = async () => {
      try {
        const productData = await getProduct();
        const customerData = await getSingleCustomer(id);
        const timeSlotData = await getTimeSlot();
        const paymentTypeData = await getPaymentType();
        const addressData = await getSingleCustomerAddresses(id);

        setProduct(productData);
        setTimeSlot(timeSlotData);
        setFilteredProducts(productData);
        setPrices(productData.map((p) => p.price));
        setPlasticWeights(productData.map((p) => p.weight));
        setAddress(addressData);
        setPaymentType(paymentTypeData);
        setCustomer(customerData);
        setCustomerName(customerData.firstName);
        setCustomerEmail(customerData.email);
        setCustomerMobile(customerData.mobile);
        setGroup(customerData.group);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDropDowns();
  }, []);


  
  const [customerName, setCustomerName] = useState(customer.firstName);
  const [customerEmail, setCustomerEmail] = useState(customer.email);
  const [customerMobile, setCustomerMobile] = useState(customer.mobile);
  const [group, setGroup] = useState(customer.group);
  const [quantities, setQuantities] = useState([]);

  const handleToggle = () => {
    setShowTable(!showTable);
  };

  const handleTimeSlotChange = async (data) => {
    setSelectedTimeSlot(data);
  };

  const handleAddressChange = async (data) => {
    setSelectedAddress(data);
    // setFullAddressString( address?.filter(e=>e._id == selectedAddress).map(userAddress=>userAddress.fullAddress));
    // setAreaString(address?.filter(e=>e._id == selectedAddress).map(userAddress=>userAddress.area.name));
    // console.log(fullAddressString, areaString)
  };

  const handlePaymentTypeChange = async (data) => {
    setSelectedPaymentType(data);
  };

  useEffect(() => {
    const selectedAddressDetails = address.find((e) => e._id === selectedAddress);
  
    if (selectedAddressDetails) {
      setAreaString(selectedAddressDetails.area.name);
      setFullAddressString(selectedAddressDetails.fullAddress);
    }
  }, [selectedAddress, address]);
  const handleCheckboxChange = (product, quantity, productIndex) => {
    if (selectedProductsList.includes(product)) {
      const updatedList = selectedProductsList.filter(
        (selectedProduct) => selectedProduct !== product
      );
      setSelectedProductsList(updatedList);
    } else {
      const updatedList = [...selectedProductsList, product];
      setSelectedProductsList(updatedList);
    }
  };

  const handleAddSelectedProducts = () => {  
   setQuantities(quantities.filter(e => e != undefined))
    setShowTable(false);
  };

  useEffect(() => {
    let calculatedSubTotal = 0;
    let calculatedTotal = 0;
    let calculatedGrandTotal = 0;
    selectedProductsList.forEach((productList, index) => {
      calculatedSubTotal += productList.price * quantities[index];
      calculatedTotal += productList.price * quantities[index];
      calculatedGrandTotal += productList.price * quantities[index];
    });
    setSubTotal(calculatedSubTotal);
    setTotal(calculatedTotal);
    setGrandTotal(calculatedGrandTotal);
  }, [selectedProductsList]);


  useEffect(() => {
    setAreaString(address.filter((e) => e._id === selectedAddress));
  }, [selectedAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      // customer:id,
      address: address._id,
      fullAddressString: fullAddressString,
      areaString: areaString,
      total: total,
      subtotal: subtotal,
      grandTotal: 0,
      notes: notes,
      isPromoCode: toggle,
      promoCode: promoData._id,
      deliveryDate: format(deliveryDate, "yyyy-MM-dd"),
      orderTotalPlasticPoint: 0,
      timeSlot: selectedTimeSlot,
      orderProducts: selectedProductsList.map((product, index) => ({
        product: product._id,
        quantity: quantities[index],
        unitPrice: prices[index],
        total: prices[index] * quantities[index],
        unitPlasticPoint: product.weight,
        totalPlasticPoint: product.weight * quantities[index],
      })),
    };

    await addItem(id, orderData);

    onSuccess();
    navigate("/Customers");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const promoData = await applyPromoCode(promo, id);
    setPromoData(promoData);
    setPromoId(promoData._id);
    if (promoData) {
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    if (toggle) {
      if (promoData?.discountType === "percentage") {
        const calculation = total - (total * promoData?.discountAmount) / 100;
        setTotal(calculation);
      } else if (promoData?.discountType === "amount") {
        const calculation = total - promoData?.discountAmount;
        setTotal(calculation);
      } else {
        setTotal(total);
      }
    } else {
      setTotal(total);
    }
  }, [toggle, promoData]);

  const handleQuantityChange = (value, index) => {
    const parsedValue = parseFloat(value); 
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = isNaN(parsedValue) ? 0 : parsedValue;
    setQuantities(updatedQuantities);
  };
  return (
    <CreateOrderPageLayout title="Create Order" onSubmit={handleSubmit}>
      {showTable && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Products"
              value={searchTerm}
              // onChange={handleSearch}
              className="border p-2 rounded"
            />
          </div>
          <Table>
            <TableHeadingRow>
              <TableHeading text="Product Name" />
              <TableHeading text="Plastic Weight" />
              <TableHeading text="Unit Price" />
              <TableHeading text="Quantity" />
              <TableHeading text="select" />
            </TableHeadingRow>
            <TableBody>
              {filteredProducts.map((product, index) => (
                <TableRow key={product._id} item={product}>
                  <TextCell text={product?.name} />
                  <TextCell text={`${product?.weight ?? 0}gm`} />
                  <TextCell text={product?.price} />
                  {/* <NumberInputField
                    value={quantities[index]}
                    onChange={(value) =>
                      handleQuantityChange(value, index, product._id)
                    }
                    placeholder="Quantity"
                  /> */}
                  <td>
                    <div className="mb-4">
                      <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y rounded-md"
                        value={quantities[index] || ""}
                        onChange={(e) =>
                          handleQuantityChange(e.target.value, index)
                        }
                        
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProductsList.includes(product)}
                      onChange={() =>
                        handleCheckboxChange(product, quantities[index], index)
                      }
                    />
                  </td>
                </TableRow>
              ))}
            </TableBody>
           
          </Table>
          <button
              className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded w-[20%] center float-right mt-2"
              type="button"
              onClick={handleAddSelectedProducts}
            >
              Add selected product
          </button>
          <div className="bg-red-700 hover:bg-red-500 text-white font-bold py-1 px-2 rounded w-[20%] mt-2">
            <button type="button" onClick={handleToggle}>
              Close product List
            </button>
          </div>
        </div>
      )}

      {/* <div className="bg-red-700 hover:bg-red-500 text-white font-bold py-1 px-2 rounded w-[16%]">
            <button type="button" onClick={handleCloseTable}>
              Close product
            </button>
          </div> */}
      {/* </div>
      ))} */}
      <div className="bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 rounded w-[20%] mt-2">
        <button type="button" onClick={handleToggle}>
          Open Product List
        </button>
      </div>
      {/* <NumberInputField
        label="SubTotal"
        value={subtotal}
        onChange={subtotal}
        placeholder="SubTotal"
        required
      /> */}
      <div class="border p-4 bg-white w-full border-collapse">
        <h3 class="text-xl mb-[08px]">Ordered Items</h3>

        <Table>
          <TableHeadingRow>
            <TableHeading text="Product Name" />
            <TableHeading text="Weight" />
            <TableHeading text="Unit Price" />
            <TableHeading text="Quantity" />
          </TableHeadingRow>
          <TableBody>
            {selectedProductsList.map((productList, index) => (
              <TableRow key={productList._id} item={productList}>
                <TextCell text={productList?.name} />
                <TextCell text={productList?.weight} />
                <TextCell text={productList?.price} />
                <TextCell text={quantities[index]} />
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <h3 class="heading">Payment Method: {selectedItem.paymentType}</h3>
            <h3 class="sub3">Transaction Id: {selectedItem.paymentInfo.TrxnID}</h3> */}
      </div>

      <div className="text-xl mb-[15px] mt-8 border-b-2">
        Account Information
      </div>

      <DisabledField
        label="Name"
        value={customerName}
        placeholder="Customer Name"
        required
      />
      <DisabledField
        label="Email"
        value={customerEmail}
        placeholder="CustomerEmail"
        required
      />
      <DisabledField
        label="Phone Number"
        value={customerMobile}
        placeholder="Customer Phone"
        required
      />
      <DisabledField label="Group" value={group} placeholder="Group" required />

      <div className="text-xl mb-[15px] mt-8 border-b-2">
        Address Information
      </div>

      <ProductDropDown
        label="Address"
        options={address}
        value={selectedAddress}
        onChange={handleAddressChange}
        required
      />
{
  address?.filter(e=>e._id == selectedAddress)?.map(userAddress=>{
  return <div>
    
    <TextField
        label="Full Address"
        value={userAddress.fullAddress}
        onChange={setFullAddressString}
        placeholder="Full Address"
        required
        
        readOnly
      />

      <TextField
        label="Area"
        value={userAddress.area.name}
        onChange={setAreaString}
        placeholder="Area"
        required
        readOnly
      />

   </div>
  })
}
      <div className="text-xl mb-[15px] mt-8 border-b-2">
        Delivery Date Information
      </div>

      <DateField
        label="Delivery Date"
        selected={deliveryDate}
        onChange={(date) => setDeliveryDate(date)}
        placeholderText="MM/DD/YY"
      />
      <TimeSlot
        label="Time Slot"
        options={timeSlot}
        value={selectedTimeSlot}
        onChange={handleTimeSlotChange}
        required
      />
      <div className="text-xl mb-[15px] mt-8 border-b-2">
        Payment Information
      </div>
      <ProductDropDown
        label="Payment Information"
        options={paymentType}
        value={selectedPaymentType}
        onChange={handlePaymentTypeChange}
        required
      />
      <DescriptionField
        label="Order Notes"
        value={notes}
        onChange={setNotes}
        placeholder="Notes"
        required
      />
      <input
        type="text"
        value={promo}
        onChange={(e) => setPromo(e.target.value)}
        placeholder="Apply promo code"
      />
      <button type="button" onClick={handleClick}>
        Apply
      </button>
      <div className="float-right text-right mr-2.5">
        {/* Your other invoice content here */}
        <div className="text-xl mb-[08px]">Subtotal: {subtotal}</div>
        <div className="text-xl mb-[08px]">
          Discounted Amount: {subtotal - total}
        </div>
        <div className="pt-1 border-t-2 border-t-[#333] border-solid text-2xl mb-1.5">
          Total: {total}
        </div>
      </div>

      <ErrorMessage message={errorMessage} />
    </CreateOrderPageLayout>
  );
}

export default CreateOrder1;
