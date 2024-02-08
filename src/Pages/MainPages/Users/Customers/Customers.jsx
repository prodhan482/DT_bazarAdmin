import { useEffect, useState } from "react";

import { getItems } from "./customerService";

import CustomerTable from "./CustomerTable";
import ViewCustomer from "./CustomerCRUD/ViewCustomer";
import EditCustomerProfile from "./CustomerCRUD/EditCustomerProfile";
import Modal from "../../../../Components/common/Modal";
import CreateOrder from "./CustomerCRUD/CreateOrder";
import AddCustomer from "./CustomerCRUD/AddCustomer";
import CustomerPageLayout from "../../../../Components/common/CustomerPageLayout";
import ViewDetailsButton from "../../../../Components/common/ViewDetailsButton";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [toggleState, setToggleState] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getItems();
        setCustomers(response);
      } catch (error) {
        setErrorMessage("Error customers. Please try again.");
      }
    }

    fetchData();
  }, [toggleState]);

  function handleSuccess() {
    setToggleState((prevState) => !prevState);
  }

  const columns = [
    { field: "index", headerName: "#", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    // { field: "firstName", headerName: "First Name", flex: 2 },
    // { field: "lastName", headerName: "Last Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 3 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "group", headerName: "Group", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <ViewDetailsButton
          label="Edit Profile"
          onClick={() => {
            setSelectedCustomer(params.row);
            // console.log(customers.id)
            setIsEditModalOpen(true);
          }}
        />
      ),
    },
  ];

  return (
    <CustomerPageLayout
      title="All Customers"
      itemCount={customers?.totalCustomers}
      onAddClick={() => setIsAddModalOpen(true)}
    >
      {customers && customers.totalCustomers > 0 ? (
        <CustomerTable
          customers={customers?.data?.map((customer, index) => ({
            id: customer?._id,
            index: index + 1,
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            name: customer?.firstName+" "+customer?.lastName,
            email: customer?.email,
            mobile: customer?.mobile,
            group: customer?.group,
            // action: (
            //   <ViewDetailsButton
            //     label="Edit Profile"
            //     onClick={() => {
            //       setSelectedCustomer(id);
            //       setIsEditModalOpen(true);
            //     }}
            //   />
            // ),
          }))}
          columns={columns}
          setIsViewModalOpen={setIsViewModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          setSelectedCustomer={setSelectedCustomer}
        />
      ) : (
        <div>Loading...</div>
      )}

      {/* <CreateOrder
        customers={customers}
        // setIsViewModalOpen={setIsViewModalOpen}
        // setIsEditModalOpen = {setIsEditModalOpen}
        setSelectedCustomer={setSelectedCustomer}
      /> */}

      {isAddModalOpen && (
        <Modal>
          <AddCustomer
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={handleSuccess}
          />
        </Modal>
      )}

      {isViewModalOpen && (
        <Modal>
          <ViewCustomer
            customers={selectedCustomer}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage={errorMessage}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditCustomerProfile
            customers={selectedCustomer}
            onClose={() => setIsEditModalOpen(false)}
            onEditSuccess={handleSuccess}
            />
            {/* {console.log("🚀 ~ Customers ~ customers:", customers)} */}
        </Modal>
      )}
    </CustomerPageLayout>
  );
}

export default Customers;



// import { useEffect, useState } from "react";

// import { getItems, getSingleItems } from "./customerService"; // Assuming you have these functions implemented

// import CustomerTable from "./CustomerTable";
// import ViewCustomer from "./CustomerCRUD/ViewCustomer";
// import EditCustomerProfile from "./CustomerCRUD/EditCustomerProfile";
// import Modal from "../../../../Components/common/Modal";
// import CreateOrder from "./CustomerCRUD/CreateOrder";
// import AddCustomer from "./CustomerCRUD/AddCustomer";
// import CustomerPageLayout from "../../../../Components/common/CustomerPageLayout";
// import ViewDetailsButton from "../../../../Components/common/ViewDetailsButton";

// function Customers() {
//   const [customers, setCustomers] = useState([]);
//   const [toggleState, setToggleState] = useState(false);

//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const [errorMessage, setErrorMessage] = useState("");
//   const [customerForEdit, setCustomerForEdit] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await getItems();
//         setCustomers(response);
//       } catch (error) {
//         setErrorMessage("Error fetching customers. Please try again.");
//       }
//     }

//     fetchData();
//   }, [toggleState]);

//   useEffect(() => {
//     if (isEditModalOpen && selectedCustomer) {
//       fetchCustomerForEdit(selectedCustomer);
//     }
//   }, [isEditModalOpen, selectedCustomer]);

