import { useEffect, useState } from "react";

import { getItems } from "./customerService"

import CustomerTable from "./CustomerTable";
import ViewCustomer from "./CustomerCRUD/ViewCustomer";
import EditCustomerProfile from "./CustomerCRUD/EditCustomerProfile";
import Modal from "../../../../Components/common/Modal"
import CreateOrder from "./CustomerCRUD/CreateOrder";
import AddCustomer from "./CustomerCRUD/AddCustomer";
import CustomerPageLayout from "../../../../Components/common/CustomerPageLayout";


function Customers() {

  const [customers, setCustomers] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData() {

      try {

        const response = await getItems()
        setCustomers(response)

      } catch (error) {

        setErrorMessage("Error customers. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }
  return (
    <CustomerPageLayout
      title="All Customers"
      itemCount={customers.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <CustomerTable
        customers={customers}
        setIsViewModalOpen={setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setSelectedCustomer={setSelectedCustomer}
      />

{/* <CreateOrder
        customers={customers}
        // setIsViewModalOpen={setIsViewModalOpen}
        // setIsEditModalOpen = {setIsEditModalOpen}
        setSelectedCustomer={setSelectedCustomer}
      /> */}
 
     {isAddModalOpen && (
        <Modal>
          <AddCustomer
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isViewModalOpen && (
        <Modal>
          <ViewCustomer
            customer={selectedCustomer}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage={errorMessage}
          />
        </Modal>
      )}

{isEditModalOpen && (
        <Modal>
          <EditCustomerProfile
           customer={selectedCustomer}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </CustomerPageLayout>

  )
}


export default Customers;