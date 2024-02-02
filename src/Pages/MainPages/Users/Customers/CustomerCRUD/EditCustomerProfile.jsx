import { useState } from "react"

import TextField from "../../../../../Components/common/TextField"
import EditFormLayout from "../../../../../Components/common/EditFormLayout"

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { editCustomerProfile } from "../customerService"
import EmailField from "../../../../../Components/common/EmailField"
// import ToggleSwitch from "../../../../../Components/common/ToggleSwitch"

function EditCustomerProfile({ customer, onClose, onEditSuccess }) {

  const [firstName, setFirstName] = useState(customer.firstName)
  const [lastName, setLastName] = useState(customer.lastName)
  const [email, setEmail] = useState(customer.email)
  const [mobile, setMobile] = useState(customer.mobile)
  const [group, setGroup] = useState(customer.group)
//   const [isVerified, setIsVerified] = useState(customer.isVerified);

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    onClose()

    try {

      await editCustomerProfile(customer._id, {
        firstName,
        lastName,
        email,
        mobile,
        group,
        // isVerified: isVerified ? true : "false",
      })

      onEditSuccess()

    } catch (error) {

      setErrorMessage("Failed edit")

    }
  }


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
      <EmailField label="Customer Email"
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
      <label>Change Customer Group:  </label>
      <ul>
      <select
          id="group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="mt-2"
          
      >
        
          <option value="general">General</option>
          <option value="shopKeeper">Shop Keeper</option>

          <option value="fraud">Fraud</option>
          
      </select>
      </ul>
      {/* <ToggleSwitch
        id="isVerified"
        label="Customer Verified Status"
        checked={isVerified}
        onChange={() => setIsVerified(!isVerified)}
      /> */}

      <ErrorMessage message={errorMessage} />

    </EditFormLayout>

  )
}

export default EditCustomerProfile
