import { useState, useEffect } from "react"

import FooterInfoTable from "./FooterInfoTable"
import ViewFooterInfo from "./FooterInfoCRUD/ViewFooterInfo"
import EditFooterInfo from "./FooterInfoCRUD/EditFooterInfo"
import DeleteFooterInfo from "./FooterInfoCRUD/DeleteFooterInfo"
import AddFooterInfo from "./FooterInfoCRUD/AddFooterInfo"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"
import TextEditorPageLayout from "../../../../Components/common/TextEditorPageLayout";

import { getItems } from "./footerInfoService"

function FooterInfo() {

  const [footerInfo, setFooterInfo] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedFooterInfo, setSelectedFooterInfo] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData() {

      try {

        const response = await getItems()
        setFooterInfo(response)

      } catch (error) {

        setErrorMessage("Error Footer Information. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <TextEditorPageLayout
      title="Footer Information"
      itemCount={footerInfo.length}
    >
      {footerInfo.length === 0 ? (
        <AddFooterInfo
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleSuccess}
        />
      ) : (

        <FooterInfoTable
          footerInfo={footerInfo}
          setIsViewModalOpen={setIsViewModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedFooterInfo={setSelectedFooterInfo}
        />
      )}

      {isViewModalOpen && (
        <Modal>
          <ViewFooterInfo
            footerInfo={selectedFooterInfo}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage={errorMessage}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditFooterInfo
            footerInfo={selectedFooterInfo}
            onClose={() => setIsEditModalOpen(false)}
            onEditSuccess={handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteFooterInfo
            footerInfo={selectedFooterInfo}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess={handleSuccess}
          />
        </Modal>
      )}

    </TextEditorPageLayout>

  )
}

export default FooterInfo
