import { useState, useEffect } from "react"

import OrderListTable from "./OrderListTable"
import ViewOrderList from "./OrderListCRUD/ViewOrderList"
// import EditOrderList from "./OrderListCRUD/EditOrderList"
// import DeleteOrderList from "./OrderListCRUD/DeleteOrderList"
// import AddOrderList from "./OrderListCRUD/AddOrderList"
import TextEditorPageLayout from "../../../../Components/common/TextEditorPageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./orderListService"
// import { getItems as getCustomerData } from "../../Users/Customers/customerService"

function OrderList() {

  const [orderList, setOrderList] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedOrderList, setSelectedOrderList] = useState(null)

  const [customerData, setCustomerData] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItems()
        // const CustomerData = await getCustomerData()
        setOrderList(response)
        // setCustomerData(CustomerData)

      } catch (error) {

        setErrorMessage("Error Order List. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <TextEditorPageLayout
      title = "All Order List"
      itemCount = {orderList.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <OrderListTable
        orderList={orderList}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedOrderList = {setSelectedOrderList}
        // customerData={customerData}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewOrderList
            orderList = {selectedOrderList}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {/* {isAddModalOpen && (
        <Modal>
          <AddOrderList
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditOrderList
            orderList = {selectedOrderList}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteOrderList
            orderList = {selectedOrderList}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )} */}

    </TextEditorPageLayout>

  )
}

export default OrderList
