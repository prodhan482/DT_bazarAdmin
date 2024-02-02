import { useState, useEffect } from "react"

import PbcNumberTable from "./PbcNumberTable"
import ViewPbcNumber from "./PbcNumberCRUD/ViewPbcNumber"
import EditPbcNumber from "./PbcNumberCRUD/EditPbcNumber"
import DeletePbcNumber from "./PbcNumberCRUD/DeletePbcNumber"
import AddPbcNumber from "./PbcNumberCRUD/AddPbcNumber"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItem } from "./pbcNumberService"

function PbcNumber() {

  const [pbcNumber, setPbcNumber] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedPbcNumber, setSelectedPbcNumber] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItem()
        setPbcNumber(response)

      } catch (error) {

        setErrorMessage("Error Promo Code by Number. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All Promo Code by Number"
      itemCount = {pbcNumber.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <PbcNumberTable
        pbcNumber={pbcNumber}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedPbcNumber = {setSelectedPbcNumber}
      />

      {/* {isViewModalOpen && (
        <Modal>
          <ViewPromotionCard
            promotionCard = {selectedPromotionCard}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )} */}

      {isAddModalOpen && (
        <Modal>
          <AddPbcNumber
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {/* {isEditModalOpen && (
        <Modal>
          <EditPromotionCard
            promotionCard = {selectedPromotionCard}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )} */}

      {isDeleteModalOpen && (
        <Modal>
          <DeletePbcNumber
            pbcNumber = {selectedPbcNumber}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default PbcNumber
