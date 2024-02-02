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

function AchivementTable({

  achivement,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedAchivement,

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
        {achivement.map(achivement => (
          <TableRow key={achivement._id} item={achivement}>
            <ImageCell>
              <TableImage img={achivement.image} />
            </ImageCell>
            <TextCell text={achivement.title} />
            <TextCell text={achivement.description} />
            <TableButtonCell>
              <ViewTableButton
                onClick={() => {
                  setSelectedAchivement(achivement)
                  setIsViewModalOpen(true)
                }}
              />
              <EditTableButton
                onClick={() => {
                  setSelectedAchivement(achivement)
                  setIsEditModalOpen(true)
                }}
              />
              <DeleteTableButton
                onClick={() => {
                  setSelectedAchivement(achivement)
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

export default AchivementTable