//   async function fetchCustomerForEdit(id) {
//     try {
//       const response = await getSingleItems(id);
//       setCustomerForEdit(response);
//     } catch (error) {
//       setErrorMessage("Error fetching customer data for editing. Please try again.");
//     }
//   }

//   function handleSuccess() {
//     setToggleState(prevState => !prevState);
//   }

//   const columns = [
//     { field: "id", headerName: "#", flex: 0.1 },
//     { field: "name", headerName: "Name", flex: 2 },
//     { field: "email", headerName: "Email", flex: 3 },
//     { field: "mobile", headerName: "Mobile", flex: 1 },
//     { field: "group", headerName: "Group", flex: 1 },
//     {
//       field: "action",
//       headerName: "Action",
//       flex: 1,
//       renderCell: id => (
//         <ViewDetailsButton
//           label="Edit Profile"
//           onClick={() => {
//             setSelectedCustomer(id);
//             setIsEditModalOpen(true);
//           }}
//         />
//       )
//     }
//   ];

//   return (
//     <CustomerPageLayout
//       title="All Customers"
//       itemCount={customers?.totalCustomers}
//       onAddClick={() => setIsAddModalOpen(true)}
//     >
//       {customers && customers.totalCustomers > 0 ? (
//         <CustomerTable
//           customers={customers?.data?.map((customer, index) => ({
//             id: customer?._id,
//             name: customer?.firstName + " " + customer?.lastName,
//             email: customer?.email,
//             mobile: customer?.mobile,
//             group: customer?.group,
//             action: (
//               <ViewDetailsButton
//                 label="Edit Profile"
//                 onClick={() => {
//                   setSelectedCustomer(customer?._id);
//                   setIsEditModalOpen(true);
//                 }}
//               />
//             )
//           }))}
//           columns={columns}
//           setIsViewModalOpen={setIsViewModalOpen}
//           setIsEditModalOpen={setIsEditModalOpen}
//           setSelectedCustomer={setSelectedCustomer}
//         />
//       ) : (
//         <div>Loading...</div>
//       )}

//       {isAddModalOpen && (
//         <Modal>
//           <AddCustomer onClose={() => setIsAddModalOpen(false)} onSuccess={handleSuccess} />
//         </Modal>
//       )}

//       {isViewModalOpen && (
//         <Modal>
//           <ViewCustomer
//             customers={selectedCustomer}
//             onClose={() => setIsViewModalOpen(false)}
//             errorMessage={errorMessage}
//           />
//         </Modal>
//       )}

//       {isEditModalOpen && (
//         <Modal>
//           <EditCustomerProfile
//             customer={customerForEdit}
//             onClose={() => setIsEditModalOpen(false)}
//             onEditSuccess={handleSuccess}
//           />
//         </Modal>
//       )}
//     </CustomerPageLayout>
//   );
// }

// export default Customers;














// import React, { useEffect, useState } from "react";
// import { getItems } from "./customerService";
// import CustomerTable from "./CustomerTable";
// import ViewCustomer from "./CustomerCRUD/ViewCustomer";
// import EditCustomerProfile from "./CustomerCRUD/EditCustomerProfile";
// import Modal from "../../../../Components/common/Modal";
// import CreateOrder from "./CustomerCRUD/CreateOrder";
// import AddCustomer from "./CustomerCRUD/AddCustomer";
// import CustomerPageLayout from "../../../../Components/common/CustomerPageLayout";
// import ViewDetailsButton from "../../../../Components/common/ViewDetailsButton";

// function Customers() {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomerInfo, setSelectedCustomerInfo] = useState(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [toggleState, setToggleState] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await getItems();
//         setCustomers(response);
//       } catch (error) {
//         setErrorMessage("Error fetching customers. Please try again.");
//       }
//     }
//     fetchData();
//   }, [toggleState]);

//   function handleSuccess() {
//     setToggleState((prevState) => !prevState);
//   }

//   const columns = [
//     { field: "id", headerName: "#", flex: 0.1 },
//     { field: "name", headerName: "Name", flex: 2 },
//     { field: "email", headerName: "Email", flex: 3 },
//     { field: "mobile", headerName: "Mobile", flex: 1 },
//     { field: "group", headerName: "Group", flex: 1 },
//     {
//       field: "action",
//       headerName: "Action",
//       flex: 1,
//       renderCell: (params) => (
//         <ViewDetailsButton
//           label="Edit Profile"
//           onClick={() => {
//             const customer = params.row;
//             setSelectedCustomerInfo(customer._id);
//             setIsEditModalOpen(true);
//           }}
//         />
//       ),
//     },
//   ];

