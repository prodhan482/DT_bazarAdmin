import Table from "../../../../Components/table/Table"
import TableHeadingRow from "../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../Components/table/TableHeading"
import TextCell from "../../../../Components/table/TextCell"
import EditTableButton from "../../../../Components/table/EditTableButton"
import DeleteTableButton from "../../../../Components/table/DeleteTableButton"
import TableButtonCell from "../../../../Components/table/TableButtonCell"
import TableRow from "../../../../Components/table/TableRow"
import TableBody from "../../../../Components/table/TableBody"
import TextEditorCell from "../../../../Components/table/TextEditorCell"

function TermsAndConditionsTable({

  termsAndConditions,
  setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedTermsAndConditions,

}) {
  return (

    <Table>

      <TableHeadingRow>
        <TableHeading text="Name" />
        <TableHeading text="Description" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {termsAndConditions.map(termsAndConditions => (
          <TableRow key={termsAndConditions._id} item={termsAndConditions}>
            <TextCell text={termsAndConditions.name} />
            <TextEditorCell text={{ __html: termsAndConditions.description }} />
            <TableButtonCell>
              <EditTableButton
                onClick={() => {
                  setSelectedTermsAndConditions(termsAndConditions)
                  setIsEditModalOpen(true)
                }}
              />
              <DeleteTableButton
                onClick={() => {
                  setSelectedTermsAndConditions(termsAndConditions)
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

export default TermsAndConditionsTable

