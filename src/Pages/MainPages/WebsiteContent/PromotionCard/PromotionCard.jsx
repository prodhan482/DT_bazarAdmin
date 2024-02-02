import { useState, useEffect } from "react"

import PromotionCardTable from "./PromotionCardTable"
import ViewPromotionCard from "./PromotionCardCRUD/ViewPromotionCard"
import EditPromotionCard from "./PromotionCardCRUD/EditPromotionCard"
import DeletePromotionCard from "./PromotionCardCRUD/DeletePromotionCard"
import AddPromotionCard from "./PromotionCardCRUD/AddPromotionCard"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItem } from "./promotionCardService"

function PromotionCard() {

  const [promotionCard, setPromotionCard] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedPromotionCard, setSelectedPromotionCard] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItem()
        setPromotionCard(response)

      } catch (error) {

        setErrorMessage("Error Promotion Card. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All Promotion Card"
      itemCount = {promotionCard.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <PromotionCardTable
        promotionCard={promotionCard}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedPromotionCard = {setSelectedPromotionCard}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewPromotionCard
            promotionCard = {selectedPromotionCard}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal>
          <AddPromotionCard
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditPromotionCard
            promotionCard = {selectedPromotionCard}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeletePromotionCard
            promotionCard = {selectedPromotionCard}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default PromotionCard
