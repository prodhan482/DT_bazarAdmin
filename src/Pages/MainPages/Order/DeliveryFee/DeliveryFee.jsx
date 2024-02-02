import { useState, useEffect } from "react"

import DeliveryFeeTable from "./DeliveryFeeTable"
import ViewDeliveryFee from "./DeliveryFeeCRUD/ViewDeliveryFee"
import EditDeliveryFee from "./DeliveryFeeCRUD/EditDeliveryFee"
import DeleteDeliveryFee from "./DeliveryFeeCRUD/DeleteDeliveryFee"
import AddDeliveryFee from "./DeliveryFeeCRUD/AddDeliveryFee"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./deliveryFeeService"

function DeliveryFee() {

  const [deliveryFee, setDeliveryFee] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedDeliveryFee, setSelectedDeliveryFee] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItems()
        setDeliveryFee(response)

      } catch (error) {

        setErrorMessage("Error Delivery Fee. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All Delivery Fee"
      itemCount = {deliveryFee.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <DeliveryFeeTable
        deliveryFee={deliveryFee}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedDeliveryFee = {setSelectedDeliveryFee}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewDeliveryFee
            deliveryFee = {selectedDeliveryFee}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal>
          <AddDeliveryFee
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditDeliveryFee
            deliveryFee = {selectedDeliveryFee}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteDeliveryFee
            deliveryFee = {selectedDeliveryFee}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default DeliveryFee
