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

function FooterInfoTable({

  footerInfo,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedFooterInfo,

}) {
  return (

    <Table>

      <TableHeadingRow>
        <TableHeading text="Logo" />
        <TableHeading text="Description" />
        <TableHeading text="Address" />
        <TableHeading text="Mobile" />
        <TableHeading text="Email" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {footerInfo.map(footerInfo => (
          <TableRow key={footerInfo._id} item={footerInfo}>
            <ImageCell>
              <TableImage img={footerInfo.logo} />
            </ImageCell>
            <TextCell text={footerInfo.description} />
            <TextCell text={footerInfo.address} />
            <TextCell text={footerInfo.mobile} />
            <TextCell text={footerInfo.email} />
            <TableButtonCell>
              <ViewTableButton
                onClick={() => {
                  setSelectedFooterInfo(footerInfo)
                  setIsViewModalOpen(true)
                }}
              />
              <EditTableButton
                onClick={() => {
                  setSelectedFooterInfo(footerInfo)
                  setIsEditModalOpen(true)
                }}
              />
              <DeleteTableButton
                onClick={() => {
                  setSelectedFooterInfo(footerInfo)
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

export default FooterInfoTable
