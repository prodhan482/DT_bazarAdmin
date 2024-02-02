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

function QuickAdsTable({

    quickAds,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedQuickAds,

}) {
  return (

    <Table>

      <TableHeadingRow>
        <TableHeading text="Product" />
        <TableHeading text="Precedence" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {quickAds.map(quickAds => (
          <TableRow key={quickAds?._id} item={quickAds}>
            <TextCell text={quickAds?.product?.name} />
            <TextCell text={quickAds?.precedence} />
            <TableButtonCell>
              {/* <ViewTableButton
                onClick={() => {
                  setSelectedQuickAds(quickAds)
                  setIsViewModalOpen(true)
                }}
              /> */}
              <EditTableButton
                onClick={() => {
                  setSelectedQuickAds(quickAds)
                  setIsEditModalOpen(true)
                }}
              />
              <DeleteTableButton
                onClick={() => {
                  setSelectedQuickAds(quickAds)
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

export default QuickAdsTable