//   return (
//     <CustomerPageLayout
//       title="All Customers"
//       itemCount={customers?.totalCustomers}
//       onAddClick={() => setIsAddModalOpen(true)}
//     >
//       {customers && customers.totalCustomers > 0 ? (
//         <CustomerTable
//           customers={customers.data.map((customer, index) => ({
//             id: index + 1,
//             name: `${customer.firstName} ${customer.lastName}`,
//             email: customer.email,
//             mobile: customer.mobile,
//             group: customer.group,
//             _id: customer._id,
//           }))}
//           columns={columns}
//           setIsViewModalOpen={setIsViewModalOpen}
//           setIsEditModalOpen={setIsEditModalOpen}
//           setSelectedCustomer={setSelectedCustomerInfo}
//         />
//       ) : (
//         <div>Loading...</div>
//       )}

//       {isAddModalOpen && (
//         <Modal>
//           <AddCustomer
//             onClose={() => setIsAddModalOpen(false)}
//             onSuccess={handleSuccess}
//           />
//         </Modal>
//       )}

//       {isViewModalOpen && (
//         <Modal>
//           <ViewCustomer
//             customers={selectedCustomerInfo}
//             onClose={() => setIsViewModalOpen(false)}
//             errorMessage={errorMessage}
//           />
//         </Modal>
//       )}

//       {isEditModalOpen && (
//         <Modal>
//           <EditCustomerProfile
//             customerInfo={selectedCustomerInfo}
//             onClose={() => setIsEditModalOpen(false)}
//             onEditSuccess={handleSuccess}
//           />
//         </Modal>
//       )}
//     </CustomerPageLayout>
//   );
// }

// export default Customers;












// import React, { useEffect, useState } from "react";
// import CustomerTable from "./CustomerTable";
// import CustomerPageLayout from "../../../../Components/common/CustomerPageLayout";
// import Modal from "../../../../Components/common/Modal";
// import AddCustomer from "./CustomerCRUD/AddCustomer";
// import ViewCustomer from "./CustomerCRUD/ViewCustomer";
// import EditCustomerProfile from "./CustomerCRUD/EditCustomerProfile";
// import { getItems } from "./customerService";

// function Customers() {
//   const [customers, setCustomers] = useState([]);
//   const [toggleState, setToggleState] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     async function fetchData() {
            // console.log("🚀 ~ Customers ~ customer._id:", customer._id)
            // console.log("🚀 ~ Customers ~ customer._id:", customer._id)
            // console.log("🚀 ~ Customers ~ customer._id:", customer._id)
            // console.log("🚀 ~ Customers ~ customer:", customer)
            // console.log("🚀 ~ Customers ~ setSelectedCustomerInfo:", setSelectedCustomerInfo)
//       try {
//         const response = await getItems();
//         setCustomers(response.data); // Assuming the customer data is in the 'data' property of the response object
//       } catch (error) {
//         setErrorMessage("Error fetching customers. Please try again.");
//       }
//     }
//     fetchData();
//   }, [toggleState]);

//   function handleSuccess() {
//     setToggleState((prevState) => !prevState);
//   }

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <CustomerPageLayout
//       title="All Customers"
//       itemCount={customers.length}
//       onAddClick={() => setIsAddModalOpen(true)}
//     >
//       <input
//         type="text"
//         placeholder="Search customers..."
//         value={searchTerm}
//         onChange={handleSearch}
//         className="border border-gray-300 p-2 rounded-md mr-4"
//       />
//       <CustomerTable
//         customers={customers.filter((customer) =>
//           customer.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )}
//         setIsViewModalOpen={setIsViewModalOpen}
//         setIsEditModalOpen={setIsEditModalOpen}
//         setSelectedCustomer={setSelectedCustomer}
//       />

//       {isAddModalOpen && (
//         <Modal>
//           <AddCustomer onClose={() => setIsAddModalOpen(false)} onSuccess={handleSuccess} />
//         </Modal>
//       )}

//       {isViewModalOpen && (
//         <Modal>
//           <ViewCustomer
//             customer={selectedCustomer}
//             onClose={() => setIsViewModalOpen(false)}
//             errorMessage={errorMessage}
//           />
//         </Modal>
//       )}

//       {isEditModalOpen && (
//         <Modal>
//           <EditCustomerProfile
//             customer={selectedCustomer}
//             onClose={() => setIsEditModalOpen(false)}
//             onEditSuccess={handleSuccess}
//           />
//         </Modal>
//       )}
//     </CustomerPageLayout>
//   );
// }

// export default Customers;
