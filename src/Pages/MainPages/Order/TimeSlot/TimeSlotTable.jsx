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

function TimeSlotTable({

  timeSlot,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedTimeSlot,

}) {

  return (

    <Table>

      <TableHeadingRow>
        <TableHeading text="Start Time" />
        <TableHeading text="End Time" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {timeSlot.map(timeSlot => (
          <TableRow key={timeSlot._id} item={timeSlot}>
            <TextCell text={timeSlot.startTime} />
            <TextCell text={timeSlot.endTime} />
            <TableButtonCell>
              <ViewTableButton
                onClick={() => {
                  setSelectedTimeSlot(timeSlot)
                  setIsViewModalOpen(true)
                }}
              />
              <EditTableButton
                onClick={() => {
                  setSelectedTimeSlot(timeSlot)
                  setIsEditModalOpen(true)
                }}
              />
              <DeleteTableButton
                onClick={() => {
                  setSelectedTimeSlot(timeSlot)
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

export default TimeSlotTable
