import { useState, useEffect, useContext } from "react"

import QuickAdsTable from "./QuickAdsTable"
// import ViewQuickAds from "./QuickAdsCRUD/ViewQuickAds"
import EditQuickAds from "./QuickAdsCRUD/EditQuickAds"
import DeleteQuickAds from "./QuickAdsCRUD/DeleteQuickAds"
import AddQuickAds from "./QuickAdsCRUD/AddQuickAds"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./quickAdsService"

import { useLevels } from "../../../../Utils/useLevels"


function QuickAds() {

  const {admin} = useLevels()

  

  const [quickAds, setQuickAds] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedQuickAds, setSelectedQuickAds] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItems()
        setQuickAds(response)

      } catch (error) {

        setErrorMessage("Error Quick Ads. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All Quick Ads"
      itemCount = {quickAds.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <QuickAdsTable
        quickAds={quickAds}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedQuickAds = {setSelectedQuickAds}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewQuickAds
            quickAds = {selectedQuickAds}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal>
          <AddQuickAds
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditQuickAds
            quickAds = {selectedQuickAds}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteQuickAds
            quickAds = {selectedQuickAds}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default QuickAds
