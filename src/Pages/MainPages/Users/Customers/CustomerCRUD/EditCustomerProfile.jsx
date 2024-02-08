import React, { useState, useEffect } from "react";
import TextField from "../../../../../Components/common/TextField";
import EditFormLayout from "../../../../../Components/common/EditFormLayout";
import ErrorMessage from "../../../../../Components/common/ErrorMessage";
import EmailField from "../../../../../Components/common/EmailField";
import { editCustomerProfile } from "../customerService";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function EditCustomerProfile({ customers, onClose, onEditSuccess }) {
  const [firstName, setFirstName] = useState(customers?.firstName);
  const [lastName, setLastName] = useState(customers?.lastName);
  const [email, setEmail] = useState(customers?.email);
  const [mobile, setMobile] = useState(customers?.mobile);
  const [group, setGroup] = useState(customers?.group);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   // Update state values when customers prop changes
  //   setFirstName(customers?.firstName || "");
  //   setLastName(customers?.lastName || "");
  //   setEmail(customers?.email || "");
  //   setMobile(customers?.mobile || "");
  //   setGroup(customers?.group || "");
  // }, [customers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();

    try {
      await editCustomerProfile(customers.id, {
        firstName,
        lastName,
        email,
        mobile,
        group,
      });
      console.log("🚀 ~ handleSubmit ~ customers._id:", e._id)
      onEditSuccess();
    } catch (error) {
      setErrorMessage("Failed to edit customer profile.");
    }
  };
// console.log(customers)
  return (
    <EditFormLayout
      title="Edit Customer Profile"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <TextField
        id="firstName"
        label="Customer First Name"
        value={firstName}
        onChange={(value) => setFirstName(value)}
        placeholder="Customer First Name"
        required
      />
      <TextField
        id="lastName"
        label="Customer Last Name"
        value={lastName}
        onChange={(value) => setLastName(value)}
        placeholder="Customer Last Name"
        required
      />
      <EmailField
        label="Customer Email"
        value={email}
        setEmail={setEmail}
        required
      />
      <TextField
        id="mobile"
        label="Customer Phone"
        value={mobile}
        onChange={(value) => setMobile(value)}
        placeholder="Customer Phone"
        required
      />
      {/* <label>Change Customer Group: </label>
      <ul>
        <select
          id="group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="mt-2 text-black"
        >
          <option value="general">General</option>
          <option value="shopKeeper">Shop Keeper</option>
          <option value="fraud">Fraud</option>
        </select>
      </ul> */}

      <FormLabel id="demo-row-radio-buttons-group-label">Group:</FormLabel>
      <RadioGroup
       row
       id="group"
       value={group}
       onChange={(e) => setGroup(e.target.value)}
      //  {console.log("🚀 ~ AddCustomer ~ setGroup(e.target.value):", setGroup(e.target.value))}
       aria-labelledby="demo-row-radio-buttons-group-label"
       name="row-radio-buttons-group"
      >
       <FormControlLabel value="general" control={<Radio style={{ color: 'blue'}}/>} label="General" />
       <FormControlLabel value="shopKeeper" control={<Radio style={{ color: 'blue'}}/>} label="Shop Keeper" />
       <FormControlLabel value="fraud" control={<Radio style={{ color: 'blue'}}/>} label="Fraud" />
      </RadioGroup>

      <ErrorMessage message={errorMessage} />
    </EditFormLayout>
  );
}

export default EditCustomerProfile;





// import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import EditFormLayout from "../../../../../Components/common/EditFormLayout";
// import ErrorMessage from "../../../../../Components/common/ErrorMessage";
// import EmailField from "../../../../../Components/common/EmailField";
// import { editCustomerProfile } from "../customerService";

// function EditCustomerProfile({ customers, onClose, onEditSuccess }) {
//   const [editedCustomer, setEditedCustomer] = useState({ ...customers });
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     onClose();

//     try {
//       await editCustomerProfile(customers._id, editedCustomer);
//       onEditSuccess();
//     } catch (error) {
//       setErrorMessage("Failed to edit customer profile.");
//     }
//       console.log("🚀 ~ handleSubmit ~ editedCustomer:", editedCustomer)
//       console.log("🚀 ~ handleSubmit ~ customers._id:", customers._id)
//   };

