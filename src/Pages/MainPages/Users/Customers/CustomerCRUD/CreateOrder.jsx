// import { useState } from "react"

// import Table from "../../../../../Components/InvoiceTable/Table"
// import TableHeadingRow from "../../../../../Components/InvoiceTable/TableHeadingRow"
// import TableHeading from "../../../../../Components/InvoiceTable/TableHeading"
// import TextCell from "../../../../../Components/InvoiceTable/TextCell"
// import TableRow from "../../../../../Components/InvoiceTable/TableRow"
// import TableBody from "../../../../../Components/InvoiceTable/TableBody"

// import TextField from "../../../../../Components/common/TextField"
// import NumberInputField from "../../../../../Components/common/NumberInputField"
// import ToggleSwitch from "../../../../../Components/common/ToggleSwitch"
// import CreateOrderPageLayout from "../../../../../Components/common/CreateOrderPageLayout"
// import ErrorMessage from "../../../../../Components/common/ErrorMessage"

// import { addItem } from "../customerService"
// import DateField from "../../../../../Components/common/DateField"

// function CreateOrder({ onClose, onSuccess }) {

//     const [name, setName] = useState("")
//     const [discountAmount, setDiscountAmount] = useState("")
//     const [isActive, setIsActive] = useState(false)
//     const [startDate, setStartDate] = useState(new Date())
//     const [endDate, setEndDate] = useState(new Date())

