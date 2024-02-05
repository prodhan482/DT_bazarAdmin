import { useState } from "react"

import EditFormLayout from "../../../../../Components/common/EditFormLayout"

import ErrorMessage from "../../../../../Components/common/ErrorMessage"

import { editEmployeeGroupChange } from "../employeeService"

function EditEmployeeGroup({ item, onClose, onEditSuccess }) {

  const [level, setLevel] = useState([])

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    onClose()

    try {

      await editEmployeeGroupChange(item._id, {
        level: level,
      })

      onEditSuccess()

    } catch (error) {

      setErrorMessage("Failed edit")

    }
  }

  return (

    <EditFormLayout
      title="Change Employee Level"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
          <select
              className="text-black"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
          >
              <option value="admin">Admin</option>
              <option value="marketing">Marketing</option>
              <option value="cs">CS</option>
              <option value="cx">CX</option>
              <option value="executive">Executive</option>
              <option value="operationEmployee">Operation Employee</option>
              <option value="employee">Employee</option>
          </select>

      <ErrorMessage message={errorMessage} />

    </EditFormLayout>

  )
}

export default EditEmployeeGroup
