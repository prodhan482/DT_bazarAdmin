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

function MarqueeTable({

    marquee,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedMarquee,

}) {
  return (

    <Table>

      <TableHeadingRow>
        <TableHeading text="Title" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {marquee.map(item => (
          <TableRow key={item._id} item={item}>
    
            <TextCell text={item.name} />

            <TableButtonCell>
              {/* <ViewTableButton
                onClick={() => {
                  setSelectedAchivement(achivement)
                  setIsViewModalOpen(true)
                }}
              /> */}
              <EditTableButton
                onClick={() => {
                    setSelectedMarquee(item)
                  setIsEditModalOpen(true)
                }}
              />
              <DeleteTableButton
                onClick={() => {
                    setSelectedMarquee(item)
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

export default MarqueeTable