//     const [errorMessage, setErrorMessage] = useState("")

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         try {

//             onClose()

//             await addItem({
//                 name: name,
//                 discountAmount: discountAmount,
//                 isActive: isActive,
//                 startDate: startDate,
//                 endDate: endDate,
//             })

//             onSuccess()

//         } catch (error) {

//             setErrorMessage("Add Failed")

//         }
//     }

//     return (

//         <CreateOrderPageLayout
//             title="Create Order"
//             onSubmit={handleSubmit}
//             onClose={onClose}
//         >

//             <div className="overflow-x-scroll">
//                 <Table>

//                     <thead>
//                         <tr>
//                             <th class="w-20">Product Name</th>
//                             <th class="w-20">Quantity</th>
//                             <th class="w-20">Unit Plastic</th>
//                             <th class="w-20">Total Plastic</th>
//                             <th class="w-20">Unit Price</th>
//                             <th class="w-20">Total Price</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* {selectedItem.items.map((item) => (
//                 <tr>
//                   <td>{item.itemName}</td>
//                   <td>{item.itemSku}</td>
//                   <td>{item.itemPrice}</td>
//                   <td>{item.itemQty}</td>
//                   <td>{item.itemWeight}</td>
//                   <td>{item.itemPrice * item.itemQty}</td>
//                 </tr>
//               ))} */}

//                         <tr>
//                             <td colspan="5" class="text-right">Sub Total</td>
//                             <td></td>
//                         </tr>
//                         <tr>
//                             <td colspan="5" class="text-right">Total</td>
//                             <td></td>
//                         </tr>
//                         <tr>
//                             <td colspan="3" class="text-right">Total Plastic Point</td>
//                             <td colspan="5" class="text-right">Grand Total</td>
//                             <td>৳  </td>
//                         </tr>

//                     </tbody>
//                 </Table>
//             </div>

//             <ErrorMessage message={errorMessage} />

//         </CreateOrderPageLayout>

//     )
// }

// export default CreateOrder

// import React, { useState, useEffect } from "react";

// import TextField from "../../../../../Components/common/TextField";
// import NumberInputField from "../../../../../Components/common/NumberInputField";
// import ProductDropDown from "../../../../../Components/common/ProductDropDown";
// import CreateOrderPageLayout from "../../../../../Components/common/CreateOrderPageLayout";
// import ErrorMessage from "../../../../../Components/common/ErrorMessage";
// import DateField from "../../../../../Components/common/DateField";

// // import { useParams } from "react-router-dom";

// import { addItem } from "../customerService";
// import { getSingleCustomerAddresses } from "../customerService";

// import { getItems as getProduct } from "../../../Products/Product/productService";
// import { getItems as getCustomer } from "../customerService"

// function CreateOrder({customer, onClose, onSuccess }) {
//   const [product, setProduct] = useState([]);
//   // const [customer, setCustomer] = useState([])
//   const [customerAddress, setCustomerAddress] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [price, setPrice] = useState([]);
//   const [fullAddressString, setFullAddressString] = useState("");
//   const [areaString, setAreaString] = useState("");
//   const [notes, setNotes] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
    
//     const fetchDropDowns = async () => {
//       try {
//         const productData = await getProduct();
//         const customerData = await getCustomer();
//         // setCustomer(customerData);
//         // const {id}= customerData._id

//         // const {id} = customerData;
//         const customerAddressData = await getSingleCustomerAddresses(customerData._id)
//         setProduct(productData);
//         setCustomerAddress(customerAddressData);
//         // console.log(customerAddressData)
//         // productData?.map(e=> setPrice(e.price))
        
//         setPrice(productData[0].price)

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchDropDowns();
//   }, []);


//   const handleProductChange = async (productId, index) => {
//     // try {
//     //   const newSelectedProduct = [...selectedProduct];
//     //   newSelectedProduct[index] = productId;
//     //   setSelectedProduct(newSelectedProduct);
  
//     //   const productPrice = await getProductPrice(productId);
//     //   const newPrice = [...price];
//     //   newPrice[index] = productPrice;
//     //   setPrice(newPrice);
//     // } catch (error) {
//     //   console.error("Error fetching product price:", error);
//     // }

    
//   const price = product?.find(e=> productId== e?._id)

//   setPrice(price.price)
//   };

//   const handleQuantityChange = (value, index) => {
//     // const newQuantity = [...quantity];
//     // const newPrice = [...price];

//     // newQuantity[index] = value;
//     // newPrice[index] = getProductPrice(selectedProduct[index]) * value; 

//     // setQuantity(newQuantity);
//     // setPrice(newPrice);
//     setQuantity(value)
//     const updatePrice = price * value
//     setPrice(updatePrice)
//   };

//   const handlePriceChange = (value, index) => {
//     // const newPrice = [...price];
//     // newPrice[index] = value;
//     // setPrice(newPrice);
//   };

//   const handleAddMore = () => {
//     setSelectedProduct([...selectedProduct, null]);
//     // setQuantity([...quantity, null]);
//     setPrice([...price, null]);
//   };

//   const handleRemove = (index) => {
//     // const newSelectedProduct = [...selectedProduct];
//     // const newQuantity = [...quantity];
//     // const newPrice = [...price];

//     // newSelectedProduct.splice(index, 1);
//     // newQuantity.splice(index, 1);
//     // newPrice.splice(index, 1);

//     // setSelectedProduct(newSelectedProduct);
//     // setQuantity(newQuantity);
//     // setPrice(newPrice);
//   };

//  const getProductPrice = async (productId) => {
//   // try {
//   //   const selectedProductData = await getProduct(productId);
//   //   return selectedProductData ? selectedProductData.price : 0;
//   // } catch (error) {
//   //   console.error("Error fetching product data:", error);
//   //   return 0;
//   // }


// };



// useEffect(()=>{

// })

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       onClose();

//       for (let i = 0; i < selectedProduct.length; i++) {
//         await addItem({
//           product: selectedProduct[i],
//           quantity: quantity[i],
//           price: price[i], 
//           fullAddressString,
//           areaString,
//           notes,
//         });
//       }

//       onSuccess();
//     } catch (error) {
//       setErrorMessage("Add Failed");
//     }
//   };

  
//   return (
//     <CreateOrderPageLayout title="Create Order" onSubmit={handleSubmit}>
//       {selectedProduct.map((_, index) => (
        
//         <div key={index}>
//           <ProductDropDown
//             label={`Product Name ${index + 1}`}
//             options={product}
//             value={selectedProduct[index]}
//             onChange={(productId) => handleProductChange(productId, index)}
//             required
//           />
//           <NumberInputField
//             label={`Quantity ${index + 1}`}
//             value={quantity}
//             onChange={(value) => handleQuantityChange(value, index)}
//             placeholder="Quantity"
//             required
//           />
//           <NumberInputField
//             label={`Price ${index + 1}`}
//             value={price}
//             onChange={(value) => handlePriceChange(value, index)}
//             placeholder="Price"
//           />

//           <div className="bg-red-700 hover:bg-red-500 text-white font-bold py-1 px-2 rounded w-[11%]">
//             <button type="button" onClick={() => handleRemove(index)}>
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}
//       <div className="bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 rounded w-[17%]">
//         <button type="button" onClick={handleAddMore}>
//           Add Product
//         </button>
//       </div>
//       <TextField
//             label="Full Address"
//             value={fullAddressString}
//             onChange={setFullAddressString}
//             placeholder="Full Address"
//             required
//           />
//            <TextField
//             label="Area"
//             value={areaString}
//             onChange={setAreaString}
//             placeholder="Area"
//             required
//           />
//           <TextField
//             label="Notes"
//             value={notes}
//             onChange={setNotes}
//             placeholder="Notes"
//             required
//           />
//       <ErrorMessage message={errorMessage} />
//     </CreateOrderPageLayout>
//   );
// }

