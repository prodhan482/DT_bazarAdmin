import { useState, useEffect } from "react"

import TermsAndConditionsTable from "./TermsAndConditionsTable"
import EditTermsAndConditions from "./TermsAndConditionsCRUD/EditTermsAndConditions"
import DeleteTermsAndConditions from "./TermsAndConditionsCRUD/DeleteTermsAndConditions"
import AddTermsAndConditions from "./TermsAndConditionsCRUD/AddTermsAndConditions"
import TextEditorPageLayout from "../../../../Components/common/TextEditorPageLayout";
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./termsAndConditionsService"

function TermsAndConditions() {

  const [termsAndConditions, setTermsAndConditions] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedTermsAndConditions, setSelectedTermsAndConditions] = useState(null)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData() {

      try {

        const response = await getItems()
        setTermsAndConditions(response)

      } catch (error) {

        setErrorMessage("Error Terms And Conditions. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <TextEditorPageLayout
      title="Terms And Conditions"
      itemCount={termsAndConditions.length}
    >
      {termsAndConditions.length === 0 ? (
        <AddTermsAndConditions
          termsAndConditions={termsAndConditions}
          onSuccess={handleSuccess}
          onClose={() => setIsAddModalOpen(false)}
        />

      ) : (

        <TermsAndConditionsTable
          termsAndConditions={termsAndConditions}
          setIsEditModalOpen={setIsEditModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedTermsAndConditions={setSelectedTermsAndConditions}
        />
      )}

      {isEditModalOpen && (
        <Modal>
          <EditTermsAndConditions
            termsAndConditions={selectedTermsAndConditions}
            onClose={() => setIsEditModalOpen(false)}
            onEditSuccess={handleSuccess}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteTermsAndConditions
            termsAndConditions={selectedTermsAndConditions}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess={handleSuccess}
          />
        </Modal>
      )}

    </TextEditorPageLayout>

  )
}

export default TermsAndConditions