//   return (
//     <EditFormLayout
//       title="Edit Customer Profile"
//       onSubmit={handleSubmit}
//       onClose={onClose}
//     >
//       <TextField
//         id="firstName"
//         label="Customer First Name"
//         value={editedCustomer.firstName}
//         onChange={(e) =>
//           setEditedCustomer({ ...editedCustomer, firstName: e.target.value })
//         }
//         placeholder="Customer First Name"
//         required
//       />
//       <TextField
//         id="lastName"
//         label="Customer Last Name"
//         value={editedCustomer.lastName}
//         onChange={(e) =>
//           setEditedCustomer({ ...editedCustomer, lastName: e.target.value })
//         }
//         placeholder="Customer Last Name"
//         required
//       />
//       <EmailField
//         label="Customer Email"
//         value={editedCustomer.email}
//         setEmail={(value) =>
//           setEditedCustomer({ ...editedCustomer, email: value })
//         }
//         required
//       />
//       <TextField
//         id="mobile"
//         label="Customer Phone"
//         value={editedCustomer.mobile}
//         onChange={(e) =>
//           setEditedCustomer({ ...editedCustomer, mobile: e.target.value })
//         }
//         placeholder="Customer Phone"
//         required
//       />
//       <label>Change Customer Group: </label>
//       <ul>
//         <select
//           id="group"
//           value={editedCustomer.group}
//           onChange={(e) =>
//             setEditedCustomer({ ...editedCustomer, group: e.target.value })
//           }
//           className="mt-2"
//         >
//           <option value="general">General</option>
//           <option value="shopKeeper">Shop Keeper</option>
//           <option value="fraud">Fraud</option>
//         </select>
//       </ul>
//       <ErrorMessage message={errorMessage} />
//     </EditFormLayout>
//   );
// }

// export default EditCustomerProfile;















// import React, { useState, useEffect } from "react";
// import TextField from "../../../../../Components/common/TextField";
// import EditFormLayout from "../../../../../Components/common/EditFormLayout";
// import ErrorMessage from "../../../../../Components/common/ErrorMessage";
// import EmailField from "../../../../../Components/common/EmailField";
// import { editCustomerProfile } from "../customerService";

// function EditCustomerProfile({ customer, onClose, onEditSuccess }) {
//   const [firstName, setFirstName] = useState(customer?.firstName || "");
//   const [lastName, setLastName] = useState(customer?.lastName || "");
//   const [email, setEmail] = useState(customer?.email || "");
//   const [mobile, setMobile] = useState(customer?.mobile || "");
//   const [group, setGroup] = useState(customer?.group || "");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     // Update state values when customer prop changes
//     setFirstName(customer?.firstName || "");
//     setLastName(customer?.lastName || "");
//     setEmail(customer?.email || "");
//     setMobile(customer?.mobile || "");
//     setGroup(customer?.group || "");
//   }, [customer]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     onClose();

//     try {
//       await editCustomerProfile(customer._id, {
//         firstName,
//         lastName,
//         email,
//         mobile,
//         group,
//       });
//       onEditSuccess();
//     } catch (error) {
//       setErrorMessage("Failed to edit customer profile.");
//     }
//   };

//   return (
//     <EditFormLayout
//       title="Edit Customer Profile"
//       onSubmit={handleSubmit}
//       onClose={onClose}
//     >
//       <TextField
//         id="firstName"
//         label="Customer First Name"
//         value={firstName}
//         onChange={(value) => setFirstName(value)}
//         placeholder="Customer First Name"
//         required
//       />
//       <TextField
//         id="lastName"
//         label="Customer Last Name"
//         value={lastName}
//         onChange={(value) => setLastName(value)}
//         placeholder="Customer Last Name"
//         required
//       />
//       <EmailField
//         label="Customer Email"
//         value={email}
//         setEmail={setEmail}
//         required
//       />
//       <TextField
//         id="mobile"
//         label="Customer Phone"
//         value={mobile}
//         onChange={(value) => setMobile(value)}
//         placeholder="Customer Phone"
//         required
//       />
//       <label>Change Customer Group: </label>
//       <ul>
//         <select
//           id="group"
//           value={group}
//           onChange={(e) => setGroup(e.target.value)}
//           className="mt-2"
//         >
//           <option value="general">General</option>
//           <option value="shopKeeper">Shop Keeper</option>
//           <option value="fraud">Fraud</option>
//         </select>
//       </ul>

//       <ErrorMessage message={errorMessage} />
//     </EditFormLayout>
//   );
// }

// export default EditCustomerProfile;
