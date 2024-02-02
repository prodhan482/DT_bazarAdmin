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
import { useLevels } from "../../../../Utils/useLevels"
import ViewDetailsText from "../../../../Components/common/ViewDetailsText"

import { useNavigate } from "react-router-dom";

function PromoCodeTable({

  promoCode,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedPromoCode,

}) {

  const navigate = useNavigate();
  
  const {admin,cs,cx} = useLevels();

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  return (
<div className="w-full ">
      <div className="overflow-x-scroll">
    <Table>

      <TableHeadingRow>
        <TableHeading text="Name" />
        <TableHeading text="Description" />
        <TableHeading text="Promo" />
        <TableHeading text="Max Limit" />
        <TableHeading text="Discount Type" />
        <TableHeading text="Discount Amount" />
        <TableHeading text="Promo Type" />
        <TableHeading text="Customer Per Use" />
        <TableHeading text="Start Date" />
        <TableHeading text="End Date" />
        <TableHeading text="Is Promo by Number" />
        <TableHeading text="Active Status" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {promoCode.map(promoCode => (
          <TableRow key={promoCode._id} item={promoCode}>
            <TextCell text={promoCode.name} />
            <TextCell text={promoCode.description} />
            <ViewDetailsText
                label={promoCode.promo}
                onClick={() =>  navigate(`/ViewCustomerByPromoCode/${promoCode.promo}`)}
              />
            <TextCell text={promoCode.maxlimit} />
            <TextCell text={promoCode.discountType} />
            <TextCell text={promoCode.discountAmount} />
            <TextCell text={promoCode.promotype} />
            <TextCell text={promoCode.customerPerUse} />
            <TextCell text={formatDate(promoCode.validStartDate)} />
            <TextCell text={formatDate(promoCode.validEndDate)} />
            <TextCell text={`${promoCode.isPbcNumber}`} />
            <TextCell text={`${promoCode.isActive}`} />
            <TableButtonCell>
              <ViewTableButton
                onClick={() => {
                  setSelectedPromoCode(promoCode)
                  setIsViewModalOpen(true)
                }}
              />
             {admin && <EditTableButton
                onClick={() => {
                  setSelectedPromoCode(promoCode)
                  setIsEditModalOpen(true)
                }}
              />}
              {admin &&
              <DeleteTableButton
                onClick={() => {
                  setSelectedPromoCode(promoCode)
                  setIsDeleteModalOpen(true)
                }}
              />
    }
            </TableButtonCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </div>
  )
}

export default PromoCodeTable
