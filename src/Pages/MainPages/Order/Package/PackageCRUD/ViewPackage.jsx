import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"

function ViewPackage({ packages, onClose, errorMessage }) {

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  return (

    <ViewDetailsLayout label={"Package Details"} onClose={onClose}>

      <ViewDetailsField fieldName={"Package Name"} data={packages.name} />
      <ViewDetailsField
        fieldName={"Discount Amount"}
        data={packages.discountAmount}
      />
      <ViewDetailsField
        fieldName={"Start Date"}
        data={formatDate(packages.startDate)}
      />
      <ViewDetailsField
        fieldName={"End Date"}
        data={formatDate(packages.endDate)}
      />
      <ViewDetailsField fieldName={"Active"} data={`${packages.isActive}`} />

      <ErrorMessage message={errorMessage} />

    </ViewDetailsLayout>
    
  )
}

export default ViewPackage
