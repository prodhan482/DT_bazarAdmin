import ViewDetailsField from "../../../../../Components/common/ViewDetailsField";
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout";
function ViewOrderList({ orderList, onClose }) {
  return (
    <ViewDetailsLayout label={"Order Details"} onClose={onClose}>
      <ViewDetailsField fieldName={"Customer Name"} data={orderList.customer?.firstName+' '+orderList.customer?.lastName} />
      <ViewDetailsField fieldName={"Total"} data={orderList.total} />
      <ViewDetailsField fieldName={"Status"} data={orderList.orderStatus} />
      <ViewDetailsField fieldName={"Note"} data={orderList.notes} />
    </ViewDetailsLayout>
  );
}

export default ViewOrderList;
