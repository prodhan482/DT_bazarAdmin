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

function DeliveryFeeTable({

  deliveryFee,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedDeliveryFee,

}) {

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  return (

    <Table>

      <TableHeadingRow>
        <TableHeading text="Name" />
        <TableHeading text="Minimum Amount" />
        <TableHeading text="Maximum Amount" />
        <TableHeading text="Delivery Fee" />
        <TableHeading text="Is Applicable" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {deliveryFee.map(deliveryFee => (
          <TableRow key={deliveryFee._id} item={deliveryFee}>
            <TextCell text={deliveryFee.name} />
            <TextCell text={deliveryFee.minAmount} />
            <TextCell text={deliveryFee.maxAmount} />
            <TextCell text={deliveryFee.fee} />
            <TextCell text={`${deliveryFee.isApplicable}`} />
            <TableButtonCell>
              <ViewTableButton
                onClick={() => {
                  setSelectedDeliveryFee(deliveryFee)
                  setIsViewModalOpen(true)
                }}
              />
              <EditTableButton
                onClick={() => {
                  setSelectedDeliveryFee(deliveryFee)
                  setIsEditModalOpen(true)
                }}
              />
              <DeleteTableButton
                onClick={() => {
                  setSelectedDeliveryFee(deliveryFee)
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

export default DeliveryFeeTable
