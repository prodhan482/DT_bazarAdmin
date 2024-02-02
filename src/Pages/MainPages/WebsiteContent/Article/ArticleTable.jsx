import Table from "../../../../Components/table/Table"
import TableHeadingRow from "../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../Components/table/TableHeading"
import TextCell from "../../../../Components/table/TextCell"
import ViewTableButton from "../../../../Components/table/ViewTableButton"
import EditTableButton from "../../../../Components/table/EditTableButton"
import DeleteTableButton from "../../../../Components/table/DeleteTableButton"
import TableButtonCell from "../../../../Components/table/TableButtonCell"
import TableRow from "../../../../Components/table/TableRow"
import TableBody from "../../../../Components/table/TableBody"
import ImageCell from "../../../../Components/table/ImageCell"
import TableImage from "../../../../Components/table/TableImage"
import TextEditorCell from "../../../../Components/table/TextEditorCell"

function ArticleTable({

  article,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedArticle,

}) {
  return (

    <Table>

      <TableHeadingRow>
        <TableHeading text="Image" />
        <TableHeading text="Title" />
        <TableHeading text="Description" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {article.map(article => (
          <TableRow key={article._id} item={article}>
            <ImageCell>
              <TableImage img={article.image} />
            </ImageCell>
            <TextCell text={article.title} />
            <TextEditorCell text={{__html: article.description}} />
            <TableButtonCell>
              <ViewTableButton
                onClick={() => {
                  setSelectedArticle(article)
                  setIsViewModalOpen(true)
                }}
              />
              <EditTableButton
                onClick={() => {
                  setSelectedArticle(article)
                  setIsEditModalOpen(true)
                }}
              />
              <DeleteTableButton
                onClick={() => {
                  setSelectedArticle(article)
                  setIsDeleteModalOpen(true)
                }}
              />
            </TableButtonCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
  )
}

export default ArticleTable