// export default CreateOrder;


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
import { getItems as getCustomer } from "../customerService";

import { format } from 'date-fns';


function CreateOrder({ onClose, onSuccess }) {
  const [product, setProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [prices, setPrices] = useState([]);
  const [fullAddressString, setFullAddressString] = useState("");
  const [areaString, setAreaString] = useState("");
  const [notes, setNotes] = useState("");
  const [customerAddress, setCustomerAddress] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  // const [startTime, setStartTime] = useState()
  // const [endTime, setEndTime] = useState()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([])
  const [deliveryDate, setDeliveryDate] = useState(new Date())
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDropDowns = async () => {
      try {
        const productData = await getProduct();
        const customerData = await getCustomer();
        // const customerAddressData = await getSingleCustomerAddresses(customerData._id);
        const timeSlotData = await getTimeSlot()
        setProduct(productData);
        // setCustomerAddress(customerAddressData);
        setTimeSlot(timeSlotData)
        setPrices(productData.map((p) => p.price));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDropDowns();
  }, []);

  // Listen for changes in quantities and update prices
  useEffect(() => {
    setPrices(
      quantities.map((quantity, index) => {
        const price = product.find((p) => p._id === selectedProducts[index])?.price || 0;
        return price * quantity || prices[0];
      })
    );
  }, [quantities, selectedProducts, product]);

  const handleProductChange = (productId, index) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index] = productId;
    setSelectedProducts(newSelectedProducts);
  };

  const handleQuantityChange = (value, index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = value;
      return newQuantities;
    });
  };

  const handleAddMore = () => {
    setSelectedProducts([...selectedProducts, null]);
    setQuantities([...quantities, 1]);
    setPrices([...prices, product.length > 0 ? product[0].price : 0]);
  };

  const handleRemove = (index) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelectedProducts = [...prevSelectedProducts];
      newSelectedProducts.splice(index, 1);
      return newSelectedProducts;
    });
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities.splice(index, 1);
      return newQuantities;
    });
    setPrices((prevPrices) => {
      const newPrices = [...prevPrices];
      newPrices.splice(index, 1);
      return newPrices;
    });
  };

  const handleTimeSlotChange = async (data) => {
    setSelectedTimeSlot(data);

    // try {
    //   const timeSlotData = await getTimeSlot(data);
    //   setTimeSlot(timeSlotData);
    // } catch (error) {
    //   console.error("Error fetching time slot:", error);
    // }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     for (let i = 0; i < selectedProducts.length; i++) {
  //       await addItem({
  //         product: selectedProducts[i],
  //         quantity: quantities[i],
  //         price: prices[i],
  //         fullAddressString,
  //         areaString,
  //         notes,
  //       });
  //     }

  //     onSuccess();
  //   } catch (error) {
  //     setErrorMessage("Add Failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  //   const id = `657adbbfb451bf7ea66dbce0`
  //   const orderData = {
  //     // customer:"dummy",
  //     address:"dummy",  
  //     fullAddressString: fullAddressString,
  //     areaString:areaString,
  //     total: prices.reduce((acc, price) => acc + price, 0),  
  //     subtotal: prices.reduce((acc, price) => acc + price, 0),  
  //     grandTotal: 0, 
  //     notes: notes,
  //     isPromoCode:"dummy",
  //     promoCode:"dummy",
  //     deliveryDate:format(deliveryDate, 'yyyy-MM-dd'),
  //     orderTotalPlasticPoint: 0,  
  //     timeSlot:selectedTimeSlot,
  //     orderProducts: selectedProducts.map((productId, index) => ({
  //       id: productId,
  //       quantity: quantities[index],
  //       price: prices[index], 
  //       plasticWeight: 0,  
  //       totalPlasticWeight: 0,  
  //     })),
  //   };
  // console.log(id, orderData);
  //   await addItem(id, orderData);



    try {

      onClose()

      const orderData = {
      // customer:"dummy",
      address: "6593ed28e293019b2e807530",  
      fullAddressString: fullAddressString,
      areaString:areaString,
      total: prices.reduce((acc, price) => acc + price, 0),  
      subtotal: prices.reduce((acc, price) => acc + price, 0),  
      grandTotal: 0, 
      notes: notes,
      // isPromoCode:"dummy",
      // promoCode:"dummy",
      deliveryDate:format(deliveryDate, 'yyyy-MM-dd'),
      orderTotalPlasticPoint: 0,  
      timeSlot:selectedTimeSlot,
      orderProducts: selectedProducts.map((productId, index) => ({
      id: productId,
      quantity: quantities[index],
      price: prices[index], 
      plasticWeight: 0,  
      totalPlasticWeight: 0,  
      })),
    };
    console.log(orderData);
      await addItem(orderData);

      onSuccess()

    } catch (error) {

      setErrorMessage("Add Failed")

    }
  }

    // const id = `657adbbfb451bf7ea66dbce0`

  //   const orderData = {
  //     // customer:"dummy",
  //     address: "6593ed28e293019b2e807530",  
  //     fullAddressString: fullAddressString,
  //     areaString:areaString,
  //     total: prices.reduce((acc, price) => acc + price, 0),  
  //     subtotal: prices.reduce((acc, price) => acc + price, 0),  
  //     grandTotal: 0, 
  //     notes: notes,
  //     // isPromoCode:"dummy",
  //     // promoCode:"dummy",
  //     deliveryDate:format(deliveryDate, 'yyyy-MM-dd'),
  //     orderTotalPlasticPoint: 0,  
  //     timeSlot:selectedTimeSlot,
  //     orderProducts: selectedProducts.map((productId, index) => ({
  //       id: productId,
  //       quantity: quantities[index],
  //       price: prices[index], 
  //       plasticWeight: 0,  
  //       totalPlasticWeight: 0,  
  //     })),
  //   };
  //   console.log(orderData);
  //     await addItem(orderData);
  //     onSuccess();
  //   } catch (error) {
  //     setErrorMessage("Add Failed");
  //   }
  // };


  return (
    <CreateOrderPageLayout title="Create Order" onSubmit={handleSubmit}>
      {selectedProducts.map((_, index) => (
        <div key={index}>
          <ProductDropDown
            label={`Product Name ${index + 1}`}
            options={product}
            value={selectedProducts[index]}
            onChange={(productId) => handleProductChange(productId, index)}
            required
          />
          <NumberInputField
            label={`Quantity ${index + 1}`}
            value={quantities[index]}
            onChange={(value) => handleQuantityChange(value, index)}
            placeholder="Quantity"
            required
          />
          <NumberInputField
            label={`Price ${index + 1}`}
            value={prices[index]}
            onChange={(value) => setPrices((prevPrices) => [...prevPrices.slice(0, index), value, ...prevPrices.slice(index + 1)])}
            placeholder="Price"
          />

          <div className="bg-red-700 hover:bg-red-500 text-white font-bold py-1 px-2 rounded w-[11%]">
            <button type="button" onClick={() => handleRemove(index)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 rounded w-[17%]">
        <button type="button" onClick={handleAddMore}>
          Add Product
        </button>
      </div>
      {/* <NumberInputField
        label="SubTotal"
        value={subtotal}
        onChange={subtotal}
        placeholder="SubTotal"
        required
      /> */}
      
      <TextField
        label="Full Address"
        value={fullAddressString}
        onChange={setFullAddressString}
        placeholder="Full Address"
        required
      />
      <TextField label="Area" value={areaString} onChange={setAreaString} placeholder="Area" required />
      <TextField label="Notes" value={notes} onChange={setNotes} placeholder="Notes" required />
      <ProductDropDown
          label="Time Slot"
          options={timeSlot}
          value={selectedTimeSlot}
          onChange={handleTimeSlotChange}
          required
        />
        <DateField label="Delivery Date" selected={deliveryDate} onChange={(date) => setDeliveryDate(date)}  placeholderText="MM/DD/YY"/>
      <ErrorMessage message={errorMessage} />
    </CreateOrderPageLayout>
  );
}

export default CreateOrder;
