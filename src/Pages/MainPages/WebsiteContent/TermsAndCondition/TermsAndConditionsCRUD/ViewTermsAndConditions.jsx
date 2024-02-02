import ViewDetailsField from "../../../../../Components/common/ViewDetailsField";
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout";
function ViewTermsAndConditions({ termsAndConditions, onClose }) {
  return (
    <ViewDetailsLayout label={"Customer Details"} onClose={onClose}>
       <ViewDetailsField fieldName={"Name"} data={termsAndConditions.name} />
      <ViewDetailsField fieldName={"Description"} data={termsAndConditions.description} />
    </ViewDetailsLayout>
  );
}

export default ViewTermsAndConditions;

