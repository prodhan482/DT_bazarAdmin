import { useState } from "react"

import TextField from "../../../../../Components/common/TextField"
import PrecedenceField from "../../../../../Components/common/PrecedenceField"
import DescriptionField from "../../../../../Components/common/DescriptionField"
import AddFormLayout from "../../../../../Components/common/AddFormLayout"
import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { addCustomer } from "../customerService"
import EmailField from "../../../../../Components/common/EmailField"
import NumberInputField from "../../../../../Components/common/NumberInputField"
import PasswordField from "../../../../../Components/common/PasswordField"
import ImageUploader from "../../../../../Components/common/ImageUploader"
import ToggleSwitch from "../../../../../Components/common/ToggleSwitch"

function AddCustomer({ onClose, onSuccess }) {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [gender, setGender] = useState("Female")
  const [password, setPassword] = useState("")
  const [group, setGroup] = useState("General")
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null)
  const [isVerified, setIsVerified] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      onClose()

      await addCustomer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        gender: gender,
        password: password,
        group: group,
        image: image,
        isVerified: isVerified,
      })

      onSuccess()

    } catch (error) {

      setErrorMessage("Add Failed")

    }
  }

  return (

    <AddFormLayout
      title="Add Customer"
      onSubmit={handleSubmit}
      onClose={onClose}
    >

      <TextField
        label="First Name"
        value={firstName}
        onChange={setFirstName}
        placeholder="First Name"
        required
      />

       <TextField
        label="Last Name"
        value={lastName}
        onChange={setLastName}
        placeholder="Last Name"
        required
      />

     <NumberInputField label="Mobile"
        value={mobile}
        onChange={setMobile}
        placeholder="Mobile"
        required
      />

      <label htmlFor="gender">Gender: </label>
      <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>

      <EmailField label="Email"
        value={email}
        setEmail={setEmail}
        placeholder="Email"
        required
      />

      <ImageUploader
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
      />

      <PasswordField setPassword={setPassword} label="Password" placeholder="Password" />

      <label htmlFor="group">Group: </label>
      <select id="group" value={group} onChange={(e) => setGroup(e.target.value)}>
        <option value="general">General</option>
        <option value="shopKeeper">Shop Keeper</option>
        <option value="fraud">Fraud</option>
      </select>

      <ToggleSwitch
        id="isVerified"
        label="Verified Status"
        value={isVerified}
        checked={isVerified}
        onChange={() => setIsVerified(!isVerified)}
      />

      <ErrorMessage message={errorMessage} />

    </AddFormLayout>

  )
}

export default AddCustomer
