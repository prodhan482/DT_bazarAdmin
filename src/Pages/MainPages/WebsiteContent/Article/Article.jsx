import { useState, useEffect } from "react"

import ArticleTable from "./ArticleTable"
import ViewArticle from "./ArticleCRUD/ViewArticle"
import EditArticle from "./ArticleCRUD/EditArticle"
import DeleteArticle from "./ArticleCRUD/DeleteArticle"
import AddArticle from "./ArticleCRUD/AddArticle"
import PageLayout from "../../../../Components/common/PageLayout"
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./articleService"

function Article() {

  const [article, setArticle] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [selectedArticle, setSelectedArticle] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getItems()
        setArticle(response)

      } catch (error) {

        setErrorMessage("Error Article. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (

    <PageLayout
      title = "All Article"
      itemCount = {article.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >

      <ArticleTable
        article={article}
        setIsViewModalOpen = {setIsViewModalOpen}
        setIsEditModalOpen = {setIsEditModalOpen}
        setIsDeleteModalOpen = {setIsDeleteModalOpen}
        setSelectedArticle = {setSelectedArticle}
      />

      {isViewModalOpen && (
        <Modal>
          <ViewArticle
            article = {selectedArticle}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal>
          <AddArticle
            onClose={() => setIsAddModalOpen(false)}
            onSuccess ={handleSuccess}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditArticle
            article = {selectedArticle}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <DeleteArticle
            article = {selectedArticle}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}

    </PageLayout>

  )
}

export default Article
