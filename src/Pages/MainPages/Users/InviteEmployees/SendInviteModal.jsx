import { useState } from 'react';
import { sendInvite } from './inviteEmployeeService';
import Cross from '../../../../Components/Icons/Cross';
import EmailField from "../../../../Components/common/EmailField"
import AddFormLayout from '../../../../Components/common/AddFormLayout';
import TextField from '../../../../Components/common/TextField';
import ErrorMessage from '../../../../Components/common/ErrorMessage';

function SendInvite({ onClose, onSuccess }) {
  const [inviteName, setInviteName] = useState('');
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    try {
      await sendInvite({
        email: inviteName,
      });

      onSuccess();
    } catch (error) {
      setErrorMessage("Invitation Failed");
    }
  };

  return (
    <AddFormLayout
    title="Send Invitation"
    onSubmit={handleSubmit}
    onClose={onClose}
  >

    <TextField
      label="Email"
      value={inviteName}
      onChange={setInviteName}
      placeholder="Enter email"
      required
    />
    <ErrorMessage message={errorMessage} />
  </AddFormLayout>
  );
}

export default SendInvite;

