import { useState, useEffect } from "react"

import ScrollTextTable from "./ScrollTextTable"
// import ViewScrollText from "./ScrollTextCRUD/ViewScrollText"
import EditScrollText from "./ScrollTextCRUD/EditScrollText"
import DeleteScrollText from "./ScrollTextCRUD/DeleteScrollText"
import AddScrollText from "./ScrollTextCRUD/AddScrollText"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getAlltems } from "./scrollTextService"

function ScrollText() {

  const [scrollText, setScrollText] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedScrollText, setSelectedScrollText] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getAlltems()
        setScrollText(response)

      } catch (error) {

        setErrorMessage("Error Scroll Text. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All Scroll Text"
      itemCount = {scrollText.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <ScrollTextTable
        scrollText={scrollText}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedScrollText = {setSelectedScrollText}
      />

      {/* {isViewModalOpen && (
        <Modal>
          <ViewScrollText
            scrollText = {selectedScrollText}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )} */}

      {isAddModalOpen && (
        <Modal>
          <AddScrollText
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditScrollText
            scrollText = {selectedScrollText}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteScrollText
            scrollText = {selectedScrollText}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default ScrollText
