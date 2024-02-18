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
import EditTableButton from "../../../../Components/table/EditTableButton"
import DeleteTableButton from "../../../../Components/table/DeleteTableButton"


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

  const columns = [
    { field: "index", headerName: "#", flex: 0.2 },
    { field: "name", headerName: "Product", flex: 2 },
    { field: "precedence", headerName: "Precedence", flex: 1 },
    // { field: "isHome", headerName: "Is Home", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 0.4,
      renderCell: (params) => (
        <div  style={{ display: 'flex', gap: '8px' }}>
          <EditTableButton 
            onClick={() => {
              setSelectedQuickAds(params.row);
              setIsEditModalOpen(true);
            }}
          />
          
          <DeleteTableButton
            onClick={() => {
              setSelectedQuickAds(params.row);
              setIsDeleteModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (

    <PageLayout
      title = "Quick Ads"
      // itemCount = {quickAds.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      {/* <QuickAdsTable
        quickAds={quickAds}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedQuickAds = {setSelectedQuickAds}
      /> */}

       {quickAds && quickAds.length > 0 ? (
        <QuickAdsTable
        quickAds={quickAds?.map((quickAds, index) => ({
            id: quickAds?._id,
            index: index + 1,
            name: quickAds?.name,
            precedence: quickAds?.precedence,
            isHome: quickAds?.isHome,
            // action: (
            //   <ViewDetailsButton
            //     label="Edit Profile"
            //     onClick={() => {
            //       setSelectedCustomer(id);
            //       setIsEditModalOpen(true);
            //     }}
            //   />
            // ),
          }))}
          columns={columns}
          setIsViewModalOpen={setIsViewModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          setSelectedQuickAds={setSelectedQuickAds}
        />
      ) : (
        <div>Loading...</div>
      )}

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
