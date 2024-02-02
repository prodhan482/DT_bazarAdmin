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

function PbcNumberTable({

  pbcNumber,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedPbcNumber,

}) {
  return (

    <Table>

      <TableHeadingRow>
        <TableHeading text="Promo Code Name" />
        <TableHeading text="Mobile" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {pbcNumber.map(pbcNumber => (
          <TableRow key={pbcNumber._id} item={pbcNumber}>
            <TextCell text={pbcNumber.promoCode?.name} />
            <TextCell text={pbcNumber.mobile} />
            <TableButtonCell>
              {/* <ViewTableButton
                onClick={() => {
                  setSelectedPbcNumber(pbcNumber)
                  setIsViewModalOpen(true)
                }}
              />
              <EditTableButton
                onClick={() => {
                  setSelectedPbcNumber(pbcNumber)
                  setIsEditModalOpen(true)
                }}
              /> */}
              <DeleteTableButton
                onClick={() => {
                  setSelectedPbcNumber(pbcNumber)
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

export default PbcNumberTable
